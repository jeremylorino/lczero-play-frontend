var board;
var game = new Chess();
var statusEl = $('#status');
var historyEl = $('#history');
var mv_history = '';
var mv_undo_history = [];
var enabled = true;
var playouts = 50;
var canMove = true;
var promotePiece = 'q';
var reqMoveXhr = new XMLHttpRequest();
var preMove = '';
var thinking = false;

function getOrCreateDiv(classSelector, context) {
  var el = context ? context.find(classSelector) : $(classSelector);

  if (!el.length) {
    el = $('<div />');
    classSelector.split('.').forEach(v => el.addClass(v));
  }

  return el;
}

$('body').keydown(ev => {
  switch (ev.keyCode) {
    case 37: // left
      var move = game.undo();
      console.debug('undo move', move);

      if (move) {
        mv_undo_history.push(move);
        board.position(game.fen());
        $('#fenbox').val(game.fen());
        $('#pgnbox').val(game.pgn());
        historyEl.empty();
        updateStatus();
      }
      break;
    case 38: // up
      break;
    case 39: // right
      var move = mv_undo_history.pop();
      console.debug('redo move', move);

      if (move) {
        game.move(move);
        board.position(game.fen());
        $('#fenbox').val(game.fen());
        $('#pgnbox').val(game.pgn());
        historyEl.empty();
        updateStatus();
      }
      break;
    case 40: // down
      break;
  }
});

/*
[Site "Lczero.org"]
[Date "2018.10.31"]
[Event "Vs. lc0"]
[Round "?"]
[White "6cpf4n"]
[Black "Computer Level 3"]
[Result "*"]
[ECO "B00"]
[CurrentPosition "r1bqkbnr/pppppppp/2n5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2"]
*/

function sharePgn() {
  game.header(
    'Site',
    'Lczero.org',
    'Date',
    new Date().toJSON(),
    'Event',
    'Play Lc0',
    'Round',
    '?',
    'White',
    '',
    'Black',
    '',
    'Result',
    '*',
    'ECO',
    '',
    'CurrentPosition',
    game.fen()
  );
}
function removeHeaderFromPgn() {
  game.load_pgn(game.pgn().replace(/\[.*?\]\r?\n/g, ''));
  board.position(game.fen());
  $('#fenbox').val(game.fen());
  $('#pgnbox').val(game.pgn());
  historyEl.empty();
  updateStatus();
}

$('#fenbox').val(game.fen());
$('#pgnbox').val(game.pgn());

function askMove() {
  var askUrl = 'getMove';
  if (playouts == 400) {
    askUrl = 'getMoveSlow';
  }
  if (playouts == 1) {
    askUrl = 'getMoveUltra';
  }
  if (playouts == 2000) {
    askUrl = 'getMoveHardcore';
  }
  var historyStr = mv_history;
  if (mv_history == '') {
    historyStr = '0';
  }
  $('#status').html('Leela is thinking...');
  var toSend = askUrl + '?pgn=' + historyStr;
  console.log(toSend);
  var move = reqMoveXhr.open('GET', toSend, true);
  reqMoveXhr.timeout = 10000;
  reqMoveXhr.send(null);
}

reqMoveXhr.onload = function(e) {
  if (reqMoveXhr.readyState === 4) {
    if (reqMoveXhr.status === 200) {
      board.draggable = false;
      var result = JSON.parse(reqMoveXhr.responseText);
      result.centipawn = parseFloat(result.centipawn);

      console.log('Received move from computa:', result);

      var move = result.bestMove.uci;

      var wr = result.centipawn;
      id = result.netId;

      if (game.turn() === 'b') {
        wr *= -1;
        result.centipawn *= -1;
      }

      if (move.length > 1 && wr && id) {
        $('#winrate').html(
          'Leela ID ' + id + ' thinks her centipawn advantage is ' + wr + '.'
        );
      }
      from_sq = result.bestMove.fromSq;
      to_sq = result.bestMove.toSq;

      var oldPromote = promotePiece;
      if (move.length > 4) {
        if (move[4] == '=') promotePiece = move[5];
        else promotePiece = move[4];
      }

      onDrop(from_sq, to_sq);
      board.position(game.fen());

      $('#fenbox').val(game.fen());
      $('#pgnbox').val(game.pgn());
      promotePiece = oldPromote;
    } else {
      $('#status').html(
        "There was an error asking Leela's move.. This page will retry in 5 seconds"
      );
      console.log('Weird..');
      setTimeout(function() {
        askMove();
      }, 5000);
    }
  }
};

var removeGreySquares = function() {
  $('#board .legal-move-hint').remove();
};

var greySquare = function(square) {
  var squareEl = $('#board .square-' + square);
  var hintEl = $('<div class="legal-move-hint"></div>');
  var squarePosition = squareEl.position();

  hintEl.height(squareEl.height() / 2.5);
  hintEl.width(squareEl.width() / 2.5);
  hintEl.css({
    top: squarePosition.top + 15,
    left: squarePosition.left + 15
  });

  hintEl.insertAfter(squareEl);
};

// do not pick up pieces if the game is over
// only pick up pieces for the side to move
var onDragStart = function(source, piece, position, orientation) {
  console.groupCollapsed('Drag started');
  console.log('Source: ' + source);
  console.log('Piece: ' + piece);
  console.log('Position: ' + ChessBoard.objToFen(position));
  console.log('Orientation: ' + orientation);
  console.log('--------------------');
  console.groupEnd();

  removeGreySquares();

  if (
    game.game_over() === true ||
    (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    (game.turn() === 'b' && piece.search(/^w/) !== -1)
  ) {
    return false;
  }

  var square = source;

  // get list of possible moves for this square
  var moves = game.moves({
    square: square,
    verbose: true
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  // greySquare(square);

  // highlight the possible squares for this piece
  for (var i = 0; i < moves.length; i++) {
    greySquare(moves[i].to);
  }
};

var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
  console.groupCollapsed('Drop');
  console.log('Source: ' + source);
  console.log('Target: ' + target);
  console.log('Piece: ' + piece);
  console.log('New position: ' + ChessBoard.objToFen(newPos));
  console.log('Old position: ' + ChessBoard.objToFen(oldPos));
  console.log('Orientation: ' + orientation);
  console.log('--------------------');
  console.groupEnd();

  removeGreySquares();

  // see if the move is legal
  var move = game.move({
    from: source,
    to: target,
    promotion: promotePiece
  });
  // illegal move
  if (move === null) return 'snapback';
  if ('promotion' in move) {
    target += move.promotion;
  }
  mv_history += source + target + ' ';
  updateStatus();

  promotePiece = 'q';

  $('#promoteBtn').attr('value', 'Will promote to: Queen');
  preMove = false;
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  var fen = game.fen();
  $('#fenbox').val(fen);
  $('#pgnbox').val(game.pgn());
  board.position(fen);
  if (enabled && !game.game_over()) {
    if (canMove) {
      playComputer();
    } else {
      $('#status').html('Move registered. Leela will play when time is over');
      preMove = true;
    }
  }
};

var onMoveEnd = function(oldPos, newPos) {
  console.groupCollapsed('Move animation complete');
  console.log('Old position: ' + ChessBoard.objToFen(oldPos));
  console.log('New position: ' + ChessBoard.objToFen(newPos));
  console.log('--------------------');
  console.groupEnd();

  removeGreySquares();
};

var playComputer = function() {
  if (!canMove || game.game_over() === true) return;
  askMove();
};

var updateStatus = function() {
  var status = '';

  var moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  // checkmate?
  if (game.in_checkmate() === true) {
    status = 'Game over, ' + moveColor + ' is in checkmate.';
  }

  // draw?
  else if (game.in_draw() === true) {
    status = 'Game over, drawn position';
  }

  // game still on
  else {
    status = moveColor + ' to move';

    // check?
    if (game.in_check() === true) {
      status += ', ' + moveColor + ' is in check';
    }
  }
  statusEl.html(status);
  var htmlStr = '';
  var pgn = game.pgn();
  var moves = pgn
    .split(/\d{1,2}\.\s/)
    .map(v => v.trim())
    .filter(v => v != '');

  moves.map((v, k) => {
    var moveNumber = parseFloat(k) + 1;
    var bw = v.split(' ');
    var moveWrap = getOrCreateDiv('.game-move.move--' + moveNumber);

    getOrCreateDiv('.game-move-number', moveWrap)
      .text(moveNumber + '. ')
      .appendTo(moveWrap);

    getOrCreateDiv('.player-color--white', moveWrap)
      .text(bw[0])
      .appendTo(moveWrap);

    if (!!!bw[1]) {
      bw[1] = '';
    }

    getOrCreateDiv('.player-color--black', moveWrap)
      .text(bw[1])
      .appendTo(moveWrap);

    historyEl.append(moveWrap);

    return moveWrap;
  });

  $('#historybox>.history-wrap').scrollTop(
    $('#historybox>.history-wrap')[0].scrollHeight
  );
};

var cfg = {
  draggable: true,
  position: 'start',
  pieceTheme:
    'https://storage.googleapis.com/oss-lc0.appspot.com/img/wikipedia/{piece}.png',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd,
  onMoveEnd: onMoveEnd
};

board = ChessBoard('board', cfg);

updateStatus();

$('#startPositionBtn').on('click', function() {
  game = new Chess();
  $('#fenbox').val(game.fen());
  $('#pgnbox').val(game.pgn());
  mv_history = '';
  board.start();
  updateStatus();
});
$('#flipBtn').on('click', board.flip);
$('#move1Btn').on('click', function() {
  if (enabled) {
    $('#move1Btn').attr('value', 'Leela: Disabled');
  } else {
    $('#move1Btn').attr('value', 'Leela: Enabled');
  }
  enabled = !enabled;
});

$('#slowBtn').on('click', function() {
  $('#curMode').html('Hard');
  playouts = 400;
  $('#playouts').html(playouts);
});

$('#fastBtn').on('click', function() {
  $('#curMode').html('Normal');
  playouts = 50;
  $('#playouts').html(playouts);
});

$('#ultrafastBtn').on('click', function() {
  $('#curMode').html('Easy');
  playouts = 1;
  $('#playouts').html(playouts);
});

$('#hardcoreBtn').on('click', function() {
  $('#curMode').html('Hardcore');
  playouts = 2000;
  $('#playouts').html(playouts);
});

$('#promoteBtn').on('click', function() {
  var newName;
  if (promotePiece == 'q') {
    newName = 'Knight';
    promotePiece = 'n';
  } else if (promotePiece == 'n') {
    newName = 'Bishop';
    promotePiece = 'b';
  } else if (promotePiece == 'b') {
    newName = 'Rook';
    promotePiece = 'r';
  } else if (promotePiece == 'r') {
    newName = 'Queen';
    promotePiece = 'q';
  }

  $('#promoteBtn').attr('value', 'Will promote to: ' + newName);
});

$('#move2Btn').on('click', function() {
  if (canMove) {
    playComputer();
  } else {
    $('#status').html(
      'Force Leela move registered. Leela will play when time is over'
    );
    preMove = true;
  }
});

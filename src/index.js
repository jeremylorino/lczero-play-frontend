'use strict';

const express = require('express');
const rp = require('request-promise').defaults({
  baseUrl: process.env.BACKEND_API_URL,
  timeout: 10000,
  forever: true
});

const app = express();

app.use(express.static('public'));

app.get('/getMove([\\w]*)?', async (req, res) => {
  const [, moveType = 'default'] = req.path.match(/^\/getMove(\w+)?[\/]?/);

  if (!['default', 'Slow', 'Ultra', 'Hardcore'].includes(moveType)) {
    res.sendStatus(404);
    return;
  }

  const { pgn = '0' } = req.query;

  try {
    const result = await rp.get({
      url: `/getMove${moveType.replace('default', '')}`,
      qs: {
        pgn
      }
    });
    const [move, ...moveRest] = result.split(';');
    const response = {
      bestMove: {
        uci: move,
        fromSq: `${move[0]}${move[1]}`,
        toSq: `${move[2]}${move[3]}`
      },
      moveType,
      pgn,
      centipawn: null,
      netId: null
    };

    if (moveRest.length > 0) {
      response.centipawn = moveRest[0];
      response.netId = moveRest[1];
    }

    res.json(response);
    return;
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
    return;
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

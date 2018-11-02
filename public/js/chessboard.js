!function(){"use strict";var e=window.jQuery,r="abcdefgh".split(""),o=20,n="…",a="1.8.3",t="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",s=B(t),i=200,p=200,c=60,l=30,u=100,f={};function d(e,r,o){var n=0,a=!1,t=[],s=function(){n=0,a&&(a=!1,i())},i=function(){n=window.setTimeout(s,r),e.apply(o,t)};return function(e){t=arguments,n?a=!0:i()}}function h(){return"xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx".replace(/x/g,function(e){return(16*Math.random()|0).toString(16)})}function v(e){return JSON.parse(JSON.stringify(e))}function g(e){var r=e.split(".");return{major:parseInt(r[0],10),minor:parseInt(r[1],10),patch:parseInt(r[2],10)}}function P(e,r){for(var o in r)if(r.hasOwnProperty(o))for(var n="{"+o+"}",a=r[o];-1!==e.indexOf(n);)e=e.replace(n,a);return e}function b(e){return"string"==typeof e}function w(e){return"function"==typeof e}function m(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e}function y(e){return"fast"===e||"slow"===e||!!m(e)&&e>=0}function x(e){if(!b(e))return!1;var r=e.split("-");return 2===r.length&&(O(r[0])&&O(r[1]))}function O(e){return b(e)&&-1!==e.search(/^[a-h][1-8]$/)}function q(e){return b(e)&&-1!==e.search(/^[bw][KQRNBP]$/)}function k(e){if(!b(e))return!1;e=e.replace(/ .+$/,"");var r=(e=e.replace(/8/g,"11111111").replace(/7/g,"1111111").replace(/6/g,"111111").replace(/5/g,"11111").replace(/4/g,"1111").replace(/3/g,"111").replace(/2/g,"11")).split("/");if(8!==r.length)return!1;for(var o=0;o<8;o++)if(8!==r[o].length||-1!==r[o].search(/[^kqrnbpKQRNBP1]/))return!1;return!0}function S(r){if(!e.isPlainObject(r))return!1;for(var o in r)if(r.hasOwnProperty(o)&&(!O(o)||!q(r[o])))return!1;return!0}function T(){return typeof window.$&&e.fn&&e.fn.jquery&&(r=e.fn.jquery,o=a,r=g(r),o=g(o),1e5*r.major*1e5+1e5*r.minor+r.patch>=1e5*o.major*1e5+1e5*o.minor+o.patch);var r,o}function B(e){if(!k(e))return!1;for(var o,n=(e=e.replace(/ .+$/,"")).split("/"),a={},t=8,s=0;s<8;s++){for(var i=n[s].split(""),p=0,c=0;c<i.length;c++){if(-1!==i[c].search(/[1-8]/))p+=parseInt(i[c],10);else a[r[p]+t]=(o=i[c]).toLowerCase()===o?"b"+o.toUpperCase():"w"+o.toUpperCase(),p+=1}t-=1}return a}function E(e){if(!S(e))return!1;for(var o,n,a="",t=8,s=0;s<8;s++){for(var i=0;i<8;i++){var p=r[i]+t;e.hasOwnProperty(p)?a+=(o=e[p],n=void 0,"w"===(n=o.split(""))[0]?n[1].toUpperCase():n[1].toLowerCase()):a+="1"}7!==s&&(a+="/"),t-=1}return a=a.replace(/11111111/g,"8").replace(/1111111/g,"7").replace(/111111/g,"6").replace(/11111/g,"5").replace(/1111/g,"4").replace(/111/g,"3").replace(/11/g,"2")}function C(e,o,n){for(var a=function(e){for(var o=[],n=0;n<8;n++)for(var a=0;a<8;a++){var t=r[n]+(a+1);e!==t&&o.push({square:t,distance:(s=e,i=t,void 0,void 0,void 0,void 0,void 0,void 0,void 0,void 0,p=s.split(""),c=r.indexOf(p[0])+1,l=parseInt(p[1],10),u=i.split(""),f=r.indexOf(u[0])+1,d=parseInt(u[1],10),h=Math.abs(c-f),v=Math.abs(l-d),h>=v?h:v)})}var s,i,p,c,l,u,f,d,h,v;o.sort(function(e,r){return e.distance-r.distance});var g=[];for(n=0;n<o.length;n++)g.push(o[n].square);return g}(n),t=0;t<a.length;t++){var s=a[t];if(e.hasOwnProperty(s)&&e[s]===o)return s}return!1}function N(e){var r;return"black"!==e.orientation&&(e.orientation="white"),!1!==e.showNotation&&(e.showNotation=!0),!0!==e.draggable&&(e.draggable=!1),"trash"!==e.dropOffBoard&&(e.dropOffBoard="snapback"),!0!==e.sparePieces&&(e.sparePieces=!1),e.sparePieces&&(e.draggable=!0),e.hasOwnProperty("pieceTheme")&&(b(e.pieceTheme)||w(e.pieceTheme))||(e.pieceTheme="img/chesspieces/wikipedia/{piece}.png"),y(e.appearSpeed)||(e.appearSpeed=i),y(e.moveSpeed)||(e.moveSpeed=p),y(e.snapbackSpeed)||(e.snapbackSpeed=c),y(e.snapSpeed)||(e.snapSpeed=l),y(e.trashSpeed)||(e.trashSpeed=u),m(r=e.dragThrottleRate)&&r>=1||(e.dragThrottleRate=o),e}f.alpha="alpha-d2270",f.black="black-3c85d",f.board="board-b72b1",f.chessboard="chessboard-63f37",f.clearfix="clearfix-7da63",f.highlight1="highlight1-32417",f.highlight2="highlight2-9c5d2",f.notation="notation-322f9",f.numeric="numeric-fc462",f.piece="piece-417db",f.row="row-5277c",f.sparePieces="spare-pieces-7492f",f.sparePiecesBottom="spare-pieces-bottom-ae20f",f.sparePiecesTop="spare-pieces-top-4028b",f.square="square-55d63",f.white="white-1e1d7",console.assert("abc"===P("abc",{a:"x"})),console.assert("{a}bc"===P("{a}bc",{})),console.assert("{a}bc"===P("{a}bc",{p:"q"})),console.assert("xbc"===P("{a}bc",{a:"x"})),console.assert("xbcxbc"===P("{a}bc{a}bc",{a:"x"})),console.assert("xxy"===P("{a}{a}{b}",{a:"x",b:"y"})),console.assert(O("a1")),console.assert(O("e2")),console.assert(!O("D2")),console.assert(!O("g9")),console.assert(!O("a")),console.assert(!O(!0)),console.assert(!O(null)),console.assert(!O({})),console.assert(q("bP")),console.assert(q("bK")),console.assert(q("wK")),console.assert(q("wR")),console.assert(!q("WR")),console.assert(!q("Wr")),console.assert(!q("a")),console.assert(!q(!0)),console.assert(!q(null)),console.assert(!q({})),console.assert(k(t)),console.assert(k("8/8/8/8/8/8/8/8")),console.assert(k("r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R")),console.assert(k("3r3r/1p4pp/2nb1k2/pP3p2/8/PB2PN2/p4PPP/R4RK1 b - - 0 1")),console.assert(!k("3r3z/1p4pp/2nb1k2/pP3p2/8/PB2PN2/p4PPP/R4RK1 b - - 0 1")),console.assert(!k("anbqkbnr/8/8/8/8/8/PPPPPPPP/8")),console.assert(!k("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/")),console.assert(!k("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN")),console.assert(!k("888888/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")),console.assert(!k("888888/pppppppp/74/8/8/8/PPPPPPPP/RNBQKBNR")),console.assert(!k({})),console.assert(S(s)),console.assert(S({})),console.assert(S({e2:"wP"})),console.assert(S({e2:"wP",d2:"wP"})),console.assert(!S({e2:"BP"})),console.assert(!S({y2:"wP"})),console.assert(!S(null)),console.assert(!S("start")),console.assert(!S(t)),console.assert(E(s)===t),console.assert("8/8/8/8/8/8/8/8"===E({})),console.assert("8/8/8/8/8/8/Pp6/8"===E({a2:"wP",b2:"bP"})),window.Chessboard=function(o,t){if(!function(){if(!T()){var e="Chessboard Error 1005: Unable to find a valid version of jQuery. Please include jQuery "+a+" or higher on the page\n\nExiting"+n;return window.alert(e),!1}return!0}())return null;var i,p=function(r){if(""===r){var o="Chessboard Error 1001: The first argument to Chessboard() cannot be an empty string.\n\nExiting"+n;return window.alert(o),!1}b(r)&&"#"!==r.charAt(0)&&(r="#"+r);var a=e(r);if(1!==a.length){var t="Chessboard Error 1003: The first argument to Chessboard() must be the ID of a DOM node, an ID query selector, or a single DOM node.\n\nExiting"+n;return window.alert(t),!1}return a}(o);if(!p)return null;"start"===(i=t)?i={position:v(s)}:k(i)?i={position:B(i)}:S(i)&&(i={position:v(i)}),e.isPlainObject(i)||(i={}),t=N(t=i);var c=null,l=null,u=null,g=null,m={},y=2,q="white",R={},I=null,D=null,K=null,M=!1,j={},Q={},X={},Y=16;function L(e,r,o){if(!0===t.hasOwnProperty("showErrors")&&!1!==t.showErrors){var n="Chessboard Error "+e+": "+r;return"console"===t.showErrors&&"object"==typeof console&&"function"==typeof console.log?(console.log(n),void(arguments.length>=2&&console.log(o))):"alert"===t.showErrors?(o&&(n+="\n\n"+JSON.stringify(o)),void window.alert(n)):void(w(t.showErrors)&&t.showErrors(e,r,o))}}function U(e){return w(t.pieceTheme)?t.pieceTheme(e):b(t.pieceTheme)?P(t.pieceTheme,{piece:e}):(L(8272,"Unable to build image source for config.pieceTheme."),"")}function $(e,r,o){var n='<img src="'+U(e)+'" ';return b(o)&&""!==o&&(n+='id="'+o+'" '),n+='alt="" class="{piece}" data-piece="'+e+'" style="width:'+Y+"px;height:"+Y+"px;",r&&(n+="display:none;"),P(n+='" />',f)}function z(e){var r=["wK","wQ","wR","wB","wN","wP"];"black"===e&&(r=["bK","bQ","bR","bB","bN","bP"]);for(var o="",n=0;n<r.length;n++)o+=$(r[n],!1,j[r[n]]);return o}function J(r,o,n,a){var s=e("#"+Q[r]),i=s.offset(),p=e("#"+Q[o]),c=p.offset(),l=h();e("body").append($(n,!0,l));var u=e("#"+l);u.css({display:"",position:"absolute",top:i.top,left:i.left}),s.find("."+f.piece).remove();var d={duration:t.moveSpeed,complete:function(){p.append($(n)),u.remove(),w(a)&&a()}};u.animate(c,d)}function W(r,o,n){var a=e("#"+j[r]).offset(),s=e("#"+Q[o]),i=s.offset(),p=h();e("body").append($(r,!0,p));var c=e("#"+p);c.css({display:"",position:"absolute",left:a.left,top:a.top});var l={duration:t.moveSpeed,complete:function(){s.find("."+f.piece).remove(),s.append($(r)),c.remove(),w(n)&&n()}};c.animate(i,l)}function F(){for(var r in c.find("."+f.piece).remove(),R)R.hasOwnProperty(r)&&e("#"+Q[r]).append($(R[r]))}function A(){c.html(function(e){"black"!==e&&(e="white");var o="",n=v(r),a=8;"black"===e&&(n.reverse(),a=1);for(var s="white",i=0;i<8;i++){o+='<div class="{row}">';for(var p=0;p<8;p++){var c=n[p]+a;o+='<div class="{square} '+f[s]+" square-"+c+'" style="width:'+Y+"px;height:"+Y+'px;" id="'+Q[c]+'" data-square="'+c+'">',t.showNotation&&(("white"===e&&1===a||"black"===e&&8===a)&&(o+='<div class="{notation} {alpha}">'+n[p]+"</div>"),0===p&&(o+='<div class="{notation} {numeric}">'+a+"</div>")),o+="</div>",s="white"===s?"black":"white"}o+='<div class="{clearfix}"></div></div>',s="white"===s?"black":"white","white"===e?a-=1:a+=1}return P(o,f)}(q,t.showNotation)),F(),t.sparePieces&&("white"===q?(u.html(z("black")),g.html(z("white"))):(u.html(z("white")),g.html(z("black"))))}function G(e){var r=v(R),o=v(e);E(r)!==E(o)&&(w(t.onChange)&&t.onChange(r,o),R=e)}function H(e,r){for(var o in X)if(X.hasOwnProperty(o)){var n=X[o];if(e>=n.left&&e<n.left+Y&&r>=n.top&&r<n.top+Y)return o}return"offboard"}function V(){c.find("."+f.square).removeClass(f.highlight1+" "+f.highlight2)}function Z(){V();var e=v(R);delete e[K],G(e),F(),l.fadeOut(t.trashSpeed),M=!1}function _(r,o,n,a){w(t.onDragStart)&&!1===t.onDragStart(r,o,v(R),q)||(M=!0,I=o,K=r,D="spare"===r?"offboard":r,function(){for(var r in X={},Q)Q.hasOwnProperty(r)&&(X[r]=e("#"+Q[r]).offset())}(),l.attr("src",U(o)).css({display:"",position:"absolute",left:n-Y/2,top:a-Y/2}),"spare"!==r&&e("#"+Q[r]).addClass(f.highlight1).find("."+f.piece).css("display","none"))}function ee(r,o){l.css({left:r-Y/2,top:o-Y/2});var n=H(r,o);n!==D&&(O(D)&&e("#"+Q[D]).removeClass(f.highlight2),O(n)&&e("#"+Q[n]).addClass(f.highlight2),w(t.onDragMove)&&t.onDragMove(n,D,K,I,v(R),q),D=n)}function re(r){var o="drop";if("offboard"===r&&"snapback"===t.dropOffBoard&&(o="snapback"),"offboard"===r&&"trash"===t.dropOffBoard&&(o="trash"),w(t.onDrop)){var n=v(R);"spare"===K&&O(r)&&(n[r]=I),O(K)&&"offboard"===r&&delete n[K],O(K)&&O(r)&&(delete n[K],n[r]=I);var a=v(R),s=t.onDrop(K,r,I,n,a,q);"snapback"!==s&&"trash"!==s||(o=s)}"snapback"===o?function(){if("spare"!==K){V();var r=e("#"+Q[K]).offset(),o={duration:t.snapbackSpeed,complete:function(){F(),l.css("display","none"),w(t.onSnapbackEnd)&&t.onSnapbackEnd(I,K,v(R),q)}};l.animate(r,o),M=!1}else Z()}():"trash"===o?Z():"drop"===o&&function(r){V();var o=v(R);delete o[K],o[r]=I,G(o);var n=e("#"+Q[r]).offset(),a={duration:t.snapSpeed,complete:function(){F(),l.css("display","none"),w(t.onSnapEnd)&&t.onSnapEnd(K,r,I)}};l.animate(n,a),M=!1}(r)}function oe(e){e.preventDefault()}function ne(r){if(t.draggable){var o=e(this).attr("data-square");O(o)&&R.hasOwnProperty(o)&&_(o,R[o],r.pageX,r.pageY)}}function ae(r){if(t.draggable){var o=e(this).attr("data-square");O(o)&&R.hasOwnProperty(o)&&(r.preventDefault(),r=r.originalEvent,_(o,R[o],r.changedTouches[0].pageX,r.changedTouches[0].pageY))}}function te(r){t.sparePieces&&_("spare",e(this).attr("data-piece"),r.pageX,r.pageY)}function se(r){t.sparePieces&&_("spare",e(this).attr("data-piece"),(r=r.originalEvent).changedTouches[0].pageX,r.changedTouches[0].pageY)}m.clear=function(e){m.position({},e)},m.destroy=function(){p.html(""),l.remove(),p.unbind()},m.fen=function(){return m.position("fen")},m.flip=function(){return m.orientation("flip")},m.move=function(){if(0!==arguments.length){for(var e=!0,r={},o=0;o<arguments.length;o++)if(!1!==arguments[o])if(x(arguments[o])){var n=arguments[o].split("-");r[n[0]]=n[1]}else L(2826,"Invalid move passed to the move method.",arguments[o]);else e=!1;var a=function(e,r){var o=v(e);for(var n in r)if(r.hasOwnProperty(n)&&o.hasOwnProperty(n)){var a=o[n];delete o[n],o[r[n]]=a}return o}(R,r);return m.position(a,e),a}},m.orientation=function(e){return 0===arguments.length?q:"white"===e||"black"===e?(q=e,A(),q):"flip"===e?(q="white"===q?"black":"white",A(),q):void L(5482,"Invalid value passed to the orientation method.",e)},m.position=function(r,o){return 0===arguments.length?v(R):b(r)&&"fen"===r.toLowerCase()?E(R):(b(r)&&"start"===r.toLowerCase()&&(r=v(s)),k(r)&&(r=B(r)),void(S(r)?(!1!==o&&(o=!0),o?(function(r,o,n){if(0!==r.length)for(var a=0,s=0;s<r.length;s++){var i=r[s];"clear"===i.type?e("#"+Q[i.square]+" ."+f.piece).fadeOut(t.trashSpeed,p):"add"!==i.type||t.sparePieces?"add"===i.type&&t.sparePieces?W(i.piece,i.square,p):"move"===i.type&&J(i.source,i.destination,i.piece,p):e("#"+Q[i.square]).append($(i.piece,!0)).find("."+f.piece).fadeIn(t.appearSpeed,p)}function p(){(a+=1)===r.length&&(F(),w(t.onMoveEnd)&&t.onMoveEnd(v(o),v(n)))}}(function(e,r){e=v(e),r=v(r);var o=[],n={};for(var a in r)r.hasOwnProperty(a)&&e.hasOwnProperty(a)&&e[a]===r[a]&&(delete e[a],delete r[a]);for(a in r)if(r.hasOwnProperty(a)){var t=C(e,r[a],a);t&&(o.push({type:"move",source:t,destination:a,piece:r[a]}),delete e[t],delete r[a],n[a]=!0)}for(a in r)r.hasOwnProperty(a)&&(o.push({type:"add",square:a,piece:r[a]}),delete r[a]);for(a in e)e.hasOwnProperty(a)&&(n.hasOwnProperty(a)||(o.push({type:"clear",square:a,piece:e[a]}),delete e[a]));return o}(R,r),R,r),G(r)):(G(r),F())):L(6482,"Invalid value passed to the position method.",r)))},m.resize=function(){Y=function(){var e=parseInt(p.width(),10);if(!e||e<=0)return 0;for(var r=e-1;r%8!=0&&r>0;)r-=1;return r/8}(),c.css("width",8*Y+"px"),l.css({height:Y,width:Y}),t.sparePieces&&p.find("."+f.sparePieces).css("paddingLeft",Y+y+"px"),A()},m.start=function(e){m.position("start",e)};var ie=d(function(e){M&&ee(e.pageX,e.pageY)},t.dragThrottleRate),pe=d(function(e){M&&(e.preventDefault(),ee(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY))},t.dragThrottleRate);function ce(e){M&&re(H(e.pageX,e.pageY))}function le(e){M&&re(H(e.originalEvent.changedTouches[0].pageX,e.originalEvent.changedTouches[0].pageY))}function ue(r){if(!M&&w(t.onMouseoverSquare)){var o=e(r.currentTarget).attr("data-square");if(O(o)){var n=!1;R.hasOwnProperty(o)&&(n=R[o]),t.onMouseoverSquare(o,n,v(R),q)}}}function fe(r){if(!M&&w(t.onMouseoutSquare)){var o=e(r.currentTarget).attr("data-square");if(O(o)){var n=!1;R.hasOwnProperty(o)&&(n=R[o]),t.onMouseoutSquare(o,n,v(R),q)}}}return q=t.orientation,t.hasOwnProperty("position")&&("start"===t.position?R=v(s):k(t.position)?R=B(t.position):S(t.position)?R=v(t.position):L(7263,"Invalid value passed to config.position.",t.position)),function(){var o,n;!function(){for(var e=0;e<r.length;e++)for(var o=1;o<=8;o++){var n=r[e]+o;Q[n]=n+"-"+h()}var a="KQRNBP".split("");for(e=0;e<a.length;e++){var t="w"+a[e],s="b"+a[e];j[t]=t+"-"+h(),j[s]=s+"-"+h()}}(),p.html((o=t.sparePieces,n='<div class="{chessboard}">',o&&(n+='<div class="{sparePieces} {sparePiecesTop}"></div>'),n+='<div class="{board}"></div>',o&&(n+='<div class="{sparePieces} {sparePiecesBottom}"></div>'),P(n+="</div>",f))),c=p.find("."+f.board),t.sparePieces&&(u=p.find("."+f.sparePiecesTop),g=p.find("."+f.sparePiecesBottom));var a=h();e("body").append($("wP",!0,a)),l=e("#"+a),y=parseInt(c.css("borderLeftWidth"),10),m.resize()}(),function(){e("body").on("mousedown mousemove","."+f.piece,oe),c.on("mousedown","."+f.square,ne),p.on("mousedown","."+f.sparePieces+" ."+f.piece,te),c.on("mouseenter","."+f.square,ue).on("mouseleave","."+f.square,fe);var r=e(window);r.on("mousemove",ie).on("mouseup",ce),"ontouchstart"in document.documentElement&&(c.on("touchstart","."+f.square,ae),p.on("touchstart","."+f.sparePieces+" ."+f.piece,se),r.on("touchmove",pe).on("touchend",le))}(),m},window.ChessBoard=window.Chessboard,window.Chessboard.fenToObj=B,window.Chessboard.objToFen=E}();
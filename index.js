var WebSocketServer = require('ws').Server

var wss = new WebSocketServer( { port: 8080 } );
var sockets = [];
var collections = new Set();

function removeSocket(socket) {
  sockets.splice(sockets.indexOf(socket), 1);
}

wss.on('connection', function(ws) {
  ws.on('error', function(error) {
    removeSocket(ws);
  });
  ws.on('close', function() {
    removeSocket(ws);
  });
  ws.on('message', function(message) {
    try {
      var json = JSON.parse(message);
      if (json.type === 'register') {
        if (!!json.collection) {
          collections.add(json.collection);
        }
        console.log(collections);
      }
    } catch (e) {
    }
  });
  sockets.push(ws);
});

setInterval(function () {
  var numSockets = sockets.length;
  var randomNum = Math.floor(Math.random() * 11);  // integer between 0 and 10 inclusive
  for (var i = 0; i < numSockets; i++) {
    for (var collection of collections) {
      sockets[i].send(JSON.stringify({ collection: collection, data: randomNum.toString() }));
    }
  }
}, 1000);
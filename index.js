var WebSocketServer = require('ws').Server
const PORT = process.env.PORT || 3000;

var wss = new WebSocketServer( { port: PORT } );
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
  var randomNum = (Math.random() * (10 - 3) + 3).toFixed(2);
  for (var i = 0; i < numSockets; i++) {
    for (var collection of collections) {
      // send each 20% of the time
      if (Math.random() > 0.2) {
        sockets[i].send(JSON.stringify({ collection: collection, price_eth: randomNum.toString() }));
      }
    }
  }
}, 1000);
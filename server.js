// Dependencies
let Vector = require('./classVector.js');
let Particle = require('./classParticle.js');
let Player = require('./classPlayer.js');
let express = require('express');
let http = require('http');
//let path = require('path');
let socketIO = require('socket.io');
let app = express();
let server = http.Server(app);
let io = socketIO(server);
app.set('port', 5000);
// Routing
const clientPath = __dirname;
app.use(express.static(clientPath));
// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000 (Ejecutando servidor en puerto 5000)');
});
//CHAT STUFFS

//
function isEmpty( obj ) {
  for ( let prop in obj ) {
    return false;
  }
  return true;
}
let ship = {};
let player = {};
let thrust = {};
let bullet = {};
let clientData = {};
let angle = 0;
let bulletSpeed = new Vector(0.5, 0.3);
io.on('connection', function(socket) {
  socket.on('new player', function(newPlayer) {
    ship = new Particle(Math.random() * newPlayer.displayWIDTH, Math.random() * newPlayer.displayHEIGHT, 0, 0);
    player = new Player(newPlayer.name, socket.id);
    thrust = new Vector(0, 0);
    bullet = new Particle();
    clientData[socket.id] = {ship: ship, player : player, thrust : thrust, bullet : bullet};
  });
  socket.on('chat', function(chatsended) {
    console.log(chatsended);
  });
  socket.on('clientState', function(data){
    if(!isEmpty(clientData))
    {
      let p = clientData[socket.id].player || {};
      let t = clientData[socket.id].thrust || {};
      let s = clientData[socket.id].ship || {};
      let b = clientData[socket.id].bullet || {};

      if(!isEmpty(thrust)) {
        thrust.setLength(0.1);
        player.speed = thrust.getLength();
      }
      if (data.movement.turningLeft) {
        angle -= 0.05;
        thrust.setAngle(angle);
        s.direction = angle;
      }
      if (data.movement.turningRight) {
        angle += 0.05;
        thrust.setAngle(angle);
        s.direction = angle;
      }
      if (data.movement.thrusting) {
        s.accelerate(thrust);
        s.thrusting = true;
      }
      if(!data.movement.thrusting) {
        s.thrusting = false;
      }
      if(data.movement.shooting && data.movement.bulletsLoad > 0) {
        b.shooting = data.movement.shooting;
        b.position.x = s.position.x;
        b.position.y = s.position.y;
        bulletSpeed.setLength(6);
        bulletSpeed.setAngle(angle);
        b.velocity = bulletSpeed;
      }
      if(s.position.x > data.displayWIDTH) {
          s.position.x = 0;
      }
      if(s.position.x < 0) {
          s.position.x = data.displayWIDTH;
      }
      if(s.position.y > data.displayHEIGHT) {
          s.position.y = 0;
      }
      if(s.position.y < 0) {
          s.position.y = data.displayHEIGHT;
      }
      s.update();
      b.update();
    }

  });
});
setInterval(function() {
  io.sockets.emit('state', clientData);
}, 1000 / 60);

let socket = io();

let WIDTH = document.documentElement.clientWidth - 50;
let HEIGHT = document.documentElement.clientHeight - 50;
let canvas = document.getElementById("myCanvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
let context = canvas.getContext("2d");
newPlayer = {};
newPlayer.displayWIDTH = WIDTH;
newPlayer.displayHEIGHT = HEIGHT;
newPlayer.name = 'Rocket'
socket.emit('new player', newPlayer);
clientState = new Object();

socket.on('state', function(clientData) {
  context.clearRect(0, 0, WIDTH, HEIGHT);
  for (let id in clientData) {
    let ship = clientData[id].ship;
    let bullet = clientData[id].bullet;
    context.save();
    context.translate(ship.position.x, ship.position.y);
    context.rotate(ship.direction);
    context.beginPath();
    context.moveTo(10, 0);
    context.lineTo(-10, -7);
    context.lineTo(-10, 7);
    context.lineTo(10, 0);
    if(ship.thrusting)
    {
        context.moveTo(-10, 0);
        context.lineTo(-18, 0);
        context.moveTo(-10, 5);
        context.lineTo(-18, 0);
        context.moveTo(-10, -5);
        context.lineTo(-18, 0);
    }
    context.stroke();
    context.restore();

    if(bullet.shooting)
    {
      context.beginPath();
      context.arc(bullet.position.x, bullet.position.y, Math.random() * 3, 0, 1*Math.PI);
      context.fillStyle = '#ff0033';
      context.fill();
    }
  }
});



clientState.movement = {
  turningLeft: false,
  turningRight: false,
  thrusting: false,
  shooting: false,
  bulletsLoad: 3
};

clientState.displayWIDTH = WIDTH;
clientState.displayHEIGHT = HEIGHT;

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 37: // A
      clientState.movement.turningLeft = true;
      break;
    case 39: // D
      clientState.movement.turningRight = true;
      break;
    case 38: // W
      clientState.movement.thrusting = true;
      break;
    case 81: // Q
      clientState.movement.shooting = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37: // A
      clientState.movement.turningLeft = false;
      break;
    case 39: // D
      clientState.movement.turningRight = false;
      break;
    case 38: // W
      clientState.movement.thrusting = false;
      break;
    case 81: // Q
      clientState.movement.shooting = false;
      clientState.movement.bulletsLoad -= 1;
      break;
  }
});
setInterval(function() {
  socket.emit('clientState', clientState);
}, 1000 / 60);

var Vector = require('./classVector.js');
class Particle
{
  constructor(x, y, speed, direction, gravity)
  {
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.gravity = new Vector(0, gravity || 0);

    this.velocity.setLength(speed);
  	this.velocity.setAngle(direction);
  }
  update()
  {
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
  }
  accelerate(acv)
  {
    this.velocity.addTo(acv);
  }
}

module.exports = Particle;

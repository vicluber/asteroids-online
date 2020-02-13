class Vector
{
	constructor(x,y) {
		this.x = x;
    this.y = y;
    this.vangle = Math.atan2(this.y, this.x);
	}
  getX()
  {
    return this.x;
  }
  getY()
  {
    return this.y;
  }
  getAngle()
  {
    return Math.atan2(this.y, this.x);
  }
  getLength()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
	setX(x)
  {
    this.x = x;
  }
  setY(y)
  {
    this.y = y;
  }
  setAngle(angle)
  {
    let length = this.getLength();
		this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
    this.vangle = Math.atan2(this.y, this.x);
  }
  setLength(length)
  {
    let angle = this.getAngle();
		this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
    this.vlenght = Math.sqrt(this.x * this.x + this.y * this.y);
  }
  addTo(v2)
  {
    this.x += v2.x;
    this.y += v2.y;
  }
  substractFrom(v2)
  {
    this.x -= v2.x;
    this.y -= v2.y;
  }
  multiplyBy(value)
  {
    this.x *= value;
    this.y *= value;
  }
  divideBy(value)
  {
    this.x /= value;
    this.y /= value;
  }
}

module.exports = Vector;

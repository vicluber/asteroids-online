var Vector = function(x, y)
{
	this.x = x;
	this.y = y;
	this.setX = function(x)
	{
		this.x = x;
	}
	this.setY = function(y)
	{
		this.y = y;
	}
	this.setAngle = function(angle)
	{
		let length = this.getLength();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	}
	this.setLength = function(length)
	{
		let angle = this.getAngle();
		this.x = Math.cos(angle) * length;
		this.y = Math.sin(angle) * length;
	}
	this.getX = function()
	{
		return this.x;
	}
	this.getY = function()
	{
		return this.y;
	}
	this.getAngle = function()
	{
		return Math.atan2(this.y, this.x);
	}
	this.getLength = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	this.add = function(v2)
	{
		return v = new Vector(this.x + v2.x, this.y + v2.y);
	}
	this.subtract = function(v2)
	{
		return v = new Vector(this.x - v2.x, this.y - v2.y);
	}
	this.multiply = function(value)
	{
		return v = new Vector(this.x * value, this.y * value);
	}
	this.devide = function(velue)
	{
		return v = new Vector(this.x / value, this.y / value);
	}
	this.addTo = function(v2)
	{
		this.x += v2.getX();
		this.y += v2.getY();
	}
	this.substractFrom = function(v2)
	{
		this.x -= v2.getX();
		this.y -= v2.getY();
	}
	this.multiplyBy = function(value)
	{
		this.x *= value;
		this.y *= value;
	}
	this.divideBy = function(value)
	{
		this.x /= value;
		this.y /= value;
	}
}

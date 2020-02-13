var Particle = function(x, y, speed, direction, gravity)
{
	this.direction = direction;
	this.speed = speed;
	this.position = new Vector(x, y);
	this.velocity = new Vector(0, 0);
	this.gravity = new Vector(0, gravity || 0);

	this.velocity.setLength(speed);
	this.velocity.setAngle(direction);

	this.update = function()
	{
		this.velocity.addTo(this.gravity);
		this.position.addTo(this.velocity);
	}
	this.accelerate = function(acv)
	{
		this.velocity.addTo(acv);
	}
}

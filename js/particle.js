function Particle({ target, radius, velocity, acceleration }) {
  this.position = createVector(random(width), random(height));
  this.target = target;
  this.radius = radius || 3;
  this.velocity = velocity || createVector();
  this.acceleration = acceleration || createVector();
}

Particle.clone = (particle) => {
  return new Particle(particle);
};

Particle.prototype.setTarget = function (newTarget) {
  this.target = newTarget;
  return this;
};

Particle.prototype.clone = function () {
  return new Particle(this);
};

Particle.prototype.draw = function () {
  const { x, y } = this.position;

  noStroke();
  fill(255);
  ellipse(x, y, this.radius * 2, this.radius * 2);
};

Particle.prototype.update = function () {
  const maxSpeed = 10;

  const steering = p5.Vector.sub(this.target, this.position).sub(this.velocity);
  this.acceleration.add(steering);
  this.velocity.add(this.acceleration).limit(maxSpeed);
  this.position.add(this.velocity);
  this.acceleration.mult(0);
};

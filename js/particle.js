class Particle {
  constructor({ target, radius, velocity, acceleration }) {
    this.position = createVector(random(width), random(height));
    this.target = target;
    this.radius = radius || 3;
    this.velocity = velocity || createVector();
    this.acceleration = acceleration || createVector();
  }

  setTarget(newTarget) {
    this.target = newTarget;
    return this;
  }

  clone() {
    return new Particle(this);
  }

  draw() {
    const { x, y } = this.position;

    noStroke();
    fill(255);
    ellipse(x, y, this.radius * 2, this.radius * 2);
  }

  update() {
    const maxSpeed = 10;

    const steering = p5.Vector.sub(this.target, this.position).sub(this.velocity);
    this.acceleration.add(steering);
    this.velocity.add(this.acceleration).limit(maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  static clone(particle) {
    return new Particle(particle);
  }
}







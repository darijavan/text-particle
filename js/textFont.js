class TextFont {
  constructor({ text, font, position, fontSize, particleRadius, options }) {
    this.text = text;
    this.position = position;
    this.font = font;
    this.fontSize = fontSize;
    this.particleRadius = particleRadius || 1;
    this.options = options;
    this.particles = font
      .textToPoints(text, position.x, position.y, fontSize, {
        sampleFactor: (options && options.sampleFactor) || 0.3,
      })
      // sort particles depending on their position to make text change effect easier to deal with
      .sort((a, b) => b.x + b.y * width - a.x - a.y * width)
      .map(
        (p) =>
          new Particle({
            target: createVector(p.x, p.y),
            radius: this.particleRadius,
          })
      );

    // Compute the offset from the center of the text
    this.offset = this.particles
      .reduce((p, { target: c }) => p5.Vector.add(p, c), createVector())
      .div(this.particles.length)
      .sub(position)
      .mult(-1);
  }

  /**
   * Show the text to the canvas
   */
  show() {
    push();
    if (!this.options || this.options.centerMode !== false)
      translate(this.offset);
    for (const point of this.particles) {
      point.draw();
    }
    pop();
  }

  /**
   * Update state (particle's position and velocity)
   */
  update() {
    for (const point of this.particles) {
      point.update();
    }
  }

  /**
   * Change particle's radius
   * @param {number} radius The new radius
   */
  setParticleRadius(radius) {
    this.particles.forEach((p) => (p.radius = radius));
  }

  /**
   * Change the text and apply the effect
   * @param {string} text The new text
   */
  setText(text) {
    if (text !== this.text) {
      this.text = text;

      // Compute the next array of particles
      const particles = font
        .textToPoints(text, this.position.x, this.position.y, fontSize, {
          sampleFactor: (this.options && this.options.sampleFactor) || 0.3,
        })
        .sort((a, b) => b.x + b.y * width - a.x - a.y * width)
        .map(
          (p) =>
            new Particle({
              target: createVector(p.x, p.y),
              radius: this.particleRadius,
            })
        );

      // Recompute the center offset
      this.offset = particles
        .reduce((p, { target: c }) => p5.Vector.add(p, c), createVector())
        .div(particles.length)
        .sub(this.position)
        .mult(-1);

      const lastParticle = this.particles[this.particles.length - 1];

      // Refresh each particle's target position
      for (let i = 0; i < particles.length; i++) {
        this.particles[i] = this.particles[i] || lastParticle.clone();
        this.particles[i].setTarget(particles[i].target);
      }

      // Remove unnecessary particles
      this.particles.splice(particles.length);
    }
  }
}

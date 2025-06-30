export class Invader {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.speed = 1;
    this.dx = this.speed;
  }

  update() {
    this.x += this.dx;
    if (this.x <= 0 || this.x >= 800 - this.width) {
      this.dx = -this.dx;
      this.y += 20;
    }
  }

  draw(ctx) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

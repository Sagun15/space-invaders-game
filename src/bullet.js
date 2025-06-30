export class Bullet {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 10;
    this.speed = speed;
    this.active = true;
  }

  update() {
    this.y += this.speed;
    if (this.y < 0 || this.y > 600) this.active = false;
  }

  draw(ctx) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isActive() {
    return this.active;
  }

  collidesWith(obj) {
    return (
      this.x < obj.x + obj.width &&
      this.x + this.width > obj.x &&
      this.y < obj.y + obj.height &&
      this.y + this.height > obj.y
    );
  }
}

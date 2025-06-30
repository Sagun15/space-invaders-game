import { Player } from './player.js';
import { Invader } from './invader.js';
import { Bullet } from './bullet.js';

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(width / 2, height - 30);
    this.invaders = this.createInvaders();
    this.bullets = [];
    this.score = 0;
  }

  createInvaders() {
    const invaders = [];
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 11; x++) {
        invaders.push(new Invader(x * 50 + 50, y * 40 + 40));
      }
    }
    return invaders;
  }

  update() {
    this.player.update();
    this.bullets.forEach((bullet) => bullet.update());
    this.invaders.forEach((invader) => invader.update());

    this.bullets = this.bullets.filter((bullet) => bullet.isActive());

    this.checkCollisions();
  }

  draw(ctx) {
    this.player.draw(ctx);
    this.bullets.forEach((bullet) => bullet.draw(ctx));
    this.invaders.forEach((invader) => invader.draw(ctx));

    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${this.score}`, 10, 30);
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowLeft') this.player.moveLeft();
    if (e.key === 'ArrowRight') this.player.moveRight();
    if (e.key === ' ') this.shoot();
  }

  handleKeyUp(e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') this.player.stop();
  }

  shoot() {
    this.bullets.push(new Bullet(this.player.x, this.player.y, -5));
  }

  checkCollisions() {
    this.bullets.forEach((bullet) => {
      this.invaders.forEach((invader, index) => {
        if (bullet.collidesWith(invader)) {
          bullet.active = false;
          this.invaders.splice(index, 1);
          this.score += 10;
        }
      });
    });
  }
}

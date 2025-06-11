import { type Random, Vec2, inject } from '../../square3';

export class BunnyMove {
  @inject()
  private random!: Random;

  speed: Vec2;

  rotationSpeed: number;

  constructor() {
    this.speed = new Vec2(this.random.float(0.2, 5), this.random.float(0, 5) - 2.5);
    this.rotationSpeed = this.random.float(-4, 4);
  }
}

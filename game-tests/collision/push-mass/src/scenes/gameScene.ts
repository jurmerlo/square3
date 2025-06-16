import { World } from '@square3/collision';
import { type Camera, Color, type Graphics, Scene, type View, inject } from '@square3/square3';
import { EBox } from '../entities/eBox';
import { EPlayer } from '../entities/ePlayer';

export class GameScene extends Scene {
  private world!: World;

  @inject()
  private view!: View;

  override init(): void {
    this.world = new World({
      size: { width: this.view.viewWidth, height: this.view.viewHeight },
      gravity: { x: 0, y: 20 },
    });

    const floor = new EBox({
      x: this.view.viewCenterX,
      y: 500,
      type: 'static',
      world: this.world,
      width: this.view.viewWidth - 20,
      height: 30,
      color: new Color(0.2, 0.2, 0.2, 1),
    });
    this.addEntity(floor);

    const player = new EPlayer({
      x: this.view.viewCenterX,
      y: 200,
      type: 'dynamic',
      world: this.world,
      width: 20,
      height: 40,
      color: new Color(0.8, 0.2, 0.2, 1),
      drag: { x: 5, y: 0 },
      mass: 2,
    });
    this.addEntity(player);

    const leftBox = new EBox({
      x: this.view.viewCenterX - 100,
      y: 200,
      type: 'dynamic',
      world: this.world,
      width: 20,
      height: 20,
      color: new Color(0.2, 0.8, 0.2, 1),
      mass: 4,
    });
    this.addEntity(leftBox);

    const rightBox = new EBox({
      x: this.view.viewCenterX + 100,
      y: 200,
      type: 'dynamic',
      world: this.world,
      width: 20,
      height: 20,
      color: new Color(0.2, 0.2, 0.8, 1),
      mass: 10,
    });
    this.addEntity(rightBox);
  }

  override update(dt: number): void {
    this.world.update(dt);
    super.update(dt);
  }

  override drawWithCamera(graphics: Graphics, camera: Camera): void {
    super.drawWithCamera(graphics, camera);
    this.world.draw(graphics);
  }
}

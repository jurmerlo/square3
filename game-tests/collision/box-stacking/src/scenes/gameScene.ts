import { World } from '@square3/collision';
import { type Camera, Color, type Graphics, type Input, Scene, type View, inject } from '@square3/square3';
import { BoxEntity } from '../entities/boxEntity';

export class GameScene extends Scene {
  private world!: World;

  @inject()
  private input!: Input;

  @inject()
  private view!: View;

  private boxColor = new Color(0.9, 0.4, 0.3, 1);

  override init(): void {
    this.world = new World({
      size: { width: this.view.viewWidth, height: this.view.viewHeight },
      gravity: { x: 0, y: 20 },
    });
    this.world.showQuadTree = true;

    const floor = new BoxEntity({
      x: this.view.viewCenterX,
      y: 500,
      type: 'static',
      world: this.world,
      width: this.view.viewWidth - 20,
      height: 30,
      color: new Color(0.2, 0.2, 0.2, 1),
    });
    this.addEntity(floor);

    const box = new BoxEntity({
      x: this.view.viewCenterX,
      y: 100,
      type: 'dynamic',
      world: this.world,
      color: this.boxColor,
    });
    this.addEntity(box);

    this.input.on({
      event: 'mousePressed',
      callback: (_, x, y): void => {
        const pos = this.camera.screenToWorld(x, y);
        const newBox = new BoxEntity({
          x: pos.x,
          y: pos.y,
          type: 'dynamic',
          world: this.world,
          color: this.boxColor,
        });
        this.addEntity(newBox);
      },
    });
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

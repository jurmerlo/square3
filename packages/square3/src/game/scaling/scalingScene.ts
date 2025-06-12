import { type Graphics, Scene, type View, inject, scaleModeFitHeight } from '../../square3';

export class ScalingScene extends Scene {
  @inject()
  private view!: View;

  override init(): void {
    this.view.scaleMode = scaleModeFitHeight;
  }

  override draw(graphics: Graphics): void {
    graphics.transform.identity();
    graphics.startBatch();
    graphics.color.set(0.3, 0.3, 0.3, 1);
    graphics.drawSolidRect(0, 0, this.view.viewWidth, this.view.viewHeight);
    graphics.color.set(0.2, 0.3, 1, 1);
    graphics.drawRect(0, 0, this.view.viewWidth, this.view.viewHeight, 2);
    graphics.color.set(0, 1, 0.2, 1);
    graphics.drawRect(10, 10, 50, 50);
    graphics.drawBatch();
  }
}

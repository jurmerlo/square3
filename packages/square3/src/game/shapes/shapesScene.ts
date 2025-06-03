import { Color, Scene } from '../../square3';
import { EBox } from './eBox';

export class ShapesScene extends Scene {
  override init(): void {
    const box = new EBox({ x: 100, y: 200, width: 50, height: 80, fillColor: new Color(0.2, 0.7, 0.3) });
    this.addEntity(box);

    const box2 = new EBox({
      x: 300,
      y: 200,
      width: 100,
      height: 80,
      outlineColor: new Color(0.2, 0.3, 0.7),
      outlineWidth: 3,
    });
    this.addEntity(box2);

    const box3 = new EBox({
      x: 500,
      y: 200,
      width: 150,
      height: 80,
      fillColor: new Color(0.0, 0.2, 0.3),
      outlineColor: new Color(0.3, 0.4, 0.2),
      outlineWidth: 5,
    });
    this.addEntity(box3);
  }
}

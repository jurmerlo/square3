import { CBoxShape, CTransform, type Color, Entity, type Graphics } from '../../square3';

export type EBoxOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillColor?: Color;
  outlineColor?: Color;
  outlineWidth?: number;
};

export class EBox extends Entity {
  transform: CTransform;

  box: CBoxShape;

  constructor({ x, y, width, height, fillColor, outlineColor, outlineWidth }: EBoxOptions) {
    super();

    this.transform = new CTransform({ x, y });
    this.box = new CBoxShape({ width, height, fillColor, outlineColor, outlineWidth });
  }

  override draw(graphics: Graphics): void {
    this.transform.drawWithTransform(graphics, () => {
      this.box.draw(graphics);
    });
  }
}

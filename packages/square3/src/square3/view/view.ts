import { Size } from '../math/size';
import { Vec2 } from '../math/vec2';
import { type ScaleMode, scaleModeFitView } from './scaleModes';

export type ViewOptions = {
  designWidth: number;
  designHeight: number;
  pixelRatio: number;
  canvas: HTMLCanvasElement;
  targetFps: number;
};

export class View {
  readonly pixelRatio: number;

  readonly viewAnchor = new Vec2();

  readonly canvas: HTMLCanvasElement;

  targetFps: number;

  debugRender = false;

  get designWidth(): number {
    return this.designSize.width;
  }

  get designHeight(): number {
    return this.designSize.height;
  }

  get canvasWidth(): number {
    return this.canvas.clientWidth * this.pixelRatio;
  }

  get canvasHeight(): number {
    return this.canvas.clientHeight * this.pixelRatio;
  }

  get canvasCenterX(): number {
    return this.canvasWidth * 0.5;
  }

  get canvasCenterY(): number {
    return this.canvasHeight * 0.5;
  }

  get viewWidth(): number {
    return this.viewSize.width;
  }

  get viewHeight(): number {
    return this.viewSize.height;
  }

  get viewCenterX(): number {
    return this.viewSize.width * 0.5;
  }

  get viewCenterY(): number {
    return this.viewSize.height * 0.5;
  }

  get viewScaleX(): number {
    return this.viewScale.x;
  }

  get viewScaleY(): number {
    return this.viewScale.y;
  }

  get viewOffsetX(): number {
    return this.viewOffset.x;
  }

  get viewOffsetY(): number {
    return this.viewOffset.y;
  }

  get scaleMode(): ScaleMode {
    return this._scaleMode;
  }

  set scaleMode(mode: ScaleMode) {
    this._scaleMode = mode;
    this.scaleToFit();
  }

  private designSize = new Size();

  private viewSize = new Size();

  private viewScale = new Vec2();

  private viewOffset = new Vec2();

  private _scaleMode: ScaleMode;

  constructor({ designWidth, designHeight, pixelRatio, canvas, targetFps }: ViewOptions) {
    this.designSize.set(designWidth, designHeight);
    this.canvas = canvas;
    this.pixelRatio = pixelRatio;
    this.targetFps = targetFps;

    this._scaleMode = scaleModeFitView;
    this.scaleToFit();
  }

  scaleToFit(): void {
    const { viewWidth, viewHeight, scaleFactorX, scaleFactorY, offsetX, offsetY } = this.scaleMode({
      designWidth: this.designWidth,
      designHeight: this.designHeight,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      anchorX: this.viewAnchor.x,
      anchorY: this.viewAnchor.y,
    });

    this.viewSize.set(viewWidth, viewHeight);
    this.viewScale.set(scaleFactorX, scaleFactorY);
    this.viewOffset.set(offsetX, offsetY);
  }
}

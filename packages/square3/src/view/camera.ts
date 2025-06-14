import { inject } from '../di/inject.js';
import { Color } from '../graphics/color.js';
import { RenderTarget } from '../graphics/renderTarget.js';
import { Mat4 } from '../math/mat4.js';
import { clamp, rotateAround, toRad } from '../math/mathUtils.js';
import { Rectangle } from '../math/rectangle.js';
import { Vec2 } from '../math/vec2.js';
import type { View } from './view.js';

/**
 * The camera creation options.
 */
export type CameraOptions = {
  /**
   * The x-coordinate of the camera's center position.
   */
  x?: number;

  /**
   * The y-coordinate of the camera's center position.
   */
  y?: number;

  /**
   * The rotation angle of the camera in degrees.
   */
  rotation?: number;

  /**
   * The zoom level of the camera.
   */
  zoom?: number;

  /**
   * The x-coordinate of the view rectangle compared to the screen (0 - 1).
   */
  viewX?: number;

  /**
   * The y-coordinate of the view rectangle compared to the screen (0 - 1).
   */
  viewY?: number;

  /**
   * The width of the view rectangle compared to the screen (0 - 1).
   */
  viewWidth?: number;

  /**
   * The height of the view rectangle compared to the screen (0 - 1).
   */
  viewHeight?: number;

  /**
   * The background color of the camera.
   */
  bgColor?: Color;

  /**
   * The render layers that should be ignored by the camera.
   */
  ignoredLayers?: number[];
};

/**
 * Camera class.
 */
export class Camera {
  /**
   * Indicates if the camera is used to render.
   */
  active = true;

  /**
   * The center position of the camera.
   */
  position = new Vec2();

  /**
   * The rotation angle of the camera in degrees.
   */
  rotation = 0;

  /**
   * The zoom level of the camera.
   */
  zoom = 1;

  /**
   * The transformation matrix of the camera.
   */
  transform = new Mat4();

  /**
   * The background color of the camera.
   */
  bgColor = new Color(0, 0, 0);

  /**
   * The render layers that should be ignored by the camera.
   */
  ignoredLayers: number[] = [];

  /**
   * The screen bounds of the camera.
   */
  screenBounds = new Rectangle();

  /**
   * The render canvas used by the camera.
   */
  target!: RenderTarget;

  /**
   * The view rectangle of the camera.
   */
  viewRect = new Rectangle();

  private tempMatrix = new Mat4();

  @inject()
  private view!: View;

  /**
   * Creates a new Camera instance.
   * @param options - The camera creation options.
   */
  constructor({
    bgColor,
    ignoredLayers,
    rotation,
    viewX,
    viewY,
    viewHeight,
    viewWidth,
    x,
    y,
    zoom,
  }: CameraOptions = {}) {
    this.position.set(x ?? this.view.viewWidth * 0.5, y ?? this.view.viewHeight * 0.5);
    this.rotation = rotation ?? 0;
    this.zoom = zoom ?? 1;
    this.bgColor = bgColor ?? new Color(0, 0, 0);
    this.ignoredLayers = ignoredLayers ?? [];
    this.updateView(viewX ?? 0, viewY ?? 0, viewWidth ?? 1, viewHeight ?? 1);
  }

  /**
   * Updates the transformation matrix of the camera.
   */
  updateTransform(): void {
    Mat4.fromTranslation(this.screenBounds.width * 0.5, this.screenBounds.height * 0.5, 0, this.transform);
    Mat4.fromZRotation(toRad(this.rotation), this.tempMatrix);
    Mat4.multiply(this.transform, this.tempMatrix, this.transform);

    Mat4.fromScale(this.zoom, this.zoom, 1, this.tempMatrix);
    Mat4.multiply(this.transform, this.tempMatrix, this.transform);

    Mat4.fromTranslation(-this.position.x, -this.position.y, 0, this.tempMatrix);
    Mat4.multiply(this.transform, this.tempMatrix, this.transform);
  }

  /**
   * Converts screen coordinates to world coordinates.
   * @param x - The x-coordinate on the screen.
   * @param y - The y-coordinate on the screen.
   * @returns The corresponding world coordinates.
   */
  screenToWorld(x: number, y: number, out?: Vec2): Vec2 {
    const tempX =
      this.position.x -
      (this.screenBounds.width * 0.5) / this.zoom +
      (x / (this.view.canvasWidth / this.view.pixelRatio)) * (this.screenBounds.width / this.zoom);

    const tempY =
      this.position.y -
      (this.screenBounds.height * 0.5) / this.zoom +
      (y / (this.view.canvasHeight / this.view.pixelRatio)) * (this.screenBounds.height / this.zoom);

    const tempPos = Vec2.get(tempX, tempY);
    const tempCenter = Vec2.get(this.position.x, this.position.y);

    return rotateAround(tempPos, tempCenter, -this.rotation, out);
  }

  /**
   * Updates the view rectangle and screen bounds of the camera.
   * @param x - The x-coordinate of the view rectangle.
   * @param y - The y-coordinate of the view rectangle.
   * @param width - The width of the view rectangle.
   * @param height - The height of the view rectangle.
   */
  updateView(x: number, y: number, width: number, height: number): void {
    const xCl = clamp(x, 0, 1);
    const yCl = clamp(y, 0, 1);
    const widthCl = clamp(width, 0, 1);
    const heightCl = clamp(height, 0, 1);

    this.viewRect.set(xCl, yCl, widthCl, heightCl);

    this.screenBounds.set(
      xCl * this.view.viewWidth,
      yCl * this.view.viewHeight,
      widthCl * this.view.viewWidth,
      heightCl * this.view.viewHeight,
    );

    this.target = new RenderTarget(widthCl * this.view.viewWidth, heightCl * this.view.viewHeight);
  }

  /**
   * Resizes the camera view.
   */
  resize(): void {
    this.updateView(this.viewRect.x, this.viewRect.y, this.viewRect.width, this.viewRect.height);
  }

  /**
   * Destroys the camera and releases its resources.
   */
  destroy(): void {
    this.target.destroy();
  }
}

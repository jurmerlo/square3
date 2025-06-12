import {
  CBoxShape,
  CTransform,
  type Camera,
  Color,
  Entity,
  Game,
  type Graphics,
  type Input,
  type Random,
  Scene,
  type View,
  inject,
} from '@square3/square3';
import { Body, type BodyType, World } from '../square3-collision';

type BoxEntityOptions = {
  x: number;
  y: number;
  type: BodyType;
  world: World;
  color?: Color;
  width?: number;
  height?: number;
};

class BoxEntity extends Entity {
  private cTransform: CTransform;

  private cBoxShape: CBoxShape;

  private body: Body;

  private world: World;

  @inject()
  private random!: Random;

  constructor({ x, y, type, world, color, width, height }: BoxEntityOptions) {
    super();

    this.world = world;

    this.cTransform = new CTransform({ x, y });

    const boxWidth = width ?? this.random.int(20, 40);
    const boxHeight = height ?? this.random.int(20, 40);
    const boxColor = color ?? new Color(1, 1, 1, 1);

    this.body = new Body({
      size: { width: boxWidth, height: boxHeight },
      position: { x, y },
      bodyType: type,
    });
    this.world.addBody(this.body);
    this.cBoxShape = new CBoxShape({ width: boxWidth, height: boxHeight, fillColor: boxColor });
  }

  override preUpdate(_dt: number): void {
    this.body.updatePosition(this.cTransform.position.x, this.cTransform.position.y);
  }

  override postUpdate(_dt: number): void {
    this.body.getPosition(this.cTransform.position);
  }

  override draw(graphics: Graphics): void {
    this.cTransform.drawWithTransform(graphics, () => {
      this.cBoxShape.draw(graphics);
    });
  }

  override destroy(): void {
    this.world.removeBody(this.body);
  }
}

class CollisionScene extends Scene {
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
        const pos = this.cameras[0].screenToWorld(x, y);
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

new Game({ startScene: CollisionScene });

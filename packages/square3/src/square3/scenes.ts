import type { Entity } from './entity';
import type { Graphics } from './graphics/graphics';
import { Camera } from './view/camera';

/**
 * SceneSwitchType is a type that defines the possible types of scene switches.
 * It can be 'push', 'replace', or 'replaceAll'.
 * - 'push': Pushes a new scene onto the stack.
 * - 'replace': Replaces the current scene with a new one.
 * - 'replaceAll': Replaces all scenes in the stack with a new one.
 */
export type SceneSwitchType = 'push' | 'replace' | 'replaceAll';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type SceneType = new (...args: any[]) => Scene;

/**
 * Scene manager class that handles switching between different scenes.
 */
export class Scenes {
  /**
   * The current active scene.
   */
  get current(): Scene | null {
    return this.sceneStack[this.sceneStack.length - 1] ?? null;
  }

  /**
   * The scene stack. The last scene in the array is the current scene.
   */
  sceneStack: Scene[];

  private sceneTypeToSwitch?: {
    type: SceneSwitchType | 'pop';
    sceneType?: SceneType;
  };

  constructor() {
    this.sceneStack = [];
  }

  /**
   * Switch to a new scene.
   * @param sceneType The new scene type to switch to.
   * @param type The type of switch.
   */
  switch(sceneType: SceneType, type: SceneSwitchType = 'replace'): void {
    this.sceneTypeToSwitch = {
      type,
      sceneType,
    };
  }

  /**
   * Pop the current scene from the stack.
   */
  pop(): void {
    this.sceneTypeToSwitch = {
      type: 'pop',
    };
  }

  /**
   * Updates the current scene before the main update loop.
   * @param dt Delta time since the last update in seconds.
   */
  preUpdate(dt: number): void {
    this.updateStack();

    this.current?.preUpdate(dt);
  }

  /**
   * Updates the current scene.
   * @param dt Delta time since the last update in seconds.
   */
  update(dt: number): void {
    this.current?.update(dt);
  }

  /**
   * Updates the current scene after the main update loop.
   * @param dt Delta time since the last update in seconds.
   */
  postUpdate(dt: number): void {
    this.current?.postUpdate(dt);
  }

  draw(graphics: Graphics): void {
    if (this.current) {
      if (this.current.isSubScene && this.sceneStack.length > 1) {
        this.sceneStack[this.sceneStack.length - 2].draw(graphics);
      }

      this.current.draw(graphics);
    }
  }

  toForeground(): void {
    if (this.current) {
      this.current.toForeground();
    }
  }

  toBackground(): void {
    if (this.current) {
      this.current.toBackground();
    }
  }

  resize(width: number, height: number): void {
    if (this.current) {
      this.current.resize(width, height);
    }
  }

  private updateStack(): void {
    if (this.sceneTypeToSwitch) {
      const { type, sceneType } = this.sceneTypeToSwitch;

      if (type === 'pop') {
        if (this.sceneStack.length <= 1) {
          console.log('Cannot pop the last scene from the stack.');
          this.sceneTypeToSwitch = undefined;
          return;
        }

        const scene = this.sceneStack.pop();
        if (scene) {
          scene.destroy();
        }

        if (this.sceneStack.length > 0) {
          this.current?.resume();
        }

        this.sceneTypeToSwitch = undefined;
      } else if (sceneType) {
        const newScene = new sceneType();

        switch (type) {
          case 'push':
            this.current?.pause();
            this.sceneStack.push(newScene);
            break;

          case 'replace':
            this.current?.destroy();
            this.sceneStack.pop();
            this.sceneStack.push(newScene);
            break;

          case 'replaceAll':
            while (this.sceneStack.length > 0) {
              this.sceneStack.pop()?.destroy();
            }

            this.sceneStack.push(newScene);
        }

        this.sceneTypeToSwitch = undefined;

        // Initialize the new scene.
        if (newScene.load) {
          newScene
            .load()
            .then(() => {
              newScene.init();
              newScene.initialized = true;
            })
            .catch((error) => {
              console.error('Error loading scene:', error);
            });
        } else {
          newScene.init();
          newScene.initialized = true;
        }
      }
    }
  }
}

export abstract class Scene {
  isSubScene = false;

  cameras: Camera[] = [];

  layers: Entity[][] = [];

  entities: Entity[] = [];

  initialized = false;

  private entitiesToRemove: Entity[] = [];

  private layerTracking: Record<number, number> = {};

  constructor() {
    for (let i = 0; i < 32; i++) {
      this.layers.push([]);
    }
    this.cameras.push(new Camera());
  }

  async load?(): Promise<void>;

  init(): void {}

  addEntity(entity: Entity): void {
    this.entities.push(entity);
    this.layers[entity.layer].push(entity);
    this.layerTracking[entity.id] = entity.layer;
  }

  removeEntity(entity: Entity): void {
    this.entitiesToRemove.push(entity);
  }

  preUpdate(dt: number): void {
    if (!this.initialized) {
      return;
    }

    this.removeEntities();

    for (const entity of this.entities) {
      if (entity.active && entity.preUpdate) {
        entity.preUpdate(dt);
      }
    }
  }

  update(dt: number): void {
    if (!this.initialized) {
      return;
    }

    for (const entity of this.entities) {
      if (entity.active && entity.update) {
        entity.update(dt);
      }
    }
  }

  postUpdate(dt: number): void {
    if (!this.initialized) {
      return;
    }

    for (const entity of this.entities) {
      if (entity.active && entity.postUpdate) {
        entity.postUpdate(dt);
      }
    }
  }

  draw(graphics: Graphics): void {
    if (!this.initialized) {
      return;
    }

    for (const entity of this.entities) {
      if (entity.active) {
        this.updateLayer(entity);
      }
    }

    for (const camera of this.cameras) {
      if (camera.active) {
        camera.updateTransform();

        graphics.color.set(1, 1, 1, 1);
        graphics.pushTarget(camera.target);
        graphics.startBatch(true, camera.bgColor);

        graphics.pushTransform();
        graphics.applyTransform(camera.transform);

        this.drawWithCamera(graphics, camera);

        graphics.drawBatch();
        graphics.popTransform();
        graphics.popTarget();
      }
    }

    graphics.transform.identity();
    graphics.color.set(1, 1, 1, 1);

    graphics.startBatch();
    for (const camera of this.cameras) {
      if (camera.active) {
        graphics.drawRenderTarget(camera.screenBounds.x, camera.screenBounds.y, camera.target);
      }
    }
    graphics.drawBatch();
  }

  drawWithCamera(graphics: Graphics, camera: Camera): void {
    for (let i = 0; i < this.layers.length; i++) {
      const entities = this.layers[i];
      if (entities.length > 0 && !camera.ignoredLayers.includes(i)) {
        for (const entity of entities) {
          if (entity.active && entity.draw) {
            entity.draw(graphics);
          }
        }
      }
    }
  }

  pause(): void {
    // Pause when a new scene is pushed.
  }

  resume(): void {
    // Resume when the scene above scene is popped.
  }

  toForeground(): void {
    // Called when the scene is brought to the foreground.
  }

  toBackground(): void {
    // Called when the scene is sent to the background.
  }

  resize(_width: number, _height: number): void {
    for (const camera of this.cameras) {
      camera.resize();
    }
  }

  destroy(): void {
    for (const camera of this.cameras) {
      camera.destroy();
    }

    for (const entity of this.entities) {
      entity.destroy();
    }
  }

  private updateLayer(entity: Entity): void {
    if (entity.layerUpdated) {
      const currentLayer = this.layerTracking[entity.id];

      if (currentLayer !== entity.layer) {
        const index = this.layers[currentLayer].indexOf(entity);
        if (index !== -1) {
          this.layers[currentLayer].splice(index, 1);
        }

        this.layers[entity.layer].push(entity);
        this.layerTracking[entity.id] = entity.layer;
      }
      entity.layerUpdated = false;
    }
  }

  private removeEntities(): void {
    while (this.entitiesToRemove.length > 0) {
      const entity = this.entitiesToRemove.pop();
      if (!entity) {
        continue;
      }
      entity.destroy();

      const index = this.entities.indexOf(entity);
      if (index !== -1) {
        this.entities.splice(index, 1);
      }

      const layer = this.layerTracking[entity.id];
      const layerIndex = this.layers[layer].indexOf(entity);
      if (layerIndex !== -1) {
        this.layers[layer].splice(layerIndex, 1);
      }
    }
  }
}

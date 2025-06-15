import type { Graphics } from '../graphics/graphics.js';
import { Camera } from '../view/camera.js';
import type { Entity } from './entity.js';

/**
 * Base class for scenes in the game.
 * Scenes are used to manage entities, cameras, and rendering.
 */
export abstract class Scene {
  /**
   * Whether the scene is a sub-scene of another scene.
   * If true, the scene is rendered on top of a parent scene.
   */
  isSubScene = false;

  /**
   * The main camera of the scene.
   */
  get camera(): Camera {
    return this.allCameras[0];
  }

  /**
   * All cameras in the scene.
   */
  allCameras: Camera[] = [];

  /**
   * Rendering layers for the scene.
   */
  layers: Entity[][] = [];

  /**
   * All entities in the scene.
   */
  entities: Entity[] = [];

  /**
   * Track if the scene has been initialized.
   */
  initialized = false;

  /**
   * Entities that are scheduled for removal next update.
   */
  private entitiesToRemove: Entity[] = [];

  /**
   * Tracks the current layer of each entity by its ID.
   * Used for
   */
  private layerTracking: Record<number, number> = {};

  constructor() {
    for (let i = 0; i < 32; i++) {
      this.layers.push([]);
    }
    this.allCameras.push(new Camera());
  }

  /**
   * Load assets or perform any asynchronous operations needed before the scene is initialized.
   */
  async load?(): Promise<void>;

  /**
   * Initialize the scene. This is called after the scene is loaded and before the first update.
   */
  init(): void {}

  /**
   * Add an entity to the scene.
   * @param entity The entity to add.
   */
  addEntity(entity: Entity): void {
    this.entities.push(entity);
    this.layers[entity.layer].push(entity);
    this.layerTracking[entity.id] = entity.layer;
  }

  /**
   * Remove an entity from the scene on the next update.
   * @param entity The entity to remove.
   */
  removeEntity(entity: Entity): void {
    this.entitiesToRemove.push(entity);
  }

  /**
   * Update the scene before the main update loop.
   * @param dt  Delta time since the last update in seconds.
   * @returns
   */
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

  /**
   * Update the scene.
   * @param dt Delta time since the last update in seconds.
   */
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

  /**
   * Update the scene after the main update loop.
   * @param dt Delta time since the last update in seconds.
   */
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

  /**
   * Draw the scene using the provided graphics context.
   * @param graphics The graphics context to draw with.
   */
  draw(graphics: Graphics): void {
    if (!this.initialized) {
      return;
    }

    for (const entity of this.entities) {
      if (entity.active) {
        this.updateLayer(entity);
      }
    }

    // Render the scene with all active cameras.
    for (const camera of this.allCameras) {
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

    // Draw all render targets for active cameras.
    graphics.startBatch();
    for (const camera of this.allCameras) {
      if (camera.active) {
        graphics.drawRenderTarget(camera.screenBounds.x, camera.screenBounds.y, camera.target);
      }
    }
    graphics.drawBatch();
  }

  /**
   * Draw the scene with the specified camera.
   * @param graphics The graphics context to draw with.
   * @param camera The camera to use for rendering.
   */
  drawWithCamera(graphics: Graphics, camera: Camera): void {
    for (let i = 0; i < this.layers.length; i++) {
      const entities = this.layers[i];
      if (entities.length > 0 && !camera.ignoredLayers.includes(i)) {
        for (const entity of entities) {
          if (entity.active && entity.draw) {
            graphics.pushTransform();
            const matrix = entity.transform.getMatrix();
            graphics.applyTransform(matrix);
            entity.draw(graphics);
            graphics.popTransform();
            matrix.put();
          }
        }
      }
    }
  }

  /**
   * Called when a new scene is pushed on top of this scene.
   */
  onPause(): void {}

  /**
   * Called when this scene is resumed after being paused.
   * This is typically called when the scene above this scene is popped.
   */
  onResume(): void {}

  /**
   * Called when the scene is brought to the foreground.
   * This is typically called when the game window gains focus.
   */
  toForeground(): void {}

  /**
   *  Called when the scene is sent to the background.
   *  This is typically called when the game window loses focus.
   */
  toBackground(): void {}

  /**
   * Called when the browser window is resized.
   * @param _width The new width of the window.
   * @param _height The new height of the window.
   */
  onResize(_width: number, _height: number): void {
    for (const camera of this.allCameras) {
      camera.resize();
    }
  }

  /**
   *  Destroys the scene, cleaning up all entities and cameras.
   */
  destroy(): void {
    for (const camera of this.allCameras) {
      camera.destroy();
    }

    for (const entity of this.entities) {
      entity.destroy();
    }
  }

  /**
   * Updates the layer of an entity if it has changed.
   * @param entity The entity to update.
   */
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

  /**
   * Removes entities that are scheduled for removal.
   * This is called at the start of the preUpdate step.
   */
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

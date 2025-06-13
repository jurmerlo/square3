import type { Graphics } from '../graphics/graphics';
import { Entity } from './entity';
import type { Scene } from './scene';

/**
 * SceneSwitchType is a type that defines the possible types of scene switches.
 * It can be 'push', 'replace', or 'replaceAll'.
 * - 'push': Pushes a new scene onto the stack.
 * - 'replace': Replaces the current scene with a new one.
 * - 'replaceAll': Replaces all scenes in the stack with a new one.
 */
export type SceneSwitchType = 'push' | 'replace' | 'replaceAll';

/**
 * SceneType is a type that represents a constructor for a Scene.
 */
export type SceneType = new () => Scene;

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

  /**
   * The scene to switch to next update.
   */
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

  /**
   * Draw the current scene and an overlay if applicable.
   * @param graphics The graphics context to draw with.
   */
  draw(graphics: Graphics): void {
    if (this.current) {
      if (this.current.isSubScene && this.sceneStack.length > 1) {
        this.sceneStack[this.sceneStack.length - 2].draw(graphics);
      }

      this.current.draw(graphics);
    }
  }

  /**
   * Called when the canvas gets focused.
   */
  toForeground(): void {
    if (this.current) {
      this.current.toForeground();
    }
  }

  /**
   * Called when the canvas loses focus.
   */
  toBackground(): void {
    if (this.current) {
      this.current.toBackground();
    }
  }

  /**
   * Called when the window is resized.
   * @param width The new window width.
   * @param height The new window height.
   */
  onResize(width: number, height: number): void {
    if (this.current) {
      this.current.onResize(width, height);
    }
  }

  /**
   * Update the scene stack if there is a scene to switch to.
   */
  private updateStack(): void {
    if (!this.sceneTypeToSwitch) {
      return;
    }
    const { type, sceneType } = this.sceneTypeToSwitch;

    // Remove the current scene if there is more than one scene on the stack.
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
        this.current?.onResume();
      }

      this.sceneTypeToSwitch = undefined;
    } else if (sceneType) {
      // Reset entity IDs if we are replacing all scenes.
      if (type === 'replaceAll' || (type === 'replace' && this.sceneStack.length === 1)) {
        Entity.resetIds();
      }

      const newScene = new sceneType();

      switch (type) {
        // Push a new scene on top of the stack.
        case 'push':
          this.current?.onPause();
          this.sceneStack.push(newScene);
          break;

        // Replace the current scene with a new one.
        case 'replace':
          this.current?.destroy();
          this.sceneStack.pop();
          this.sceneStack.push(newScene);
          break;

        // Replace all scenes in the stack with a new one.
        case 'replaceAll':
          while (this.sceneStack.length > 0) {
            this.sceneStack.pop()?.destroy();
          }

          this.sceneStack.push(newScene);
      }

      this.sceneTypeToSwitch = undefined;

      // If the new scene has a load method, call it and then initialize the scene.
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

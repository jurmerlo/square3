import { Assets } from './assets/assets.js';
import { registerBuiltinLoaders } from './assets/registerBuiltins.js';
import { addService } from './di/services.js';
import { GLContext } from './graphics/glContext.js';
import { Graphics } from './graphics/graphics.js';
import { RenderTarget } from './graphics/renderTarget.js';
import { Input } from './input/input.js';
import { clamp } from './math/mathUtils.js';
import { Random } from './math/random.js';
import { type SceneType, Scenes } from './scenes/scenes.js';
import { Time } from './utils/time.js';
import { View } from './view/view.js';

/**
 * This is the maximum value the delta time can be. To prevent big spikes.
 */
const MAX_DT = 1.0 / 15;

/**
 * Game startup options.
 */
export type GameOptions = {
  /**
   * The name in the title bar. Defaults to 'Square 3 Game'.
   */
  title?: string;

  /**
   * The resolution width the game is designed for in pixels. Defaults to 800.
   */
  width?: number;

  /**
   * The resolution height the game is designed for in pixels. Defaults to 600.
   */
  height?: number;

  /**
   * The width of the html canvas in pixels. Defaults to the width.
   */
  canvasWidth?: number;

  /**
   * The height of the html canvas in pixels. Defaults to the height.
   */
  canvasHeight?: number;

  /**
   * The id attribute of the html canvas element to run the game in. Defaults to 'square3Canvas'.
   */
  canvasId?: string;

  /**
   * The target frame rate of the game. Defaults to -1 (unlimited).
   */
  targetFps?: number;

  /**
   * Should the game keep running when not in focus. Defaults to false.
   */
  runInBackground?: boolean;

  /**
   * Should the game be rendered in high dpi. Defaults to false.
   */
  hdpi?: boolean;

  /**
   * Fill the browser window with the game canvas.
   */
  fillWindow?: boolean;

  /**
   * The scene to start the game with.
   */
  startScene: SceneType;
};

export class Game {
  /**
   * Should the game keep running when not in focus.
   */
  private runInBackground: boolean;

  private lastFrameTime = 0;

  private context: GLContext;

  private graphics: Graphics;

  private input: Input;

  private time: Time;

  private view: View;

  private target: RenderTarget;

  private scenes: Scenes;

  private inFocus = true;

  constructor(options: GameOptions) {
    const gameOptions = options;
    gameOptions.title = gameOptions.title || 'Square 3 Game';
    gameOptions.width = gameOptions.width || 800;
    gameOptions.height = gameOptions.height || 600;

    if (gameOptions.fillWindow) {
      gameOptions.canvasWidth = window.innerWidth;
      gameOptions.canvasHeight = window.innerHeight;
    }

    gameOptions.canvasWidth = gameOptions.canvasWidth || gameOptions.width;
    gameOptions.canvasHeight = gameOptions.canvasHeight || gameOptions.height;
    gameOptions.canvasId = gameOptions.canvasId || 'square3Canvas';
    gameOptions.targetFps = gameOptions.targetFps || -1;
    gameOptions.runInBackground = gameOptions.runInBackground || false;
    gameOptions.hdpi = gameOptions.hdpi || false;

    document.title = gameOptions.title;

    this.runInBackground = gameOptions.runInBackground;

    const pixelRatio = gameOptions.hdpi ? window.devicePixelRatio : 1;

    const canvas = document.getElementById(gameOptions.canvasId) as HTMLCanvasElement;

    if (!canvas) {
      throw new Error(`Canvas with id '${gameOptions.canvasId}' not found.`);
    }

    canvas.style.width = `${gameOptions.canvasWidth}px`;
    canvas.style.height = `${gameOptions.canvasHeight}px`;

    this.context = new GLContext(canvas);
    addService('glContext', this.context);

    this.view = new View({
      designWidth: gameOptions.width,
      designHeight: gameOptions.height,
      pixelRatio,
      canvas,
      targetFps: gameOptions.targetFps,
      fillWindow: gameOptions.fillWindow ?? false,
    });
    addService('view', this.view);

    this.time = new Time();
    addService('time', this.time);

    addService('audio', new Audio());

    this.graphics = new Graphics(this.context, this.view);
    addService('graphics', this.graphics);

    addService('random', new Random());

    this.input = new Input(canvas);
    addService('input', this.input);

    this.target = new RenderTarget(this.view.viewWidth, this.view.viewHeight);
    this.scenes = new Scenes();
    addService('scenes', this.scenes);

    const assets = new Assets();
    registerBuiltinLoaders(assets);
    addService('assets', assets);

    canvas.focus();
    canvas.addEventListener('blur', () => this.toBackground());
    canvas.addEventListener('focus', () => this.toForeground());
    window.addEventListener('resize', () => this.resize(window.innerWidth, window.innerHeight));

    requestAnimationFrame((_time) => {
      this.lastFrameTime = Date.now();
      this.scenes.switch(options.startScene);
      this.loop();
    });
  }

  toBackground(): void {
    this.scenes.toBackground();
    this.inFocus = false;
  }

  toForeground(): void {
    this.scenes.toForeground();
    this.inFocus = true;
  }

  resize(width: number, height: number): void {
    if (this.view.fillWindow) {
      this.view.canvas.style.width = `${width}px`;
      this.view.canvas.style.height = `${height}px`;
      this.view.scaleToFit();
      this.target = new RenderTarget(this.view.viewWidth, this.view.viewHeight);
    }
    this.scenes.onResize(width, height);
  }

  private loop(): void {
    requestAnimationFrame((_time) => this.loop());

    const now = performance.now();
    const timePassed = now - this.lastFrameTime;
    if (this.view.targetFps !== -1) {
      const interval = 1.0 / this.view.targetFps;
      if (timePassed < interval) {
        return;
      }
      const excess = timePassed % interval;

      this.update((timePassed - excess) / 1000);
      this.lastFrameTime = now - excess;
    } else {
      this.update(timePassed / 1000);
      this.lastFrameTime = now;
    }
  }

  private update(dt: number): void {
    if (!this.inFocus && !this.runInBackground) {
      return;
    }

    const dtCl = clamp(dt, 0, MAX_DT);
    this.time.update(dtCl);
    this.input.update();
    this.scenes.preUpdate(dtCl);
    this.scenes.update(dtCl);
    this.scenes.postUpdate(dtCl);

    this.draw();
  }

  private draw(): void {
    this.graphics.transform.identity();

    this.graphics.pushTarget(this.target);

    this.scenes.draw(this.graphics);

    this.graphics.popTarget();

    this.graphics.transform.identity();
    this.graphics.color.set(1, 1, 1, 1);

    this.graphics.startBatch();
    this.graphics.drawRenderTarget(this.view.viewOffsetX, this.view.viewOffsetY, this.target);
    this.graphics.drawBatch();
  }
}

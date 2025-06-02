import { type Assets, Atlas, Game, type Graphics, Scene, type Scenes, inject } from '../square3';

class LoadScene extends Scene {
  @inject()
  private assets!: Assets;

  @inject()
  private scenes!: Scenes;

  constructor() {
    super();
    this.loadAssets();
  }

  async loadAssets(): Promise<void> {
    const atlas = await this.assets.load(Atlas, 'sprites', 'assets/sprites');
    console.log('Atlas loaded:', atlas);

    this.scenes.switch(GameScene, 'replace');
  }
}

class GameScene extends Scene {
  override draw(graphics: Graphics): void {
    graphics.startBatch(true);
    graphics.color.set(1, 1, 0, 1);
    graphics.drawCircle(150, 150, 50, 12, 2);
    graphics.drawRect(100, 100, 100, 100, 1);
    graphics.drawBatch();
  }
}

new Game({ startScene: LoadScene });

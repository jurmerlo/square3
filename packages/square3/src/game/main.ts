import { Game, type Graphics, Scene } from '../square3';

class GameScenes extends Scene {
  override draw(graphics: Graphics): void {
    graphics.startBatch(true);
    graphics.color.set(1, 1, 0, 1);
    graphics.drawCircle(150, 150, 50, 12, 2);
    graphics.drawRect(100, 100, 100, 100, 1);
    graphics.drawBatch();
  }
}

new Game({ startScene: GameScenes });

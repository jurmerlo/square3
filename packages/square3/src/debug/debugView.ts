import type { Assets } from '../assets/assets.js';
import { inject } from '../di/inject.js';
import { BitmapFont } from '../graphics/bitmapFont.js';
import type { Graphics } from '../graphics/graphics.js';
import type { Time } from '../utils/time.js';
import type { View } from '../view/view.js';
import { getAllDebugWatchers } from './debugWatcher.js';

export class DebugView {
  enabled = false;

  watcherOffset = 30;

  @inject()
  private assets!: Assets;

  @inject()
  private time!: Time;

  @inject()
  private view!: View;

  private font: BitmapFont;

  constructor(debugEnabled = false) {
    this.enabled = debugEnabled;
    this.font = this.assets.get(BitmapFont, 's3DebugFont');
  }

  draw(graphics: Graphics): void {
    if (!this.enabled) return;
    graphics.startBatch(false);
    graphics.drawBitmapText(10, 10, this.font, `FPS: ${this.time.fps}`);

    const watchers = getAllDebugWatchers();
    for (let i = 0; i < watchers.length; i++) {
      const watcher = watchers[i];
      const text = `${watcher.name}: ${watcher.value}`;
      const y = this.view.viewHeight - this.watcherOffset - i * 30;
      graphics.drawBitmapText(10, y, this.font, text);
    }

    graphics.drawBatch();
  }
}

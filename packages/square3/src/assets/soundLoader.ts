import type { Audio } from '../audio/audio.js';
import { Sound } from '../audio/sound.js';
import { inject } from '../di/inject.js';
import { AssetLoader, type Assets } from './assets.js';

export class SoundLoader extends AssetLoader<Sound> {
  @inject()
  private audio!: Audio;

  constructor(assets: Assets) {
    super(Sound, assets);
  }

  async load(id: string, path: string, _props?: unknown, keep?: boolean): Promise<Sound> {
    const response = await fetch(path);
    if (response.status < 400) {
      const buffer = await response.arrayBuffer();
      const sound = await this.audio.decodeSound(id, buffer);

      if (sound) {
        if (keep) {
          this.loadedAssets[id] = sound;
        }

        return sound;
      }
    }

    throw new Error(`Unable to load sound ${id}.`);
  }
}

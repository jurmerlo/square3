import type { Assets } from './assets.js';
import { AtlasLoader } from './atlasLoader.js';
import { BitmapFontLoader } from './bitmapFontLoader.js';
import { ImageLoader } from './imageLoader.js';
import { SoundLoader } from './soundLoader.js';
import { TextLoader } from './textLoader.js';
import { TilesetLoader } from './tilesetLoader.js';

export function registerBuiltinLoaders(assets: Assets): void {
  assets.registerLoader(new ImageLoader(assets));
  assets.registerLoader(new TextLoader(assets));
  assets.registerLoader(new BitmapFontLoader(assets));
  assets.registerLoader(new SoundLoader(assets));
  assets.registerLoader(new AtlasLoader(assets));
  assets.registerLoader(new TilesetLoader(assets));
}

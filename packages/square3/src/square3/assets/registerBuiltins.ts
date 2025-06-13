import type { Assets } from './assets';
import { AtlasLoader } from './atlasLoader';
import { BitmapFontLoader } from './bitmapFontLoader';
import { ImageLoader } from './imageLoader';
import { SoundLoader } from './soundLoader';
import { TextLoader } from './textLoader';
import { TilesetLoader } from './tilesetLoader';

export function registerBuiltinLoaders(assets: Assets): void {
  assets.registerLoader(new ImageLoader(assets));
  assets.registerLoader(new TextLoader(assets));
  assets.registerLoader(new BitmapFontLoader(assets));
  assets.registerLoader(new SoundLoader(assets));
  assets.registerLoader(new AtlasLoader(assets));
  assets.registerLoader(new TilesetLoader(assets));
}

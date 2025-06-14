import { Rectangle } from '../math/rectangle.js';
import type { Image } from './image.js';

type FrameSize = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type AtlasFrameInfo = {
  filename: string;
  trimmed: boolean;
  frame: FrameSize;
  sourceSize: FrameSize;
};

type AtlasData = {
  frames: AtlasFrameInfo[];
};

export class AtlasFrame {
  readonly name: string;

  readonly frame: Rectangle;

  readonly trimmed: boolean;

  readonly sourceRect: Rectangle;

  static fromJsonFrame(frameInfo: AtlasFrameInfo): AtlasFrame {
    const frameRect = new Rectangle(
      frameInfo.frame.x,
      frameInfo.frame.y,
      frameInfo.frame.width,
      frameInfo.frame.height,
    );
    const sourceRect = new Rectangle(
      frameInfo.sourceSize.x,
      frameInfo.sourceSize.y,
      frameInfo.sourceSize.width,
      frameInfo.sourceSize.height,
    );

    return new AtlasFrame(frameInfo.filename, frameRect, frameInfo.trimmed, sourceRect);
  }

  constructor(name: string, frame: Rectangle, trimmed: boolean, sourceRect: Rectangle) {
    this.name = name;
    this.frame = frame;
    this.trimmed = trimmed;
    this.sourceRect = sourceRect;
  }
}

export class Atlas {
  readonly image: Image;

  private frames: Record<string, AtlasFrame> = {};

  constructor(image: Image, data: string) {
    this.image = image;

    const frameData = JSON.parse(data) as AtlasData;
    for (const frameInfo of frameData.frames) {
      const frame = AtlasFrame.fromJsonFrame(frameInfo);
      this.frames[frame.name] = frame;
    }
  }

  getFrame(name: string): AtlasFrame {
    if (!this.frames[name]) {
      console.log(`Frame ${name} does not exist in atlas`);
    }

    return this.frames[name];
  }
}

import type { Animation } from '../graphics/animation';
import type { Atlas } from '../graphics/atlas';
import type { CSprite } from './cSprite';

export type CAnimationOptions = {
  animations?: Animation[];
};

export class CAnimation {
  get isPlaying(): boolean {
    return this._isPlaying;
  }

  get currentFrameName(): string {
    return this._currentFrameName;
  }

  get currentAnimationId(): string {
    return this.current ? this.current.id : '';
  }

  get atlas(): Atlas | undefined {
    return this.current ? this.current.atlas : undefined;
  }

  get isFinished(): boolean {
    return this.current ? this.current.finished(this.time) : true;
  }

  private current?: Animation;

  private time = 0;

  private animations: Record<string, Animation>;

  private _isPlaying = false;

  private _currentFrameName = '';

  constructor({ animations = [] }: CAnimationOptions = {}) {
    this.animations = {};
    for (const anim of animations) {
      this.animations[anim.id] = anim;
    }
  }

  update(dt: number, sprite?: CSprite): void {
    if (!this._isPlaying || !this.current || this.isFinished) {
      return;
    }

    this.time += dt;
    this._currentFrameName = this.current.getFrameName(this.time);
    if (sprite) {
      sprite.setFrame(this._currentFrameName, this.current.atlas);
    }
  }

  play(id?: string): void {
    this.time = 0;
    if (id) {
      if (this.animations[id] && this._currentFrameName !== id) {
        this.current = this.animations[id];
      }
    }
    this._isPlaying = true;
  }

  stop(): void {
    this._isPlaying = false;
  }

  resume(): void {
    this._isPlaying = true;
  }

  add(animation: Animation): void {
    this.animations[animation.id] = animation;
  }

  remove(id: string): void {
    delete this.animations[id];
  }

  getById(id: string): Animation | undefined {
    return this.animations[id];
  }
}

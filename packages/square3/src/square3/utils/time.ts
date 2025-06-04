export class Time {
  timeScale = 1;

  get dt(): number {
    return this._dt;
  }

  get dtUnscaled(): number {
    return this._dtUnscaled;
  }

  get fps(): number {
    return this._fps;
  }

  private _dt = 0;

  private _dtUnscaled = 0;

  private _fps = 0;

  private frameTimes: number[] = [];

  update(dt: number): void {
    this._dtUnscaled = dt;
    this._dt = dt * this.timeScale;

    this.frameTimes.push(dt);
    if (this.frameTimes.length > 240) {
      this.frameTimes.shift();
    }

    let average = 0;
    for (const frameTime of this.frameTimes) {
      average += frameTime;
    }

    this._fps = Math.round(1 / (average / this.frameTimes.length));
  }
}

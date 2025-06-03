import { Game, type Input, Scene, type Scenes, inject } from '../square3';
import { ShapesScene } from './shapes/shapesScene';

let index = 0;

const scenes = [ShapesScene];

class BaseScene extends Scene {
  @inject()
  private input!: Input;

  @inject()
  private scenes!: Scenes;

  override init(): void {
    this.input.on({
      event: 'keyPressed',
      callback: (keyCode): void => {
        if (keyCode === 'Period') {
          index = (index + 1) % scenes.length;
          this.scenes.switch(scenes[index]);
        } else if (keyCode === 'Comma') {
          index = (index - 1 + scenes.length) % scenes.length;
          this.scenes.switch(scenes[index]);
        }
      },
    });

    this.scenes.switch(scenes[index], 'push');
  }
}

new Game({ startScene: BaseScene });

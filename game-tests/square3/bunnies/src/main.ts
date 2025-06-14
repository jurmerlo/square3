import { Game } from '@square3/square3';
import { BunniesScene } from './scenes/bunniesScene';

new Game({ startScene: BunniesScene, width: 800, height: 600, fillWindow: true });

import { Actor, Color, Engine, Shape } from "excalibur";
import { Block } from "./block";
import { loader } from "./resource";

const game = new Engine({
  width: 800,
  height: 600,
});
game.isDebug = true;

game.start(loader).then(() => {
  const block = new Block(0, 0, 100, 100, Color.Red);
  game.add(block);
});

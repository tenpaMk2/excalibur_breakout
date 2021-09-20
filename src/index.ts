import { Engine } from "excalibur";
import { loader } from "./resource";
import { Level } from "./level";

const game = new Engine({
  width: 800,
  height: 600,
});
game.isDebug = true;

game.add("level", new Level(game));
game.goToScene("level");

game.start(loader).then(() => {});

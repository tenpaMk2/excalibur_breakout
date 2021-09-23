import { DisplayMode, Engine } from "excalibur";
import { loader } from "./resource";
import { Level } from "./level";

const game = new Engine({
  width: 90 * 4,
  height: 160 * 4,
  displayMode: DisplayMode.Fixed,
  canvasElementId: "game",
});
game.isDebug = false;

game.add("level", new Level(game));
game.goToScene("level");

game.start(loader);

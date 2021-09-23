import { DisplayMode, Engine } from "excalibur";
import { loader } from "./resource";
import { Level } from "./level";

const game = new Engine({
  displayMode: DisplayMode.Container,
  canvasElementId: "game",
});
game.isDebug = true;

game.add("level", new Level(game));
game.goToScene("level");

game.start(loader).then(() => {});

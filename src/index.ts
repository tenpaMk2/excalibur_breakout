import { Actor, Color, Engine, Shape } from "excalibur";
import { Block } from "./block";
import { loader } from "./resource";

const game = new Engine({
  width: 800,
  height: 600,
});
game.isDebug = true;

let blocks = [];
const setupBlocks = (game: Engine, width: number, height: number) => {
  const numOfRow = 5;
  const numOfColumn = 10;
  const blockWidth = width / numOfRow;
  const blockHeight = (height / numOfColumn) * 0.5;
  const xs = [...Array(numOfRow).keys()].map((num) => num * blockWidth);
  const ys = [...Array(numOfColumn).keys()].map((num) => num * blockHeight);
  ys.forEach((y) => {
    xs.forEach((x) => {
      const block = new Block(
        x,
        y,
        blockWidth - 5,
        blockHeight - 5,
        Color.DarkGray
      );
      blocks.push(block);
      game.add(block);
    });
  });
};

game.start(loader).then(() => {
  const block = new Block(0, 0, 100, 100, Color.Red);
  game.add(block);

  setupBlocks(game, game.canvasWidth, game.canvasHeight);
});

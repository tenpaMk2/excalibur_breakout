import { Color, Engine, Random, Timer, Vector } from "excalibur";
import { Block } from "./block";
import { Ball } from "./ball";
import { loader } from "./resource";
import { TwoPI } from "excalibur/dist/Util";
import { Paddle } from "./paddle";

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

  const ball = new Ball(
    new Vector(game.canvasWidth * 0.2, game.canvasHeight * 0.7),
    game.canvas.height * 0.02
  );
  game.add(ball);

  const timer = new Timer({
    fcn: () => {
      const rand = new Random();
      const r = rand.floating(-TwoPI, TwoPI);
      const x = Math.cos(r) * 80;
      const y = Math.sin(r) * 80;
      ball.vel.x = x;
      ball.vel.y = y;
    },
    interval: 1000,
    repeats: false,
  });
  game.add(timer);

  const paddle = new Paddle(
    new Vector(game.canvasWidth * 0.5, game.canvasHeight * 0.95),
    game.canvasWidth * 0.15,
    game.canvasHeight * 0.02
  );
  game.add(paddle);

  game.input.pointers.primary.on("move", (evt) => {
    paddle.pos.x = evt.worldPos.x;
  });

  setupBlocks(game, game.canvasWidth, game.canvasHeight);
});

import { Scene, Engine, Vector, Actor } from "excalibur";
import { Ball } from "./ball";
import { Block } from "./block";
import { Paddle } from "./paddle";

export class Level extends Scene {
  constructor(engine: Engine) {
    super(engine);
  }

  setupBlocks = (width: number, height: number) => {
    const numOfRow = 5;
    const numOfColumn = 10;
    const blockWidth = width / numOfRow;
    const blockHeight = (height / numOfColumn) * 0.5;
    const xs = [...Array(numOfRow).keys()].map((num) => num * blockWidth);
    const ys = [...Array(numOfColumn).keys()].map((num) => num * blockHeight);

    const blocks: Actor[] = [];
    ys.forEach((y) => {
      xs.forEach((x) => {
        const block = new Block(x, y, blockWidth - 5, blockHeight - 5);
        blocks.push(block);
      });
    });

    return blocks;
  };

  onInitialize = (engine: Engine) => {
    const width = engine.drawWidth;
    const height = engine.drawHeight;

    const blocks = this.setupBlocks(width, height);
    blocks.forEach((block) => engine.add(block));

    const ball = new Ball(new Vector(width * 0.2, height * 0.7), height * 0.02);
    blocks.forEach((block) => ball.addKillTarget(block));
    engine.add(ball);

    const paddle = new Paddle(
      new Vector(width * 0.5, height * 0.95),
      width * 0.15,
      height * 0.02
    );
    engine.add(paddle);

    engine.input.pointers.primary.on("move", (evt) => {
      paddle.pos.x = evt.worldPos.x;
    });
  };
}

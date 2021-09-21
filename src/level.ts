import { Scene, Engine, Vector, Timer, Random, Color } from "excalibur";
import { TwoPI } from "excalibur/dist/Util";
import { Ball } from "./ball";
import { Block } from "./block";
import { Paddle } from "./paddle";

export class Level extends Scene {
  blocks: Block[];

  constructor(engine: Engine) {
    super(engine);

    this.blocks = [];
  }

  setupBlocks = (engine: Engine, width: number, height: number) => {
    const numOfRow = 5;
    const numOfColumn = 10;
    const blockWidth = width / numOfRow;
    const blockHeight = (height / numOfColumn) * 0.5;
    const xs = [...Array(numOfRow).keys()].map((num) => num * blockWidth);
    const ys = [...Array(numOfColumn).keys()].map((num) => num * blockHeight);
    ys.forEach((y) => {
      xs.forEach((x) => {
        const block = new Block(x, y, blockWidth - 5, blockHeight - 5);
        this.blocks.push(block);
        engine.add(block);
      });
    });
  };

  onInitialize = (engine: ex.Engine) => {
    const width = engine.drawWidth;
    const height = engine.drawHeight;

    this.setupBlocks(engine, width, height);

    const ball = new Ball(new Vector(width * 0.2, height * 0.7), height * 0.02);
    engine.add(ball);

    ball.on("exitviewport", (evt) => {
      // alert("You lose!");
    });

    ball.on("postupdate", (evt) => {
      const radius = ball.body.collider.localBounds.width / 2;
      if (ball.pos.x < radius) {
        ball.vel.x *= -1;
      }
      if (ball.pos.x + radius > engine.drawWidth) {
        ball.vel.x *= -1;
      }
      if (ball.pos.y < radius / 2) {
        ball.vel.y *= -1;
      }
    });

    ball.on("precollision", (ev) => {
      if (this.blocks.indexOf(ev.other) > -1) {
        ev.other.kill();
      }
      const intersection = ev.intersection.normalize();

      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        ball.vel.x *= -1;
      } else {
        ball.vel.y *= -1;
      }
    });

    const timer = new Timer({
      fcn: () => {
        const rand = new Random();
        const r = rand.floating(-TwoPI, TwoPI);
        const x = Math.cos(r) * 200;
        const y = Math.sin(r) * 200;
        ball.vel.x = x;
        ball.vel.y = y;
      },
      interval: 1000,
      repeats: false,
    });
    engine.add(timer);

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

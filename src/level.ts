import { Scene, Engine, Vector, Actor } from "excalibur";
import { Background } from "./background";
import { Ball } from "./ball";
import { Block } from "./block";
import { GameOverScreen } from "./gameover_screen";
import { Paddle } from "./paddle";

export class Level extends Scene {
  constructor(engine: Engine) {
    super(engine);
  }

  setupBlocks = (width: number, height: number) => {
    const numOfRow = 12;
    const numOfColumn = 18;
    const blockWidth = width / numOfRow;
    const blockHeight = (height / numOfColumn) * 0.9;
    const xs = [...Array(numOfRow).keys()].map((num) => num * blockWidth);
    const ys = [...Array(numOfColumn).keys()].map((num) => num * blockHeight);

    const blocks: Actor[] = [];
    ys.forEach((y) => {
      xs.forEach((x) => {
        const block = new Block(x, y, blockWidth, blockHeight);
        blocks.push(block);
      });
    });

    return blocks;
  };

  sortZIndex = (sortedActors: Actor[]) => {
    sortedActors.forEach((actor, idx) => (actor.z = idx));
  };

  onInitialize = (engine: Engine) => {
    const width = engine.drawWidth;
    const height = engine.drawHeight;
    const imageOriginX = -250;
    const imageOriginY = -150;
    const imageOffsetX = 300;
    const imageOffsetY = 600;
    const blockX = imageOriginX + imageOffsetX;
    const blockY = imageOriginY + imageOffsetY;

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
    paddle.setFlickTarget(ball);
    engine.add(paddle);

    engine.input.pointers.primary.on("move", (evt) => {
      paddle.pos.x = evt.worldPos.x;
    });

    const background = new Background(imageOriginX, imageOriginY, 853, 1280);
    engine.add(background);

    const gameOverScreen = new GameOverScreen(
      engine.drawWidth,
      engine.drawHeight
    );
    engine.add(gameOverScreen);
    gameOverScreen.visible = false;
    ball.addScreenTarget(gameOverScreen);

    this.sortZIndex([background, paddle, ball, ...blocks, gameOverScreen]);
  };
}

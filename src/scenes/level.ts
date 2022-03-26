import {
  Scene,
  Engine,
  Vector,
  Actor,
  Label,
  Color,
  Font,
  TextAlign,
  PreCollisionEvent,
  CollisionType,
} from "excalibur";
import { Background } from "../objects/background";
import { Ball } from "../objects/ball";
import { Block } from "../objects/block";
import { GameOverScreen } from "../objects/gameover_screen";
import { Paddle } from "../objects/paddle";
import { VectorUtil } from "../utilities/vector_util";

export class Level extends Scene {
  ball: Ball;
  gameOverScreen: GameOverScreen;

  constructor(engine: Engine) {
    super();
  }

  setupBlocks = (width: number, height: number) => {
    const numOfRow = 12;
    const numOfColumn = 18;
    const blockWidth = width / numOfRow;
    const blockHeight = (height / numOfColumn) * 0.6;
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

    const background = new Background(imageOriginX, imageOriginY, 853, 1280);
    engine.add(background);

    const blocks = this.setupBlocks(width, height);
    blocks.forEach((block) => engine.add(block));

    this.ball = new Ball(new Vector(width * 0.2, height * 0.7), height * 0.02);
    engine.add(this.ball);

    const paddle = new Paddle(
      new Vector(width * 0.5, height * 0.95),
      width * 0.15,
      height * 0.02
    );
    engine.add(paddle);

    // Inputs
    engine.input.pointers.primary.on("move", (evt) => {
      paddle.pos.x = evt.worldPos.x;
    });

    // Collisions

    // paddle.on("preCollision", (event: PreCollisionEvent) => {
    //   if (this.ball !== event.other) {
    //     return;
    //   }
    //   const velPolar = VectorUtil.toPolar(this.ball.vel);
    //   const diffX = this.ball.pos.x - paddle.pos.x;
    //   const diffY = this.ball.pos.y - (paddle.pos.y + paddle.height * 4);
    //   const diffPolar = VectorUtil.toPolar(new Vector(diffX, diffY));
    //   velPolar.radian = diffPolar.radian;
    //   this.ball.vel = VectorUtil.fromPolar(velPolar);
    // });

    const top = new Actor({
      x: engine.drawWidth / 2,
      y: 0,
      width: engine.drawWidth,
      height: 10,
      color: new Color(0x00, 0xff, 0xff),
      collisionType: CollisionType.Fixed,
    });
    engine.add(top);

    const right = new Actor({
      x: engine.drawWidth,
      y: engine.drawHeight / 2,
      width: 10,
      height: engine.drawHeight,
      color: new Color(0x00, 0xff, 0xff),
      collisionType: CollisionType.Fixed,
    });
    right.body.bounciness = 1;
    engine.add(right);

    const left = new Actor({
      x: 0,
      y: engine.drawHeight / 2,
      width: 10,
      height: engine.drawHeight,
      color: new Color(0x00, 0xff, 0xff),
      collisionType: CollisionType.Fixed,
    });
    engine.add(left);

    blocks.forEach((block) => {
      block.on("postcollision", () => {
        block.kill();
      });
    });
  };

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (this.ball.isKilled() && !this.gameOverScreen) {
      this.gameOverScreen = new GameOverScreen(
        _engine.drawWidth,
        _engine.drawHeight
      );
      _engine.add(this.gameOverScreen);

      const label = new Label({
        text: "GameOver",
        pos: new Vector(_engine.drawWidth / 2, _engine.drawHeight / 2),
        color: new Color(0xff, 0xff, 0xff),
        font: new Font({
          size: 48,
          textAlign: TextAlign.Center,
        }),
      });
      _engine.add(label);

      this.gameOverScreen.z = 10000;
      label.z = this.gameOverScreen.z + 1;
    }
  }
}

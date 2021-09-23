import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Shape,
  Sprite,
  Vector,
} from "excalibur";
import { Resources } from "./resource";

export class Block extends Actor {
  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new Vector(x, y),
      anchor: Vector.Zero,
      body: new Body({
        collider: new Collider({
          type: CollisionType.Passive,
          shape: Shape.Box(width, height, Vector.Zero),
        }),
      }),
    });

    const frontSprite = new Sprite(
      Resources.front,
      x - -250,
      y - -150,
      width,
      height
    );
    this.addDrawing("front", frontSprite);
    this.setDrawing("front");
  }
}

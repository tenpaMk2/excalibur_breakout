import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Shape,
  Vector,
} from "excalibur";

export class Block extends Actor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: Color = Color.Blue
  ) {
    super({
      pos: new Vector(x, y),
      color: color,
      body: new Body({
        collider: new Collider({
          type: CollisionType.Active,
          shape: Shape.Box(width, height, Vector.Zero),
        }),
      }),
    });
  }
}

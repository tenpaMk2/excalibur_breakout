import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Random,
  Shape,
  Vector,
} from "excalibur";

export class Block extends Actor {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color?: Color
  ) {
    const rand = new Random(Math.random() * 256 * 256 * 256);
    color = color ? color : Color.fromHSL(rand.floating(0, 1), 0.8, 0.5);
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

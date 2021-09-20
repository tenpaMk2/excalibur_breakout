import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Shape,
  Vector,
} from "excalibur";

export class Paddle extends Actor {
  constructor(pos: Vector, width: number, height: number) {
    super({
      pos: pos,
      color: Color.Green,
      body: new Body({
        collider: new Collider({
          type: CollisionType.Fixed,
          shape: Shape.Box(width, height),
        }),
      }),
    });
  }
}

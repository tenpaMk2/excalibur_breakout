import {
  Actor,
  Body,
  Collider,
  CollisionType,
  Color,
  Engine,
  PreCollisionEvent,
  Shape,
  Vector,
} from "excalibur";
import { VectorUtil } from "./vector_util";

export class Paddle extends Actor {
  public flickTargets: Actor[];

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

    this.flickTargets = [];
  }

  onInitialize = (engine: Engine) => {
    this.on("preCollision", (event: PreCollisionEvent) => {
      this.flickTargets.forEach((target) => {
        if (target === event.other) {
          const velPolar = VectorUtil.toPolar(target.vel);
          const diffX = target.pos.x - this.pos.x;
          const diffY = target.pos.y - this.pos.y;
          const diffPolar = VectorUtil.toPolar(new Vector(diffX, diffY));
          velPolar.radian = diffPolar.radian;
          target.vel = VectorUtil.fromPolar(velPolar);
        }
      });
    });
  };

  setFlickTarget = (target: Actor) => {
    this.flickTargets.push(target);
  };
}

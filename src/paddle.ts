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
          const polar = VectorUtil.toPolar(target.vel);
          polar.r *= 2;
          event.other.vel = VectorUtil.fromPolar(polar);
        }
      });
    });
  };

  setFlickTarget = (target: Actor) => {
    this.flickTargets.push(target);
  };
}

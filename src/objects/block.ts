import {
  Actor,
  CollisionType,
  EmitterType,
  Engine,
  ParticleEmitter,
  Sprite,
  Vector,
} from "excalibur";
import { Resources } from "../resource";

export class Block extends Actor {
  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new Vector(x, y),
      anchor: Vector.Zero,
      width: width,
      height: height,
      collisionType: CollisionType.Fixed,
    });

    const frontSprite = new Sprite({
      image: Resources.front,
      sourceView: {
        x: x - -250,
        y: y - -150,
        width: width,
        height: height,
      },
    });
    this.graphics.add(frontSprite);
    this.graphics.show("front");
  }

  onInitialize = (engine: Engine) => {
    // https://excaliburjs.com/docs/particles
    const emitter = new ParticleEmitter({
      emitterType: EmitterType.Circle,
      radius: 5,
      minVel: 40,
      maxVel: 120,
      minAngle: 0,
      maxAngle: Math.PI * 2,
      emitRate: 10, // 300 particles/second
      opacity: 0.3,
      fadeFlag: true, // fade particles overtime
      particleLife: 500, // in milliseconds = 1 sec
      maxSize: 10, // in pixels
      minSize: 1,
      isEmitting: true, // should the emitter be emitting
      pos: this.pos,
    });
    this.addChild(emitter);
    engine.add(emitter);
  };
}

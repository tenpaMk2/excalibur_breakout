import { Actor, CollisionType, Sprite, Vector } from "excalibur";
import { Resources } from "../resource";

export class Background extends Actor {
  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new Vector(x, y),
      anchor: Vector.Zero,
      width: width,
      height: height,
      collisionType: CollisionType.PreventCollision,
    });

    const backSprite = new Sprite({
      image: Resources.back,
      sourceView: {
        x: 0,
        y: 0,
        width: 853,
        height: 1280,
      },
    });
    this.graphics.add(backSprite);
    this.graphics.show("back");
  }
}

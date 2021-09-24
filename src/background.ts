import { Actor, Body, Collider, Shape, Sprite, Vector } from "excalibur";
import { Resources } from "./resource";

export class Background extends Actor {
  constructor(x: number, y: number, width: number, height: number) {
    super({
      pos: new Vector(x, y),
      anchor: Vector.Zero,
      body: new Body({
        collider: new Collider({
          shape: Shape.Box(width, height, Vector.Zero),
        }),
      }),
    });

    const backSprite = new Sprite(Resources.back, 0, 0, 853, 1280);
    this.addDrawing("back", backSprite);
    this.setDrawing("back");
  }
}

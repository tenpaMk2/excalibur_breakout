import { ImageSource, Loader } from "excalibur";

const Resources = {
  front: new ImageSource("./assets/MtU_yukari_ver4_0000.png"),
  back: new ImageSource("./assets/MtU_yukari_ver4_0003.png"),
};

const loader = new Loader();

for (const res in Resources) {
  loader.addResource((Resources as any)[res]);
}

// loader.suppressPlayButton = true;

export { Resources, loader };

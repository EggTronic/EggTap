import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';
import 'gsap';

const a1 = ({ app, group, colors, currentColorIndex }: AnimationProps) => {
  const shape = new PIXI.Graphics()
    .beginFill(colors[currentColorIndex])
    .drawRegularPolygon(0, 0, 11, Math.random() * 10 + 3, 2);
  shape.x = app.screen.width / 2;
  shape.y = app.screen.height / 2;
  shape.parentGroup = group;

  TweenLite.to(shape, 0.5, {
    width: shape.width * 20,
    height: shape.height * 20,
    rotation: (Math.random() - 0.5) * 2 * Math.PI,
    onComplete: () => {
      app.stage.removeChild(shape);
    }
  });

  app.stage.addChild(shape);
};


const a2 = ({ app, group, colors, currentColorIndex }: AnimationProps) => {
  let nums = 20;
  while (nums--) {
    const shape = new PIXI.Graphics()
      .beginFill(colors[currentColorIndex])
      .drawRegularPolygon(0, 0, 1, 4, Math.random() * 360);
    shape.x = app.screen.width / 2;
    shape.y = app.screen.height / 2;
    shape.parentGroup = group;

    TweenLite.to(shape, 0.5, {
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
      width: shape.width * 20,
      height: shape.height * 20,
      rotation: Math.random() * 2 * Math.PI,
      onComplete: () => {
        app.stage.removeChild(shape);
      }
    });

    app.stage.addChild(shape);
  }
};

const EggTapAnimations = [a1, a2];

export default EggTapAnimations;
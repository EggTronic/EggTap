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
  let nums = 10;
  while (nums--) {
    const shape = new PIXI.Graphics()
      .beginFill(colors[currentColorIndex])
      .drawRegularPolygon(0, 0, 1, 4, Math.random() * 360);
    shape.x = app.screen.width / 2;
    shape.y = app.screen.height / 2;
    shape.parentGroup = group;

    const tl = new TimelineLite();

    tl.to(shape, 0.5, {
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
      width: shape.width * 20,
      height: shape.height * 20,
      rotation: (2 - Math.random() * 4) * Math.PI,
    });

    tl.to(shape, 1, {
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
      width: 0,
      height: 0,
      rotation: (5 - Math.random() * 10) * Math.PI,
      onComplete: () => {
        app.stage.removeChild(shape);
      }
    });

    app.stage.addChild(shape);
  }
};

const a3 = ({ app, group, colors, currentColorIndex }: AnimationProps) => {
  const shape = new PIXI.Graphics()
    .lineStyle(0.5, colors[currentColorIndex])
    .drawRegularPolygon(0, 0, 11, Math.random() * 10 + 3, 2);
  shape.x = app.screen.width / 2;
  shape.y = app.screen.height / 2;
  shape.parentGroup = group;

  const tl = new TimelineLite();

  tl.to(shape, 0.5, {
    width: shape.width * 50,
    height: shape.height * 50,
    rotation: (Math.random() - 0.5) * 2 * Math.PI,
  });
  tl.to(shape, 1, {
    width: 0,
    height: 0,
    onComplete: () => {
      app.stage.removeChild(shape);
    }
  });

  app.stage.addChild(shape);
};

const a4 = ({ app, group, colors, currentColorIndex }: AnimationProps) => {
  let nums = 10;
  while (nums--) {
    const shape = new PIXI.Graphics()
      .beginFill(colors[currentColorIndex])
      .drawCircle(0, 0, 0.5 + Math.random() * 0.5);
    shape.x = app.screen.width / 2;
    shape.y = app.screen.height / 2;
    shape.parentGroup = group;

    const tl = new TimelineLite();

    tl.to(shape, 0.5, {
      x: Math.random() * app.screen.width,
      y: Math.random() * app.screen.height,
      width: shape.width * 20,
      height: shape.height * 20,
    });
    tl.to(shape, 0.6, {
      width: 1.5,
      height: 1.5
    });
    tl.to(shape, 1, {
      width: 0,
      height: 0,
      onComplete: () => {
        app.stage.removeChild(shape);
      }
    });

    app.stage.addChild(shape);
  }
};

const a5 = ({ app, group, colors, currentColorIndex }: AnimationProps) => {
  let seed = Math.floor(Math.random() * 3) + 13;
  let nums = seed;
  let width = app.screen.width / 6;
  let height = 40;
  let angle = 2 * Math.PI;
  while (nums--) {
    const shape = new PIXI.Graphics()
      .beginFill(colors[currentColorIndex])
      .drawRect(-width / 2, - 2 * height + height * 2 * nums, 50, height)
    shape.x = app.screen.width / 2;
    shape.y = app.screen.height / 2;
    shape.parentGroup = group;

    const tl = new TimelineLite();

    tl.to(shape, 0.1 * (6 - nums), {
      width: width,
      height: height,
      rotation: nums / seed * angle + (Math.random() - 0.5) * 2 * Math.PI
    });
    tl.to(shape, 0.6, {
      width: 0,
      rotation: (Math.random() - 0.5) * 2 * Math.PI,
      onComplete: () => {
        app.stage.removeChild(shape);
      }
    });

    app.stage.addChild(shape);
  }
};

const EggTapAnimations = [a1, a2, a3, a4, a5];

export default EggTapAnimations;
/* eslint-disable */
import * as PIXI from 'pixi.js';
import 'pixi-layers';
import '@pixi/graphics-extras';
import 'pixi-sound';
import 'gsap';
import bgm from './assets/audios/warmspace_ins.mp3';
import { audioSlices } from './assets/index';

enum Layout {
  Portrait,
  Landscape
}

export default class EggTap {
  app: PIXI.Application | null;
  topGroup: PIXI.display.Group | null;
  midGroup: PIXI.display.Group | null;
  botGroup: PIXI.display.Group | null;
  topLayer: PIXI.display.Layer | null;
  midLayer: PIXI.display.Layer | null;
  botLayer: PIXI.display.Layer | null;
  animations: (({ ...AnimationProps }) => void)[];
  appWrapper: HTMLElement;
  tappers: PIXI.Graphics[];
  colors: number[];
  appBackground: PIXI.Graphics | undefined;
  currentColorIndex: number;
  currentBgColorIndex: number;
  audioSlices: AudioSlices;
  bgm: string;
  currentTarget: string;
  isPressed: boolean;
  layout: Layout;
  currentTime: number;
  offset: number;
  interval: number;
  bgmCtx: null | AudioContext;
  constructor(
    wrapper: string,
    colors: number[],
    animations: (({ ...AnimationProps }) => void)[],
    customAudiosSlices?: AudioSlices,
    customBgm?: string
  ) {
    this.appWrapper = document.getElementById(wrapper);
    this.colors = colors;
    this.animations = animations;
    this.audioSlices = customAudiosSlices ? customAudiosSlices : audioSlices;
    this.bgm = customBgm ? customBgm : bgm;
    this.app = null;
    this.topGroup = null;
    this.midGroup = null;
    this.botGroup = null;
    this.topLayer = null;
    this.midLayer = null;
    this.botLayer = null;
    this.tappers = [];
    this.appBackground = undefined;
    this.currentColorIndex = 0;
    this.currentBgColorIndex = 0;
    this.currentTarget = '';
    this.isPressed = false;
    this.layout = Layout.Landscape;
    this.currentTime = 0;
    this.offset = -0.56;
    this.interval = 0.125 / 2;
    this.bgmCtx = null;
    this._init();
  }

  async _init() {
    this._initApp();
    this._initView();
    this._initAutoResize();
    this._initAudios();
    this._initBackground();
  }

  _initApp() {
    this.app = new PIXI.Application({
      autoDensity: true,
      resolution: devicePixelRatio
    });

    // event
    this.appWrapper.addEventListener('mousedown', () => {
      this.isPressed = true;
    })
    this.appWrapper.addEventListener('mouseup', () => {
      this.isPressed = false;
    })

    this.appWrapper.addEventListener('touchstart', () => {
      this.isPressed = true;
    })
    this.appWrapper.addEventListener('touchend', () => {
      this.isPressed = false;
    })
  }

  _initView() {
    if (!this.app) throw new Error('fail to get app instance');

    this.appWrapper.appendChild(this.app.view);

    this.app.stage = new PIXI.display.Stage();
    this.app.stage.sortableChildren = true;

    this.topGroup = new PIXI.display.Group(2, false);
    this.midGroup = new PIXI.display.Group(1, false);
    this.botGroup = new PIXI.display.Group(-1, false);

    this.topLayer = new PIXI.display.Layer(this.topGroup);
    this.midLayer = new PIXI.display.Layer(this.midGroup);
    this.botLayer = new PIXI.display.Layer(this.botGroup);

    this.app.stage.addChild(this.topLayer);
    this.app.stage.addChild(this.midLayer);
    this.app.stage.addChild(this.botLayer);
  }

  _initBackground() {
    if (!this.app) throw new Error('fail to get app instance');
    
    // reset
    if (this.appBackground) {
      this.app.stage.removeChild(this.appBackground);
    }

    this.appBackground = new PIXI.Graphics()
      .beginFill(this.colors[this.currentBgColorIndex], 1)
      .drawRegularPolygon(0, 0, 2 * Math.max(this.app.screen.width, this.app.screen.height), 4, 0);
    
    // seems there is no displayGroup specified
    (this.appBackground as any).displayGroup = this.botGroup;
    this.app.stage.addChild(this.appBackground)
  }

  _initAutoResize() {
    // Resize function window
    const resize = () => {
      // Get the p
      if (!this.app) throw new Error('fail to get app instance');

      if (!parent) throw new Error('fail to get parent node');
      // Resize the renderer
      this.app.renderer.resize(
        this.appWrapper.clientWidth,
        this.appWrapper.clientHeight
      );

      this.app.renderer.view.style.width = this.appWrapper.clientWidth + 'px';
      this.app.renderer.view.style.height = this.appWrapper.clientHeight + 'px';

      // You can use the 'screen' property as the renderer visible
      // area, this is more useful than view.width/height because
      // it handles resolution
      // for (let t of this.tappers) {
      //   t.position.set(parent.width, parent.height);
      // } 

      if (this.appWrapper.clientWidth < this.appWrapper.clientHeight) {
        this.layout = Layout.Portrait;
      } else {
        this.layout = Layout.Landscape;
      }

      if (this.bgmCtx) {
        this._initBackground();
        for (let tapper of this.tappers) {
          this.app.stage.removeChild(tapper);
        }
        this.tappers = [];
        this._initTaps();
      }
    }

    // Listen for window resize events
    window.addEventListener('resize', resize);

    resize();
  }

  _initTaps() {
    // reset
    for (let tapper of this.tappers) {
      tapper.off('pointerover');
      tapper.off('pointerdown');
    }
    this.tappers = [];

    // check layout
    let row = 4, col = 8;
    if (this.layout === Layout.Portrait) {
      row = 8;
      col = 4;
    }
    
    // tapper size
    const width = this.appWrapper.clientWidth / col;
    const height = this.appWrapper.clientHeight / row;

    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        const tapper = new PIXI.Graphics()
          .beginFill(0xffffff, 1)
          .drawRect(width * c, height * r, width, height);
        TweenLite.to(tapper, 0, { alpha: 0 });
        tapper.parentGroup = this.topGroup as PIXI.display.Group;
        tapper.interactive = true;
        tapper.buttonMode = true;
        tapper.hitArea = new PIXI.Rectangle(width * c, height * r, width, height);

        const draw = (isClick: boolean, e: any) => {
          e.stopPropagation();

          if (!this.isPressed && !isClick) return;

          const target = 'k' + (r * col + c + 1);
          if (this.currentTarget === target && !isClick) return;
          this.currentTarget = target;

          // click flash animation
          TweenLite.to(tapper, .05, { alpha: 1 });
          TweenLite.to(tapper, .6, { delay: 0.05, alpha: 0 });

          // throttle
          if (!this._throttle()) return;

          // fire sound
          this._dispatchSound(target);

          // draw background
          this._drawBackground();

          // fire animation
          this.currentColorIndex++;
          if (this.currentColorIndex > this.colors.length - 1) this.currentColorIndex = this.currentColorIndex % this.colors.length;
          this.animations[(r + c) % 2]({
            app: this.app,
            group: this.midGroup,
            colors: this.colors,
            currentColorIndex: this.currentColorIndex
          });

        };

        tapper.on('pointerover', (e: any) => draw(false, e));
        tapper.on('pointerdown', (e: any) => draw(true, e));

        // need something like touchmove && touchover, or fallback to dom events
        // tapper.on('touchstart', (e) => draw(false, e));

        // Add it to the stage
        this.tappers.push(tapper);
        (this.app as PIXI.Application).stage.addChild(tapper);
      }
    }
  }

  _throttle() {
    // throttle
    let timeSnapshot = (this.bgmCtx as AudioContext).currentTime + this.offset;

    if ((timeSnapshot - this.currentTime) < this.interval) return false;

    this.currentTime = timeSnapshot + this.interval;
    return true;
    // // get current time
    // let time = (this.bgmCtx.currentTime + this.offset).toFixed(3);

    // // calculate currenTtime to match interval
    // let sec = Math.floor(time);
    // let msec = time - sec;

    // if (msec === 0) {
    //   this.currentTime = sec;
    //   return true;
    // }

    // for (let i = 1; i <= 1 / this.interval; i++) {
    //   if (Math.abs(msec - i * this.interval) < this.interval / 2) {
    //     // this.currentTime = sec + i * this.interval;
    //     this.currentTime = time;
    //     return true;
    //   }
    // }
  }

  _dispatchSound(target: string) {
    // playsound
    PIXI.Loader.shared.resources[target].sound.play();
  }

  _drawBackground() {
    let seed = Math.floor(Math.random() * this.colors.length);

    if (seed !== Math.floor(Math.random() * this.colors.length)) return;
    const heading = Math.random();
    const radius = Math.max(
      this.appWrapper.clientWidth,
      this.appWrapper.clientHeight
    );
    const sides = 4;
    const rotate = Math.random() * 360;
    const x = heading >= 0.5 ? -2 * radius : 3 * radius;
    const y = heading >= 0.5 ? -2 * radius : 3 * radius;

    const bg = new PIXI.Graphics()
      .beginFill(this.colors[seed], 1)
      .drawRegularPolygon(x, y, radius * 2, sides, rotate);

    bg.parentGroup = this.midGroup as PIXI.display.Group;

    TweenLite.to(bg, 1, {
      duration: 1,
      x: heading >= 0.5 ? 2 * radius : -2 * radius,
      y: heading >= 0.5 ? 2 * radius : -2 * radius,
      onComplete: () => {
        if (!this.app) return;
        (this.appBackground as PIXI.Graphics)
          .beginFill(this.colors[seed], 1)
          .drawRegularPolygon(
            0,
            0,
            2 * Math.max(this.app.screen.width, this.app.screen.height),
            4,
            0
          )
        this.app.stage.removeChild(bg);
      }
    });

    (this.app as PIXI.Application).stage.addChild(bg);
  }

  async _initAudios() {
    PIXI.Loader.shared.add('bgm', this.bgm);
    for (let name in this.audioSlices) {
      PIXI.Loader.shared.add(name, (this.audioSlices as AudioSlices)[name]);
    }

    PIXI.Loader.shared.load((loader, resources) => {
      if (!resources.bgm) throw new Error('fail to load resources');
      resources.bgm.sound.loop = true;
      resources.bgm.sound.volume = 0.7;

      resources.bgm.sound.play();
      this.bgmCtx = resources.bgm.sound.context.audioContext;
      this._initTaps();
    });
  }

  destory() {
    if (!this.app) return;
    PIXI.Loader.shared.reset();
    for (let child of this.app.stage.children) {
      child.off('pointerover');
      child.off('pointerdown');
    }

    // remove all listeners of parent
    let newWrapper = this.appWrapper.cloneNode(true);
    this.appWrapper.parentNode.replaceChild(newWrapper, this.appWrapper);
  }
}
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('pixi.js'), require('pixi-layers'), require('@pixi/graphics-extras'), require('pixi-sound'), require('gsap')) :
    typeof define === 'function' && define.amd ? define(['exports', 'pixi.js', 'pixi-layers', '@pixi/graphics-extras', 'pixi-sound', 'gsap'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EggTap = {}, global.PIXI));
}(this, (function (exports, PIXI) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var bgm = "72eb1fb86aa8487f.mp3";

    var k1 = "9fbdb59ab046d06c.wav";

    var k2 = "dce02ae74a1a83bb.wav";

    var k3 = "4bfd3ebfe111fc4d.wav";

    var k4 = "1ae82c9c1b8fac2d.wav";

    var k5 = "5ce72a93f230b054.wav";

    var k6 = "eb19e8d56be76e37.wav";

    var k7 = "e4e8ea87156864bf.wav";

    var k8 = "ed004a7d12480bef.wav";

    var k9 = "7d1db895e81d4355.wav";

    var k10 = "53c4b602fd4e11fb.wav";

    var k11 = "4a6181b4925b9de2.wav";

    var k12 = "4e5bb0f80f483180.wav";

    var k13 = "8437a1ee7cecf438.wav";

    var k14 = "cb2b30ae1acf1275.wav";

    var k15 = "b406e9fa1f17b053.wav";

    var k16 = "5fceaab24ad48509.wav";

    var k17 = "2cb090f3a656c8a0.wav";

    var k18 = "0a0b1e71f228d93f.wav";

    var k19 = "58981a0da6f4c704.wav";

    var audioSlices = {
        'k1': k1,
        'k2': k2,
        'k3': k3,
        'k4': k4,
        'k5': k5,
        'k6': k6,
        'k7': k7,
        'k8': k8,
        'k9': k9,
        'k10': k10,
        'k11': k11,
        'k12': k12,
        'k13': k13,
        'k14': k14,
        'k15': k15,
        'k16': k16,
        'k17': k17,
        'k18': k18,
        'k19': k19,
        'k20': k13,
        'k21': k11,
        'k22': k12,
        'k23': k1,
        'k24': k2,
        'k25': k3,
        'k26': k4,
        'k27': k5,
        'k28': k6,
        'k29': k7,
        'k30': k8,
        'k31': k9,
        'k32': k10
    };

    var EggTap = /** @class */ (function () {
        function EggTap(wrapper, colors, animations, customAudiosSlices, customBgm) {
            this.appWrapper = wrapper;
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
            this.layout = 'horizontal'; // or vertical
            this.currentTime = 0;
            this.offset = -0.56;
            this.interval = 0.125 / 2;
            this.bgmCtx = null;
            this._init();
        }
        EggTap.prototype._init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this._initApp();
                    this._initView();
                    this._initAutoResize();
                    this._initAudios();
                    this._initBackground();
                    return [2 /*return*/];
                });
            });
        };
        EggTap.prototype._initApp = function () {
            var _this = this;
            this.app = new PIXI.Application({
                autoDensity: true,
                resolution: devicePixelRatio
            });
            // event
            this.appWrapper.addEventListener('mousedown', function () {
                _this.isPressed = true;
            });
            this.appWrapper.addEventListener('mouseup', function () {
                _this.isPressed = false;
            });
            this.appWrapper.addEventListener('touchstart', function () {
                _this.isPressed = true;
            });
            this.appWrapper.addEventListener('touchend', function () {
                _this.isPressed = false;
            });
        };
        EggTap.prototype._initView = function () {
            if (!this.app)
                throw new Error('fail to get app instance');
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
        };
        EggTap.prototype._initBackground = function () {
            if (!this.app)
                throw new Error('fail to get app instance');
            this.appBackground = new PIXI.Graphics()
                .beginFill(this.colors[0], 1)
                .drawRegularPolygon(0, 0, 2 * Math.max(this.app.screen.width, this.app.screen.height), 4, 0);
            // seems there is no displayGroup specified
            this.appBackground.displayGroup = this.botGroup;
            this.app.stage.addChild(this.appBackground);
        };
        EggTap.prototype._initAutoResize = function () {
            var _this = this;
            // Resize function window
            var resize = function () {
                // Get the p
                if (!_this.app)
                    throw new Error('fail to get app instance');
                if (!parent)
                    throw new Error('fail to get parent node');
                // Resize the renderer
                _this.app.renderer.resize(_this.appWrapper.clientWidth, _this.appWrapper.clientHeight);
                // You can use the 'screen' property as the renderer visible
                // area, this is more useful than view.width/height because
                // it handles resolution
                // for (let t of this.tappers) {
                //   t.position.set(parent.width, parent.height);
                // } 
                if (_this.app.screen.width < _this.app.screen.height) {
                    _this.layout = 'vertical';
                }
            };
            // Listen for window resize events
            window.addEventListener('resize', resize);
            resize();
        };
        EggTap.prototype._initTaps = function () {
            var _this = this;
            var row = 4, col = 8;
            if (this.layout === 'vertical') {
                row = 8;
                col = 4;
            }
            var width = this.appWrapper.clientWidth / col;
            var height = this.appWrapper.clientHeight / row;
            var _loop_1 = function (r) {
                var _loop_2 = function (c) {
                    var tapper = new PIXI.Graphics()
                        .beginFill(0xffffff, 1)
                        .drawRect(width * c, height * r, width, height);
                    TweenLite.to(tapper, 0, { alpha: 0 });
                    tapper.parentGroup = this_1.topGroup;
                    tapper.interactive = true;
                    tapper.buttonMode = true;
                    tapper.hitArea = new PIXI.Rectangle(width * c, height * r, width, height);
                    var draw = function (isClick, e) {
                        e.stopPropagation();
                        if (!_this.isPressed && !isClick)
                            return;
                        var target = 'k' + (r * col + c + 1);
                        if (_this.currentTarget === target && !isClick)
                            return;
                        _this.currentTarget = target;
                        // click flash animation
                        TweenLite.to(tapper, .05, { alpha: 1 });
                        TweenLite.to(tapper, .6, { delay: 0.05, alpha: 0 });
                        // throttle
                        if (!_this._throttle())
                            return;
                        // fire sound
                        _this._dispatchSound(target);
                        // draw background
                        _this._drawBackground();
                        // fire animation
                        _this.currentColorIndex++;
                        if (_this.currentColorIndex > _this.colors.length - 1)
                            _this.currentColorIndex = _this.currentColorIndex % _this.colors.length;
                        _this.animations[(r + c) % 2]({
                            app: _this.app,
                            group: _this.midGroup,
                            colors: _this.colors,
                            currentColorIndex: _this.currentColorIndex
                        });
                    };
                    tapper.on('pointerover', function (e) { return draw(false, e); });
                    tapper.on('pointerdown', function (e) { return draw(true, e); });
                    // need something like touchmove && touchover, or fallback to dom events
                    // tapper.on('touchstart', (e) => draw(false, e));
                    // Add it to the stage
                    this_1.tappers.push(tapper);
                    this_1.app.stage.addChild(tapper);
                };
                for (var c = 0; c < col; c++) {
                    _loop_2(c);
                }
            };
            var this_1 = this;
            for (var r = 0; r < row; r++) {
                _loop_1(r);
            }
        };
        EggTap.prototype._throttle = function () {
            // throttle
            var timeSnapshot = this.bgmCtx.currentTime + this.offset;
            if ((timeSnapshot - this.currentTime) < this.interval)
                return false;
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
        };
        EggTap.prototype._dispatchSound = function (target) {
            // playsound
            PIXI.Loader.shared.resources[target].sound.play();
        };
        EggTap.prototype._drawBackground = function () {
            var _this = this;
            var seed = Math.floor(Math.random() * this.colors.length);
            if (seed !== Math.floor(Math.random() * this.colors.length))
                return;
            var heading = Math.random();
            var radius = this.app.screen.width;
            var sides = 4;
            var rotate = Math.random() * 360;
            var x = heading >= 0.5 ? -2 * radius : 3 * radius;
            var y = heading >= 0.5 ? -2 * radius : 3 * radius;
            var bg = new PIXI.Graphics()
                .beginFill(this.colors[seed], 1)
                .drawRegularPolygon(x, y, radius * 2, sides, rotate);
            bg.parentGroup = this.midGroup;
            TweenLite.to(bg, 1, {
                duration: 1,
                x: heading >= 0.5 ? 2 * radius : -2 * radius,
                y: heading >= 0.5 ? 2 * radius : -2 * radius,
                onComplete: function () {
                    if (!_this.app)
                        return;
                    _this.appBackground
                        .beginFill(_this.colors[seed], 1)
                        .drawRegularPolygon(0, 0, 2 * Math.max(_this.app.screen.width, _this.app.screen.height), 4, 0);
                    _this.app.stage.removeChild(bg);
                }
            });
            this.app.stage.addChild(bg);
        };
        EggTap.prototype._initAudios = function () {
            return __awaiter(this, void 0, void 0, function () {
                var name_1;
                var _this = this;
                return __generator(this, function (_a) {
                    PIXI.Loader.shared.add('bgm', this.bgm);
                    for (name_1 in this.audioSlices) {
                        PIXI.Loader.shared.add(name_1, this.audioSlices[name_1]);
                    }
                    PIXI.Loader.shared.load(function (loader, resources) {
                        if (!resources.bgm)
                            throw new Error('fail to load resources');
                        resources.bgm.sound.loop = true;
                        resources.bgm.sound.volume = 0.5;
                        resources.bgm.sound.play();
                        _this.bgmCtx = resources.bgm.sound.context.audioContext;
                        _this._initTaps();
                    });
                    return [2 /*return*/];
                });
            });
        };
        EggTap.prototype.destory = function () {
            if (!this.app)
                return;
            PIXI.Loader.shared.reset();
            for (var _i = 0, _a = this.app.stage.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.off('pointerover');
                child.off('pointerdown');
                // child.off('pointerenter');
                // child.off('touchmove');
                // child.off('touchend');
                // child.off('touchstart');
            }
            // this.appWrapper.removeEventListener('mouseup');
            // this.appWrapper.removeEventListener('mousedown');
        };
        return EggTap;
    }());

    var a1 = function (_a) {
        var app = _a.app, group = _a.group, colors = _a.colors, currentColorIndex = _a.currentColorIndex;
        var shape = new PIXI.Graphics()
            .beginFill(colors[currentColorIndex])
            .drawRegularPolygon(0, 0, 11, Math.random() * 10 + 3, 2);
        shape.x = app.screen.width / 2;
        shape.y = app.screen.height / 2;
        shape.parentGroup = group;
        TweenLite.to(shape, 0.5, {
            width: shape.width * 20,
            height: shape.height * 20,
            rotation: (Math.random() - 0.5) * 2 * Math.PI,
            onComplete: function () {
                app.stage.removeChild(shape);
            }
        });
        app.stage.addChild(shape);
    };
    var a2 = function (_a) {
        var app = _a.app, group = _a.group, colors = _a.colors, currentColorIndex = _a.currentColorIndex;
        var nums = 20;
        var _loop_1 = function () {
            var shape = new PIXI.Graphics()
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
                onComplete: function () {
                    app.stage.removeChild(shape);
                }
            });
            app.stage.addChild(shape);
        };
        while (nums--) {
            _loop_1();
        }
    };
    var EggTapAnimations = [a1, a2];

    var colors = [
        0x88CCCC,
        0xFC3E77,
        0xD49E9E,
        0xCCEEEE,
        0x594F57,
        0x888899,
        0xEC5685,
        0x8AD9EC,
        0x109FB1
    ];

    var EggTapAudioSlices = audioSlices;
    var EggTapColors = colors;
    var EggTapAnimations$1 = EggTapAnimations;
    var EggTapApp = EggTap;

    exports.EggTapAnimations = EggTapAnimations$1;
    exports.EggTapApp = EggTapApp;
    exports.EggTapAudioSlices = EggTapAudioSlices;
    exports.EggTapColors = EggTapColors;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map

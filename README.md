## 🧡 My recreation of mikutap ~ WarmaTap! 🧡 [Demo](https://eggtronic.github.io/EggTap/)
![Warma](./doc/warma.jpg)

---
#### 🔨 Development
```
1. Fork and clone this repo to your local
2. npm install // dependencies
3. npm run build // build
4. npm run dev // live server with change detection (template.html is not watched)
```

#### 🧡 Usage
```html
<!-- You will have to build index.js first -->
<!-- import build/index.js -->
<script src="index.js"></script>

<!-- You will have to add following scripts in your header -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.3.3/pixi.min.js"
  integrity="sha512-J7UHpLx39bpqtP+aWP6yIuXroFk0XPkDQaS9zDthM4TVeaXstWYh556gxsXwwIwpAPSoKqVHW+eqz3B93SpyKg=="
  crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/pixi-layers@0.3.1/dist/pixi-layers.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@pixi/graphics-extras@5.3.3/dist/graphics-extras.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi-sound@3.0.5/dist/pixi-sound.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js"
  integrity="sha512-IQLehpLoVS4fNzl7IfH8Iowfm5+RiMGtHykgZJl9AWMgqx0AmJ6cRWcB+GaGVtIsnC4voMfm8f2vwtY+6oPjpQ=="
  crossorigin="anonymous">
</script>

<!-- Create instance once onload -->
<div id="container"> </div>
<script>
  window.addEventListener('load', (event) => {
    new EggTap.EggTapApp(
      "container", // id of the container element
      EggTap.EggTapColors, // you can replace it with your own colors
      EggTap.EggTapAnimations, // you can replace it with your own animations
      // customBgm?: string, // your own bgm's src|link
      // offset?: number, // audio start position offset - adjust it so that your click can match bpm
      // interval?: number, // interval between each tap - you can set it as 1000 * 60/BPM , it means each interval is the length of each 1/4 beat
    );
  });
</script>

```

#### 🙈 todo
- [ ] Add more animations
- [ ] Audio quality improve (length & audio)
- [x] loading display
- [x] auto adjust on window resizing
- [x] live server plugin for development
- [x] Figure out how to match throttle with bpm
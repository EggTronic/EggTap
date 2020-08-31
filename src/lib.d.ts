declare module '*.wav';
declare module '*.mp3';

declare type AudioSlices = {
  'k1': string,
  'k2': string,
  'k3': string,
  'k4': string,
  'k5': string,
  'k6': string,
  'k7': string,
  'k8': string,
  'k9': string,
  'k10': string,
  'k11': string,
  'k12': string,
  'k13': string,
  'k14': string,
  'k15': string,
  'k16': string,
  'k17': string,
  'k18': string,
  'k19': string,
  'k20': string,
  'k21': string,
  'k22': string,
  'k23': string,
  'k24': string,
  'k25': string,
  'k26': string,
  'k27': string,
  'k28': string,
  'k29': string,
  'k30': string,
  'k31': string,
  'k32': string
};

declare interface AnimationProps {
  app: PIXI.Application;
  group: PIXI.display.Group;
  colors: number[];
  currentColorIndex: number;
}
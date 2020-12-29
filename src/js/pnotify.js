import {
  error,
  success,
  info,
  defaults,
  defaultModules,
  Stack,
} from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';

const myStack = new Stack({
  dir1: 'up',
  dir2: 'left',
  firstpos1: 100,
  firstpos2: 50,
  maxStrategy: 'close',
  //   positioned: false,
});
defaults.mode = 'light';
defaults.delay = 2000;
defaults.stack = myStack;
defaultModules.set(PNotifyMobile, {});

export { error, success, info };

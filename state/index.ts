import { atom } from 'recoil';

const headerState = atom({
  key: 'header',
  default: 0,
});

const headerColorState = atom({
  key: 'headerColor',
  default: '#fff',
});

export { headerState, headerColorState };

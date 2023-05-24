import { atom } from 'recoil';

export const musicState = atom({
  key: 'musicState',
  default: {
    thumNailImag: '',
    youtubeLink: '',
    playStatus: false,
  },
});


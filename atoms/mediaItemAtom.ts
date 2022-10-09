import { atom } from 'recoil';
import { MediaItem } from '../typings';

export const mediaItemState = atom<MediaItem | null>({
  key: 'mediaItemState',
  default: null,
});

export const mediaGenreItemsState = atom<MediaItem[] | null>({
  key: 'mediaGenreItemsState',
  default: null,
});

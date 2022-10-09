import { atom } from 'recoil';
import { Genre } from '../typings';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const movieModalState = atom({
  key: 'movieModalState',
  default: false,
});

export const movieModalDataState = atom<string | null>({
  key: 'movieModalDataState',
  default: null,
});

export const genreState = atom<Genre | null>({
  key: 'genreState',
  default: null,
});

export const mutedState = atom<boolean>({
  key: 'mutedState',
  default: false,
});

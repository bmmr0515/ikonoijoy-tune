import { singles_01_06 } from './singles-01-06';
import { singles_07_13 } from './singles-07-13';
import { singles_14_latest } from './singles-14-latest';
import { album } from './album';
import { solo_and_unit } from './solo-and-unit';
import { digital } from './digital';
import { review_needed } from './review-needed';
import { Song } from '../types';

export const equalLoveSongs: Song[] = [
  ...singles_01_06,
  ...singles_07_13,
  ...singles_14_latest,
  ...album,
  ...solo_and_unit,
  ...digital,
  ...review_needed
];

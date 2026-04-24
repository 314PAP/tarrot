import { fifteenCardSpread } from './fifteenCard';
import { firstOperationSpread } from './operations';
import { singleCardSpread, threeCardSpread } from './basicSpreads';
import type { Spread } from './types';

export const availableSpreads: Spread[] = [
  singleCardSpread,
  threeCardSpread,
  fifteenCardSpread,
  firstOperationSpread,
];

export * from './types';
export * from './fifteenCard';
export * from './operations';
export * from './basicSpreads';

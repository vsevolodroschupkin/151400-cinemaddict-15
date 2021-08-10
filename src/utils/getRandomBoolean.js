import { getRandomInteger } from './getRandomInteger.js';

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

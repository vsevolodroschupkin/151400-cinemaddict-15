import { getRandomInteger } from './getRandomInteger.js';

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

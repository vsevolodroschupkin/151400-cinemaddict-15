import { getRandomInteger } from './getRandomInteger.js';

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// TODO: собрать функции для получения рандомных значений в random.js
// Потом когда моки удалятся, этот модуль тоже нужно будет удалить

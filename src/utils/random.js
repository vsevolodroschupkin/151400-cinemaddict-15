export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFloat = (min, max, digits) => {
  if (max === min) {
    return 'Начало и конец диапазона равны. Вызовите функцию с другими аргументами.';
  }
  if (max < 0 || min < 0) {
    return 'Диапазон может быть только положительным';
  }
  if (min > max) {
    const count = max;
    max = min;
    min = count;
  }
  // eslint-disable-next-line prefer-template
  const number = Math.min(min + (Math.random() * (max - min + parseFloat('1e-' + ((Math.random() + '').length - 1)))), max);
  return parseFloat(number.toFixed(digits));
};

export const getRandomBoolean = () => Boolean(getRandomInteger(0, 1));

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// TODO: не уверенна пройдет ли по критериям eslint-disable
// но моки удалятся, и модуль random.js тоже скорее всего можно будет удалить
// а вообще можно для генерации рейтинга сгенерить число от 20 до 100 например и результат поделить на 10

import { MAX_DESCRIPTION_LENGTH } from '../const.js';

export const getFormattedDescription = (description) => description.length <= MAX_DESCRIPTION_LENGTH ? description : `${description.slice(0, MAX_DESCRIPTION_LENGTH - 1)  }...`;

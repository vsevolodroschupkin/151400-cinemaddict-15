const ENTER_KEYCODE = 13;

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
export const isCrtlEnterEvent = (evt) => evt.keyCode === ENTER_KEYCODE && (evt.metaKey || evt.ctrlKey);

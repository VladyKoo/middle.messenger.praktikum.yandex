import styles from './button.module.scss';
import tml from './button.hbs';

const defaultCtx = {
  type: 'button',
  disabled: false,
  styles,
};

export default (ctx = {}) => {
  return tml({ ...defaultCtx, ...ctx });
};

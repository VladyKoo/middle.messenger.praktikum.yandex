import styles from './link.module.scss';
import tml from './link.hbs';

const defaultCtx = {
  target: '_self',
  styles,
};

export default (ctx = {}) => {
  return tml({ ...defaultCtx, ...ctx });
};

import styles from './form.module.scss';
import tml from './form.hbs';

const defaultCtx = {
  styles,
};

export default (ctx = {}) => {
  return tml({ ...defaultCtx, ...ctx });
};

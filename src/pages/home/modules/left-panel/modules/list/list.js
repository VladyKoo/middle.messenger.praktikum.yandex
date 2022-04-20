import styles from './list.module.scss';
import tml from './list.hbs';

const defaultCtx = {
  styles,
};

export default function (ctx = {}) {
  return tml({ ...defaultCtx, ...ctx });
}

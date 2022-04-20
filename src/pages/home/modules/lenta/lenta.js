import styles from './lenta.module.scss';
import tml from './lenta.hbs';

const defaultCtx = {
  styles,
};

export default function (ctx = {}) {
  return tml({ ...defaultCtx, ...ctx });
}

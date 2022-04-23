import styles from './lenta.module.scss';
import tml from './lenta.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

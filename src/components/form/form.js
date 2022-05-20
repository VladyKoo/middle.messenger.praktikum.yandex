import styles from './form.module.scss';
import tml from './form.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

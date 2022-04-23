import styles from './link.module.scss';
import tml from './link.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    target: '_self',
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

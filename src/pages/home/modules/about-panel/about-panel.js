import styles from './about-panel.module.scss';
import tml from './about-panel.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

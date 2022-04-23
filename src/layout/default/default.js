import styles from './default.module.scss';
import tml from './default.hbs';

export default function (outlet) {
  const basetCtx = {
    styles,
  };
  return tml({ ...basetCtx, outlet });
}

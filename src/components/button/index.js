import styles from './button.module.scss';
import tml from './button.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    type: 'button',
    disabled: false,
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
};

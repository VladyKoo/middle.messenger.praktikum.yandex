import styles from './avatar.module.scss';
import tml from './avatar.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    alt: 'avatar',
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
};

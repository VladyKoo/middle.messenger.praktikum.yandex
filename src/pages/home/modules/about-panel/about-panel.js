import styles from './about-panel.module.scss';
import tml from './about-panel.hbs';

const defaultCtx = {
  styles,
};

export default function (ctx = {}) {
  return tml({ ...defaultCtx, ...ctx });
}

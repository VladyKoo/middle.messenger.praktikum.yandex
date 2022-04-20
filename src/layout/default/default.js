import styles from './default.module.scss';

import tml from './default.hbs';

const defaultCtx = {
  styles,
};

export default function (outlet) {
  return tml({ ...defaultCtx, outlet });
}

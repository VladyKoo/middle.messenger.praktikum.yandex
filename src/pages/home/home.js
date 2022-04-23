import styles from './home.module.scss';
import tml from './home.hbs';

import compileLeftPanel from './modules/left-panel';
import compileLenta from './modules/lenta';
import compileAboutPanele from './modules/about-panel';

export default function (ctx = {}, route) {
  const basetCtx = {
    lenta: compileLenta(),
    leftPanel: compileLeftPanel({}, route),
    aboutPanel: compileAboutPanele(),
    styles,
  };

  return tml({ ...basetCtx, ...ctx });
}

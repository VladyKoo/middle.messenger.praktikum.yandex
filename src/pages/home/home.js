import styles from './home.module.scss';

import compileLeftPanel from './modules/left-panel';
import compileLenta from './modules/lenta';
import compileAboutPanele from './modules/about-panel';
import tml from './home.hbs';

const defaultCtx = {
  lenta: compileLenta(),
  aboutPanel: compileAboutPanele(),
  styles,
};

export default function (ctx = {}, route) {
  let leftPanel = compileLeftPanel();
  if (route) leftPanel = compileLeftPanel({}, route);

  return tml({ ...defaultCtx, leftPanel, ...ctx });
}

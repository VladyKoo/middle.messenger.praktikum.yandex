import styles from './left-panel.module.scss';

import compileList from './modules/list';
import compileProfile from './modules/profile';
import compileSettings from './modules/settings';
import tml from './left-panel.hbs';

const defaultCtx = {
  styles,
};

export default function (ctx = {}, route) {
  const avatarUrl = new URL('../../../../assets/images/avatar.png', import.meta.url)
  let content = compileList({avatarUrl});
  if (route === '/profile') content = compileProfile({avatarUrl});
  if (route === '/settings') content = compileSettings();

  return tml({ ...defaultCtx, content, ...ctx });
}

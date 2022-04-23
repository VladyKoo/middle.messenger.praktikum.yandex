import styles from './left-panel.module.scss';
import tml from './left-panel.hbs';

import compileList from './modules/list';
import compileProfile from './modules/profile';
import compileSettings from './modules/settings';

export default function (ctx = {}, route) {
  const avatarUrl = new URL('../../../../assets/images/avatar.png', import.meta.url);
  let content = '';
  switch (route) {
    case '/profile':
      content = compileProfile({ avatarUrl });
      break;
    case '/settings':
      content = compileSettings();
      break;
    default:
      content = compileList({ avatarUrl });
      break;
  }

  const basetCtx = {
    content,
    styles,
  };

  return tml({ ...basetCtx, ...ctx });
}

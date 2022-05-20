import styles from './error.module.scss';
import tml from './error.hbs';

import compileLink from '../../components/link';

export default function (ctx = {}) {
  const code = ctx.code ?? 500;
  const basetCtx = {
    title: code === 404 ? `${code} Page Not Found` : `${code} Internal Server Error`,
    link: compileLink({
      name: 'Back to chat',
      href: '/',
    }),
    styles,
  };

  return tml({ ...basetCtx });
}

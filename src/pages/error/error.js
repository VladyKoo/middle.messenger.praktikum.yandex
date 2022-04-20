import styles from './error.module.scss';

import compileLink from '../../components/link';
import tml from './error.hbs';

const defaultCtx = {
  title: '',
  link: compileLink({
    name: 'Back to chat',
    href: '/',
  }),
  styles,
};

export default function (error) {
  const code = error.code ?? 500;
  let title = ''

  if (code === 404) title = `${code} Page Not Found`;
  else title = `${code} Internal Server Error`;

  return tml({ ...defaultCtx, title });
}
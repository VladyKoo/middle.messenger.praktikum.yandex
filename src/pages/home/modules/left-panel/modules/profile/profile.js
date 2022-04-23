import styles from './profile.module.scss';
import tml from './profile.hbs';

import compileAvatar from '../../../../../../components/avatar';
import compileArrowLeftIcon from '../../../../../../components/icons/arrow-left';
import compileEditIcon from '../../../../../../components/icons/edit';

export default function (ctx = {}) {
  const basetCtx = {
    icons: {
      arrowLeft: compileArrowLeftIcon(),
      edit: compileEditIcon(),
    },
    avatar: compileAvatar({ url: ctx?.avatarUrl }),
    fullname: 'Name Surname',
    phone: '+7 900 000 00 00',
    description: 'lorem ipsum',
    email: 'user@google.com',
    username: 'Username',
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

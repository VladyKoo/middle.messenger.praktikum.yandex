import styles from './list.module.scss';
import tml from './list.hbs';

import compileAvatar from '../../../../../../components/avatar';
import compileNewChatIcon from '../../../../../../components/icons/new-chat';
import compileMoreIcon from '../../../../../../components/icons/more';

export default function (ctx = {}) {
  const basetCtx = {
    icons: {
      newChat: compileNewChatIcon(),
      more: compileMoreIcon(),
    },
    avatar: compileAvatar({ url: ctx?.avatarUrl }),
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

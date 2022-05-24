import { Block } from '../../../../../../utils/Block';
import styles from './chats.module.scss';
import tmpl from './chats.hbs';

import { Avatar } from '../../../../../../components/avatar';
import { Search } from '../../../../../../components/search';
import { Icon } from '../../../../../../components/icon';
import { ChatItem } from './modules/chat-item';

function getFakeChatItems() {
  const avatarUrl = new URL('../../../../../../assets/images/avatar.png', import.meta.url);
  const items = [];

  function getRandomNum(end = 1, start = 0) {
    return Math.trunc(Math.random() * (end - start) + start);
  }

  for (let i = 0; i < 10; i += 1) {
    items.push(
      new ChatItem({
        avatarUrl,
        id: `${i}`,
        surname: 'Surname',
        name: 'Name',
        lastMessage: 'Message',
        time: '2020-01-02T14:22:22.000Z',
        counter: getRandomNum(200),
      }),
    );
  }
  return items;
}

export type ChatsProps = {
  styles?: Record<string, string>;
  avatarUrl: URL;
  chatItems?: ChatItem[];
  newChatIcon?: Icon;
  moreIcon?: Icon;
  avatar?: Avatar;
  search?: Search;
};

export class Chats extends Block<ChatsProps> {
  constructor(props: ChatsProps) {
    super({
      styles,
      newChatIcon: new Icon({ icon: 'new-chat' }),
      moreIcon: new Icon({ icon: 'more' }),
      avatar: new Avatar({ url: props.avatarUrl }),
      search: new Search({}),
      chatItems: getFakeChatItems(),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

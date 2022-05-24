import { Block } from '../../../../../../../../utils/Block';
import { getTime } from '../../../../../../../../utils';
import styles from './chat-item.module.scss';
import tmpl from './chat-item.hbs';

import { Avatar } from '../../../../../../../../components/avatar';

export type ChatItemProps = {
  styles?: Record<string, string>;
  avatarUrl: URL;
  id: string;
  surname: string;
  name: string;
  lastMessage?: string;
  time: string;
  counter?: number;
  avatar?: Avatar;
  messageTime?: string;
};

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super({
      styles,
      avatar: new Avatar({ url: props.avatarUrl }),
      messageTime: getTime(props.time),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

import { Block } from '../../utils/Block';
import { getTime } from '../../utils';
import { Avatar } from '../avatar';
import styles from './chat-item.module.scss';
import tmpl from './chat-item.hbs';

export type ChatItemProps = {
  styles?: Record<string, string>;
  avatar: string;
  id?: number;
  title?: string;
  lastMessage?: string;
  time?: string;
  counter?: number;
  avatarImg?: Avatar;
  messageTime?: string;
  handleClick?: () => void;
};

export class ChatItem extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(
      {
        styles,
        avatarImg: new Avatar({ url: props.avatar }),
        messageTime: getTime(props.time || ''),
        ...props,
      },
      'button',
    );
  }

  addEvents(): void | (() => void) {
    if (!this._element) {
      return;
    }

    const box = this._element;

    if (!box) {
      return;
    }

    const onClick = () => {
      if (this.props.handleClick) {
        this.props.handleClick();
      }
    };

    box.addEventListener('click', onClick);

    return () => {
      box.removeEventListener('click', onClick);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

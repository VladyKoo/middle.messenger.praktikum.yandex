import { Block } from '../../../../../../utils/Block';
import styles from './chat-input.module.scss';
import tmpl from './chat-input.hbs';

import { Icon } from '../../../../../../components/icon';

export type ChatInputProps = {
  styles?: Record<string, string>;
  placeholder?: string;
  smileIcon?: Icon;
  attachmentIcon?: Icon;
  deleteIcon?: Icon;
  sendIcon?: Icon;
};

export class ChatInput extends Block<ChatInputProps> {
  constructor(props: ChatInputProps = {}) {
    super({
      styles,
      placeholder: 'Write a message',
      smileIcon: new Icon({ icon: 'emoji-smile' }),
      attachmentIcon: new Icon({ icon: 'attachment' }),
      deleteIcon: new Icon({ icon: 'delete' }),
      sendIcon: new Icon({ icon: 'mic' }),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

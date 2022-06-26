import { Block } from '../../../../../../utils/Block';
import { getTime } from '../../../../../../utils';
import styles from './message-item.module.scss';
import tmpl from './message-item.hbs';

export type MessageItemProps = {
  styles?: Record<string, string>;
  type?: string;
  content?: string | URL;
  owner?: boolean;
  time?: string;
  date?: string;
  status?: '';
  typeStyle?: string;
  messageTime?: string;
};

export class MessageItem extends Block<MessageItemProps> {
  constructor(props: MessageItemProps) {
    super({
      styles,
      typeStyle: styles[props.type],
      messageTime: getTime(props.time || ''),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

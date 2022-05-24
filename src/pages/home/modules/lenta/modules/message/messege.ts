import { Block } from '../../../../../../utils/Block';
import styles from './message.module.scss';
import tmpl from './message.hbs';

export type MessageProps = {
  styles?: Record<string, string>;
  type?: 'text' | 'image' | 'video' | 'audio';
  value: string | URL;
  right?: boolean;
  time: string;
  date?: string;
  status?: '';
  typeStyle?: string;
  content?: string;
};

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    let content = '';
    if (props.type === 'text' && typeof props.value === 'string') {
      content = props.value;
    } else if (props.type === 'image') {
      content = `<img src="${props.value}" />`;
    }

    super({
      styles,
      typeStyle: styles[props.type],
      content,
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

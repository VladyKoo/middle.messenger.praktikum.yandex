import { Block } from '../../../../utils/Block';
import { Chats } from './modules/chats';
import { Profile } from './modules/profile';
import { Settings } from './modules/settings';
import styles from './left-panel.module.scss';
import tmpl from './left-panel.hbs';

export type LeftPanelProps = {
  styles?: Record<string, string>;
  route: string;
  content?: Block;
};

export class LeftPanel extends Block<LeftPanelProps> {
  constructor(props: LeftPanelProps) {
    let content: Block;
    switch (props.route) {
      case '/profile':
        content = new Profile();
        break;
      case '/settings':
        content = new Settings();
        break;
      default:
        content = new Chats();
        break;
    }

    super({ styles, content, ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

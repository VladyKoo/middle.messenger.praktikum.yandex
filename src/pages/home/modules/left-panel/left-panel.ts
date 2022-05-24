import { Block } from '../../../../utils/Block';
import styles from './left-panel.module.scss';
import tmpl from './left-panel.hbs';

import { Chats } from './modules/chats';
import { Profile } from './modules/profile';
import { Settings } from './modules/settings';

export type LeftPanelProps = {
  styles?: Record<string, string>;
  route: string;
  content?: Block;
};

export class LeftPanel extends Block<LeftPanelProps> {
  constructor(props: LeftPanelProps) {
    const avatarUrl = new URL('../../../../assets/images/avatar.png', import.meta.url);

    let content: Block;
    switch (props.route) {
      case '/profile':
        content = new Profile({ avatarUrl });
        break;
      case '/settings':
        content = new Settings({ avatarUrl });
        break;
      default:
        content = new Chats({ avatarUrl });
        break;
    }

    super({ styles, content, ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

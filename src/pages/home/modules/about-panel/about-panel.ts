import { Block } from '../../../../utils/Block';
import { AboutChat } from './modules/about-chat/about-chat';
import { AboutUser } from './modules/about-user/about-user';
import { State, store } from '../../../../store';
import { deepCompare } from '../../../../utils';
import styles from './about-panel.module.scss';
import tmpl from './about-panel.hbs';

function getContent(panel) {
  let content: Block | null = null;
  switch (panel) {
    case 'chat':
      content = new AboutChat();
      break;
    case 'user':
      content = new AboutUser();
      break;
    default:
      break;
  }
  return content;
}

function mapStateToProps(state: State) {
  let panel: string | null = null;

  if (state.chats.aboutChat !== null) {
    panel = 'chat';
  } else if (state.users.aboutUser !== null) {
    panel = 'user';
  }

  return {
    show: state.chats.aboutChat !== null || state.users.aboutUser !== null,
    panel,
  };
}

export type AboutPanelProps = {
  styles?: Record<string, string>;
  show?: boolean;
  panel?: string | null;
  content?: Block | null;
};

export class AboutPanel extends Block<AboutPanelProps> {
  constructor(props: AboutPanelProps = {}) {
    let state = mapStateToProps(store.state);
    const propsAndState = { ...props, ...state };

    super({
      styles,
      content: getContent(propsAndState.panel),
      ...propsAndState,
    });

    store.subscribe(() => {
      const newState = mapStateToProps(store.state);

      if (!deepCompare(state, newState)) {
        this.setProps({ ...newState });
      }

      state = newState;
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.panel !== newProps.panel) {
      this.props.content = getContent(this.props.panel);
    }
  }
}

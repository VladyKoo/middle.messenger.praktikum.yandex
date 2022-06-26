import { Block } from '../../../../../../utils/Block';
import { store, State } from '../../../../../../store';
import { deepCompare } from '../../../../../../utils';
import { ProfileInfo } from '../../../../../../components/profile-info';
import { Icon } from '../../../../../../components/icon';
import { RouterLink } from '../../../../../../components/router-link';
import styles from './profile.module.scss';
import tmpl from './profile.hbs';

function mapStateToProps(state: State) {
  const { user } = state.auth;
  return {
    first_name: user.first_name,
    second_name: user.second_name,
    display_name: user.display_name,
    login: user.login,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
  };
}

export type ProfileProps = {
  styles?: Record<string, string>;

  id?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;

  profileInfo?: ProfileInfo;
  editLink?: RouterLink;
  backLink?: RouterLink;
};

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps = {}) {
    let state = mapStateToProps(store.state);
    const propsAndState = { ...props, ...state };

    super({
      styles,
      backLink: new RouterLink({
        href: '/messenger',
        class: styles['top-back-btn'],
        content: new Icon({ icon: 'arrow-left' }),
      }),
      editLink: new RouterLink({
        href: '/settings',
        class: styles['top-edit-btn'],
        content: new Icon({ icon: 'edit' }),
      }),
      profileInfo: new ProfileInfo({
        avatar: propsAndState.avatar,
        first_name: propsAndState.first_name,
        second_name: propsAndState.second_name,
        display_name: propsAndState.display_name,
        login: propsAndState.login,
        phone: propsAndState.phone,
        email: propsAndState.email,
      }),
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
    return this.compile(tmpl, this.props);
  }

  componentDidUpdate() {
    const newState = mapStateToProps(store.state);
    this.children.profileInfo?.setProps({ ...newState });
  }
}

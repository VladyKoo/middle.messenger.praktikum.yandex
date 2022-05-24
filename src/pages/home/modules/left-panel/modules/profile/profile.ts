import { Block } from '../../../../../../utils/Block';
import styles from './profile.module.scss';
import tmpl from './profile.hbs';

import { ProfileInfo } from '../../../../../../components/profile-info';
import { Icon } from '../../../../../../components/icon';

export type ProfileProps = {
  styles?: Record<string, string>;
  avatarUrl: URL;
  arrowLeftIcon?: Icon;
  editIcon?: Icon;
  profileInfo?: ProfileInfo;
};

export class Profile extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super({
      styles,
      arrowLeftIcon: new Icon({ icon: 'arrow-left' }),
      editIcon: new Icon({ icon: 'edit' }),
      profileInfo: new ProfileInfo({
        avatarUrl: props.avatarUrl,
        fullname: 'Name Surname',
        phone: '+7 900 000 00 00',
        description: 'lorem ipsum',
        email: 'user@google.com',
        username: 'Username',
      }),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

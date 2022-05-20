import { Block } from '../../../../utils/Block';
import styles from './about-panel.module.scss';
import tmpl from './about-panel.hbs';

import { ProfileInfo } from '../../../../components/profile-info';
import { Icon } from '../../../../components/icon';

export type AboutPanelProps = {
  styles?: Record<string, string>;
  show: boolean;
  closeIcon?: Icon;
  profileInfo?: ProfileInfo;
};

export class AboutPanel extends Block<AboutPanelProps> {
  constructor(props: AboutPanelProps) {
    const avatarUrl = new URL('../../../../assets/images/avatar.png', import.meta.url);

    super({
      styles,
      closeIcon: new Icon({ icon: 'close' }),
      profileInfo: new ProfileInfo({
        avatarUrl,
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

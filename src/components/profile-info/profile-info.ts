import { Block } from '../../utils/Block';
import styles from './profile-info.module.scss';
import tmpl from './profile-info.hbs';

import { Avatar } from '../avatar';

export type ProfileInfoProps = {
  styles?: Record<string, string>;
  avatar?: Avatar;
  avatarUrl: URL;
  fullname: string;
  phone: string;
  description: string;
  email: string;
  username: string;
};

export class ProfileInfo extends Block<ProfileInfoProps> {
  constructor(props: ProfileInfoProps) {
    super({ styles, avatar: new Avatar({ url: props.avatarUrl }), ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

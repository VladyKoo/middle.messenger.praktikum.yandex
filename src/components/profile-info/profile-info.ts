import { Block } from '../../utils/Block';
import { Avatar } from '../avatar';
import styles from './profile-info.module.scss';
import tmpl from './profile-info.hbs';

export type ProfileInfoProps = {
  styles?: Record<string, string>;
  avatarImg?: Avatar;
  avatar?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  phone?: string;
  login?: string;
  email?: string;
};

export class ProfileInfo extends Block<ProfileInfoProps> {
  constructor(props: ProfileInfoProps = {}) {
    super({ styles, avatarImg: new Avatar({ url: props.avatar }), ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  protected componentDidUpdate() {
    this.children.avatarImg?.setProps({ url: this.props.avatar });
  }
}

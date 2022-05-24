import { Block } from '../../utils/Block';
import styles from './avatar.module.scss';
import tmpl from './avatar.hbs';

export type AvatarProps = {
  styles?: Record<string, string>;
  style?: string;
  url: URL;
  alt?: string;
};

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super({ styles, alt: 'avatar', ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

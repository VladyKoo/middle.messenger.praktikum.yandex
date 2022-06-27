import { Icon } from '../icon';
import { Avatar } from '../avatar';
import { Block } from '../../utils/Block';
import styles from './change-avatar.module.scss';
import tmpl from './change-avatar.hbs';

export type ChangeAvatarProps = {
  styles?: Record<string, string>;
  style?: string;
  url?: string;
  avatarImg?: Avatar;
  addPhotoIcon?: Icon;
  handleFile?: (file: File) => void;
  alt?: string;
};

export class ChangeAvatar extends Block<ChangeAvatarProps> {
  constructor(props: ChangeAvatarProps = {}) {
    super({
      styles,
      avatarImg: new Avatar({ url: props.url }),
      addPhotoIcon: new Icon({ icon: 'add-photo' }),
      alt: 'avatar',
      ...props,
    }, 'button');
  }

  addEvents(): (() => void) | void {
    if (!this._element) {
      return;
    }

    const addAvatarBtn = this._element;

    if (!addAvatarBtn) {
      return;
    }

    const onAddPhoto = () => {
      const input = document.createElement('input');
      input.type = 'file';

      input.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (!file || !this.props.handleFile) {
          return;
        }

        this.props.handleFile(file);
      };

      input.click();
    };

    addAvatarBtn.addEventListener('click', onAddPhoto);

    return () => {
      addAvatarBtn.removeEventListener('click', onAddPhoto);
    };
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  protected componentDidUpdate() {
    this.children.avatarImg?.setProps({ url: this.props.url });
  }
}

import { Block } from '@/utils/Block';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
  loginValidator,
} from '@/utils/fieldValidators';
import { UserController } from '@/controllers/user';
import { AuthController } from '@/controllers/auth';
import { ProfileFormModel, PasswordFormModel } from '@/api/user-api';
import { deepCompare } from '@/utils';
import { store, State } from '@/store';
import { ChangeAvatar } from '@/components/change-avatar';
import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Icon } from '@/components/icon';
import { RouterLink } from '@/components/router-link';
import styles from './settings.module.scss';
import tmpl from './settings.hbs';

const userController = new UserController();
const authController = new AuthController();

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

export type SettingsProps = {
  styles?: Record<string, string>;

  id?: string;
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;

  changeAvatar?: ChangeAvatar;
  settingsForm?: Form;
  passwordForm?: Form;
  backLink?: RouterLink;
  logout?: Button;
};

export class Settings extends Block<SettingsProps> {
  constructor(props: SettingsProps = {}) {
    let state = mapStateToProps(store.state);
    const propsAndState = { ...props, ...state };

    super({
      styles,
      changeAvatar: new ChangeAvatar({
        url: propsAndState.avatar,
        handleFile: (file) => this.changeUserAvatar(file),
      }),
      backLink: new RouterLink({
        href: '/profile',
        class: styles['top-icon'],
        content: new Icon({ icon: 'arrow-left' }),
      }),
      settingsForm: new Form({
        fields: [
          new Input({
            name: 'email',
            helper: 'This email already exists',
            label: 'Email',
            value: propsAndState.email,
            validator: emailValidator,
          }),
          new Input({
            name: 'login',
            helper: 'This login already exists',
            label: 'Login',
            value: propsAndState.login,
            validator: loginValidator,
          }),
          new Input({
            name: 'first_name',
            helper: 'This field is required',
            label: 'First name',
            value: propsAndState.first_name,
            validator: nameValidator,
          }),
          new Input({
            name: 'second_name',
            helper: 'This field is required',
            label: 'Second name',
            value: propsAndState.second_name,
            validator: nameValidator,
          }),
          new Input({
            name: 'display_name',
            helper: 'This field is required',
            label: 'Display name',
            value: propsAndState.display_name,
          }),
          new Input({
            name: 'phone',
            helper: 'This field is required',
            label: 'Phone',
            value: propsAndState.phone,
            validator: phoneValidator,
          }),
        ],
        button: new Button({
          title: 'Сhange settings',
          type: 'submit',
        }),
        handleSubmit: (e: Event) => this.handleSubmit(e, 'settingsForm'),
      }),
      passwordForm: new Form({
        fields: [
          new Input({
            type: 'password',
            name: 'oldPassword',
            helper: 'This field is required',
            label: 'Old password',
            validator: passwordValidator,
          }),
          new Input({
            type: 'password',
            name: 'newPassword',
            helper: 'This field is required',
            label: 'New password',
            validator: passwordValidator,
          }),
        ],
        button: new Button({
          title: 'Сhange password',
          type: 'submit',
        }),
        handleSubmit: (e: Event) => this.handleSubmit(e, 'passwordForm'),
      }),
      logout: new Button({
        title: 'Logout',
        style: 'background-color: red; color: white;',
        handleClick: () => this.logout(),
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

  handleSubmit(e: Event, form: 'settingsForm' | 'passwordForm') {
    e.preventDefault();

    const fields = this.children[form]?.props.fields as Input[];
    const isValide = fields.reduce((acc, field) => {
      field.validate();
      return field.props.error ? false : acc;
    }, true);

    if (!isValide) {
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);

    if (form === 'settingsForm') {
      userController.changeProfile(data as ProfileFormModel);
    } else {
      userController.changePassword(data as PasswordFormModel);
    }
  }

  changeUserAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file, file?.name);

    userController.changeAvatar(formData);
  }

  logout() {
    authController.logout();
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }

  componentDidUpdate() {
    this.children.changeAvatar?.setProps({ url: this.props.avatar });

    const fields = this.children.settingsForm?.props.fields as Input[];
    fields.forEach((field: Input) => {
      if (field.props.name) {
        field.setProps({ value: this.props[field.props.name as keyof typeof mapStateToProps] });
      }
    });
  }
}

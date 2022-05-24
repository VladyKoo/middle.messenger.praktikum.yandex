import { Block } from '../../../../../../utils/Block';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../../../../../../utils/fieldValidators';
import styles from './settings.module.scss';
import tmpl from './settings.hbs';

import { Avatar } from '../../../../../../components/avatar';
import { Form } from '../../../../../../components/form';
import { Input } from '../../../../../../components/input';
import { Button } from '../../../../../../components/button';
import { Icon } from '../../../../../../components/icon';

export type SettingsProps = {
  styles?: Record<string, string>;
  avatarUrl: URL;
  arrowLeftIcon?: Icon;
  addPhotoIcon?: Icon;
  avatar?: Avatar;
  form?: Form;
};

export class Settings extends Block<SettingsProps> {
  constructor(props: SettingsProps) {
    super({
      styles,
      arrowLeftIcon: new Icon({ icon: 'arrow-left' }),
      addPhotoIcon: new Icon({ icon: 'add-photo' }),
      avatar: new Avatar({ url: props.avatarUrl }),
      form: new Form({
        fields: [
          new Input({
            name: 'email',
            helper: 'This email already exists',
            label: 'Email',
            validator: emailValidator,
          }),
          new Input({
            name: 'username',
            helper: 'This username already exists',
            label: 'Username',
            validator: nameValidator,
          }),
          new Input({
            name: 'name',
            helper: 'This field is required',
            label: 'Name',
            validator: nameValidator,
          }),
          new Input({
            name: 'surname',
            helper: 'This field is required',
            label: 'Surname',
            validator: nameValidator,
          }),
          new Input({
            name: 'phone',
            helper: 'This field is required',
            label: 'Phone',
            validator: phoneValidator,
          }),
          new Input({
            type: 'password',
            name: 'password',
            helper: 'This field is required',
            label: 'Password',
            validator: passwordValidator,
          }),
          new Input({
            type: 'password',
            name: 'confirmPassword',
            helper: 'Your password and confirmation password do not match ',
            label: 'Confirm Password',
            validator: passwordValidator,
          }),
        ],
        button: new Button({
          title: 'Сhange',
          type: 'submit',
        }),
        handleSubmit: (e: Event) => this.handleSubmit(e),
      }),
      ...props,
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log(Object.fromEntries(formData));

    const fields = this.children.form.props.fields as Input[];

    const isValide = fields.reduce((acc, field) => {
      field.validate();
      return field.props.error ? false : acc;
    }, true);

    console.log(isValide);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

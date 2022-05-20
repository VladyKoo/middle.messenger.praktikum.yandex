import { Block } from '../../utils/Block';
import {
  confirmPasswordValidator,
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '../../utils/fieldValidators';
import styles from './signup.module.scss';
import tmpl from './signup.hbs';

import { Link } from '../../components/link';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';

export type SignupProps = {
  styles?: Record<string, string>;
  title?: string;
  link?: Link;
  form?: Form;
};

export class Signup extends Block<SignupProps> {
  constructor(props: SignupProps = {}) {
    super({
      styles,
      title: 'Sign Up',
      link: new Link({
        name: 'Sign In',
        href: 'signin',
      }),
      form: new Form({
        fields: [
          new Input({
            name: 'email',
            helper: 'This field is required',
            label: 'Email',
            outlined: true,
            validator: emailValidator,
          }),
          new Input({
            name: 'login',
            helper: 'This field is required',
            label: 'Login',
            outlined: true,
            validator: loginValidator,
          }),
          new Input({
            name: 'first_name',
            helper: 'This field is required',
            label: 'First name',
            outlined: true,
            validator: nameValidator,
          }),
          new Input({
            name: 'second_name',
            helper: 'This field is required',
            label: 'Second name',
            outlined: true,
            validator: nameValidator,
          }),
          new Input({
            name: 'phone',
            helper: 'This field is required',
            label: 'Phone',
            outlined: true,
            validator: phoneValidator,
          }),
          new Input({
            type: 'password',
            name: 'password',
            helper: 'This field is required',
            label: 'Password',
            outlined: true,
            validator: passwordValidator,
          }),
          new Input({
            type: 'password',
            name: 'confirmPassword',
            helper: 'Password and confirmation password do not match',
            label: 'Confirm Password',
            outlined: true,
            validator: (str) => this.handleConfirmValidation(str),
          }),
        ],
        button: new Button({
          title: 'Sign Up',
          type: 'submit',
        }),
        handleSubmit: (e: Event) => this.handleSubmit(e),
      }),
      ...props,
    });
  }

  handleConfirmValidation(str) {
    const fields = this.children.form.props.fields as Input[];

    const password = fields.find((field) => field.props.name === 'password');

    return confirmPasswordValidator(str, password?.props?.value || '');
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

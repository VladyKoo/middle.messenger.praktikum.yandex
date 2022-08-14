import { Block } from '@/utils/Block';
import {
  confirmPasswordValidator,
  emailValidator,
  loginValidator,
  nameValidator,
  passwordValidator,
  phoneValidator,
} from '@/utils/fieldValidators';
import { AuthController } from '@/controllers/auth';
import { SignupFormModel } from '@/api/auth-api';
import { Form } from '@/components/form';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { RouterLink } from '@/components/router-link';
import styles from './signup.module.scss';
import tmpl from './signup.hbs';

const authController = new AuthController();

export type SignupProps = {
  styles?: Record<string, string>;
  title?: string;
  link?: RouterLink;
  form?: Form;
};

export class Signup extends Block<SignupProps> {
  constructor(props: SignupProps = {}) {
    super({
      styles,
      title: 'Sign Up',
      link: new RouterLink({
        href: '/',
        class: styles.link,
        content: 'Sign In',
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

  handleConfirmValidation(str: string) {
    const fields = this.children.form?.props.fields as Input[];

    const password = fields.find((field) => field.props.name === 'password');

    return confirmPasswordValidator(str, password?.props?.value || '');
  }

  handleSubmit(e: Event) {
    e.preventDefault();

    const fields = this.children.form?.props.fields as Input[];
    const isValide = fields.reduce((acc, field) => {
      field.validate();
      return field.props.error ? false : acc;
    }, true);

    if (!isValide) {
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);

    const data = Object.fromEntries(formData);
    delete data.confirmPassword;

    authController.signup(data as SignupFormModel);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

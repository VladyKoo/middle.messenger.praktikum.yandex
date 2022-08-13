import { Block } from '../../utils/Block';
import { loginValidator, passwordValidator } from '../../utils/fieldValidators';
import { AuthController } from '../../controllers/auth';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { RouterLink } from '../../components/router-link';
import styles from './signin.module.scss';
import tmpl from './signin.hbs';
import { SigninFormModel } from '../../api/auth-api';

const authController = new AuthController();

export type SigninProps = {
  styles?: Record<string, string>;
  title?: string;
  link?: RouterLink;
  form?: Form;
};

export class Signin extends Block<SigninProps> {
  constructor(props: SigninProps = {}) {
    super({
      styles,
      title: 'Sign In',
      link: new RouterLink({
        href: '/sign-up',
        class: styles.link,
        content: 'Sign Up',
      }),
      form: new Form({
        fields: [
          new Input({
            name: 'login',
            helper: 'This field is required',
            label: 'Login',
            outlined: true,
            validator: loginValidator,
          }),
          new Input({
            type: 'password',
            name: 'password',
            helper: 'This field is required',
            label: 'Password',
            outlined: true,
            validator: passwordValidator,
          }),
        ],
        button: new Button({
          title: 'Sign In',
          type: 'submit',
        }),
        handleSubmit: (e: Event) => this.handleSubmit(e),
      }),
      ...props,
    });
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

    authController.signin(data as SigninFormModel);
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

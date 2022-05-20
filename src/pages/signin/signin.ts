import { Block } from '../../utils/Block';
import { loginValidator, passwordValidator } from '../../utils/fieldValidators';
import styles from './signin.module.scss';
import tmpl from './signin.hbs';

import { Link } from '../../components/link';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';

export type SigninProps = {
  styles?: Record<string, string>;
  title?: string;
  link?: Link;
  form?: Form;
};

export class Signin extends Block<SigninProps> {
  constructor(props: SigninProps = {}) {
    super({
      styles,
      title: 'Sign In',
      link: new Link({
        name: 'Sign Up',
        href: 'signup',
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

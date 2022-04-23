import styles from './signup.module.scss';
import tml from './signup.hbs';

import compileForm from '../../components/form';
import compileInput from '../../components/input';
import compileButton from '../../components/button';
import compileLink from '../../components/link';

export default function (ctx = {}) {
  const basetCtx = {
    title: 'Sign Up',
    form: compileForm({
      inputs: [
        compileInput({
          name: 'email',
          id: 'email',
          helper: 'This email already exists',
          label: 'Email',
          outlined: true,
        }),
        compileInput({
          name: 'username',
          id: 'username',
          helper: 'This username already exists',
          label: 'Username',
          outlined: true,
        }),
        compileInput({
          name: 'name',
          id: 'name',
          helper: 'This field is required',
          label: 'Name',
          outlined: true,
        }),
        compileInput({
          name: 'surname',
          id: 'surname',
          helper: 'This field is required',
          label: 'Surname',
          outlined: true,
        }),
        compileInput({
          name: 'phone',
          id: 'phone',
          helper: 'This field is required',
          label: 'Phone',
          outlined: true,
        }),
        compileInput({
          type: 'password',
          name: 'password',
          id: 'password',
          helper: 'This field is required',
          label: 'Password',
          outlined: true,
        }),
        compileInput({
          type: 'password',
          name: 'confirmPassword',
          id: 'confirmPassword',
          helper: 'Your password and confirmation password do not match ',
          label: 'Confirm Password',
          outlined: true,
        }),
      ],
      submit: compileButton({
        title: 'Sign Up',
        type: 'submit',
      }),
    }),
    link: compileLink({
      name: 'Sign In',
      href: 'signin',
    }),
    styles,
  };

  return tml({ ...basetCtx, ...ctx });
}

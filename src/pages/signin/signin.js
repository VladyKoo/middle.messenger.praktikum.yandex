import styles from './signin.module.scss';

import compileForm from '../../components/form';
import compileInput from '../../components/input';
import compileButton from '../../components/button';
import compileLink from '../../components/link';
import tml from './signin.hbs';

const defaultCtx = {
  title: 'Sign In',
  form: compileForm({
    inputs: {
      password: compileInput({
        type: 'password',
        name: 'password',
        id: 'password',
        helper: 'Help password',
        label: 'Password',
      }),
      username: compileInput({
        name: 'username',
        id: 'username',
        helper: 'Help username',
        label: 'Username',
      }),
    },
    submit: compileButton({
      title: 'Sign In',
      type: 'submit',
    }),
  }),
  link: compileLink({
    name: 'Sign Up',
    href: 'signup',
  }),
  styles,
};

export default function (ctx = {}) {
  return tml({ ...defaultCtx, ...ctx });
}

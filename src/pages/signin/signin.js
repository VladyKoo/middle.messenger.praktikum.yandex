import styles from './signin.module.scss';
import tml from './signin.hbs';

import compileForm from '../../components/form';
import compileInput from '../../components/input';
import compileButton from '../../components/button';
import compileLink from '../../components/link';

export default function (ctx = {}) {
  const basetCtx = {
    title: 'Sign In',
    form: compileForm({
      inputs: [
        compileInput({
          name: 'username',
          id: 'username',
          helper: 'Help username',
          label: 'Username',
          outlined: true,
        }),
        compileInput({
          type: 'password',
          name: 'password',
          id: 'password',
          helper: 'Help password',
          label: 'Password',
          outlined: true,
        }),
      ],
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
  return tml({ ...basetCtx, ...ctx });
}

import styles from './settings.module.scss';

import compileAuthForm from '../../../../../../components/form';
import compileInput from '../../../../../../components/input';
import compileButton from '../../../../../../components/button';

import tml from './settings.hbs';

const defaultCtx = {
  form: compileAuthForm({
    inputs: {
      email: compileInput({
        name: 'email',
        id: 'email',
        helper: 'This email already exists',
        label: 'Email',
      }),
      username: compileInput({
        name: 'username',
        id: 'username',
        helper: 'This username already exists',
        label: 'Username',
      }),
      name: compileInput({
        name: 'name',
        id: 'name',
        helper: 'This field is required',
        label: 'Name',
      }),
      surname: compileInput({
        name: 'surname',
        id: 'surname',
        helper: 'This field is required',
        label: 'Surname',
      }),
      phone: compileInput({
        name: 'phone',
        id: 'phone',
        helper: 'This field is required',
        label: 'Phone',
      }),
      password: compileInput({
        type: 'password',
        name: 'password',
        id: 'password',
        helper: 'This field is required',
        label: 'Password',
      }),
      confirmPassword: compileInput({
        type: 'password',
        name: 'confirmPassword',
        id: 'confirmPassword',
        helper: 'Your password and confirmation password do not match ',
        label: 'Confirm Password',
      }),
    },
    submit: compileButton({
      title: 'Сhange',
      type: 'submit',
    }),
  }),
  styles,
};

export default function (ctx = {}) {
  return tml({ ...defaultCtx, ...ctx });
}

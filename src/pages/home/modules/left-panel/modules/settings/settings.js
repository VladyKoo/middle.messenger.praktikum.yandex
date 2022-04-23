import styles from './settings.module.scss';
import tml from './settings.hbs';

import compileAuthForm from '../../../../../../components/form';
import compileInput from '../../../../../../components/input';
import compileButton from '../../../../../../components/button';
import compileAvatar from '../../../../../../components/avatar';
import compileArrowLeftIcon from '../../../../../../components/icons/arrow-left';
import compileAddPhotoIcon from '../../../../../../components/icons/add-photo';

export default function (ctx = {}) {
  const basetCtx = {
    icons: {
      arrowLeft: compileArrowLeftIcon(),
      addPhoto: compileAddPhotoIcon(),
    },
    avatar: compileAvatar({ url: ctx?.avatarUrl }),
    form: compileAuthForm({
      inputs: [
        compileInput({
          name: 'email',
          id: 'email',
          helper: 'This email already exists',
          label: 'Email',
        }),
        compileInput({
          name: 'username',
          id: 'username',
          helper: 'This username already exists',
          label: 'Username',
        }),
        compileInput({
          name: 'name',
          id: 'name',
          helper: 'This field is required',
          label: 'Name',
        }),
        compileInput({
          name: 'surname',
          id: 'surname',
          helper: 'This field is required',
          label: 'Surname',
        }),
        compileInput({
          name: 'phone',
          id: 'phone',
          helper: 'This field is required',
          label: 'Phone',
        }),
        compileInput({
          type: 'password',
          name: 'password',
          id: 'password',
          helper: 'This field is required',
          label: 'Password',
        }),
        compileInput({
          type: 'password',
          name: 'confirmPassword',
          id: 'confirmPassword',
          helper: 'Your password and confirmation password do not match ',
          label: 'Confirm Password',
        }),
      ],
      submit: compileButton({
        title: 'Сhange',
        type: 'submit',
      }),
    }),
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

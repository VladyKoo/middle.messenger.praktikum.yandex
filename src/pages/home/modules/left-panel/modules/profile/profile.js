import styles from './profile.module.scss';
import tml from './profile.hbs';

const defaultCtx = {
  fullname: 'Name Surname',
  phone: '+7 900 000 00 00',
  description: 'lorem ipsum',
  email: 'user@google.com',
  username: 'Username',
  styles,
};

export default function (ctx = {}) {
  return tml({ ...defaultCtx, ...ctx });
}

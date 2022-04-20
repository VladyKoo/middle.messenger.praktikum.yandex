import styles from './form.module.scss';
import tml from './form.hbs';

window.form = {
  handleFormSubmit: (e, handler = (d) => {}) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    handler(Array.from(formData.entries()));
  },
};

const defaultCtx = {
  styles,
};

export default (ctx = {}) => {
  return tml({ ...defaultCtx, ...ctx });
};

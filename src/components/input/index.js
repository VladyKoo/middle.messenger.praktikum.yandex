import styles from './input.module.scss';
import tml from './input.hbs';

window.addEventListener('load', () => {
  const inputs = document.querySelectorAll('.' + styles.input);
  inputs.forEach((node) => {
    node.addEventListener('focus', (e) => {
      const input = e.target;
      if (!input.value.trim()) {
        input.labels[0].classList.add(styles.focused);
        input.parentNode.classList.add(styles.focused);
      }
    });
    node.addEventListener('blur', (e) => {
      const input = e.target;
      if (!input.value.trim()) {
        input.labels[0].classList.remove(styles.focused);
        input.parentNode.classList.remove(styles.focused);
      }
    });
  });
});

const defaultCtx = {
  type: 'text',
  styles,
};

export default (ctx = {}) => {
  return tml({ ...defaultCtx, ...ctx });
};

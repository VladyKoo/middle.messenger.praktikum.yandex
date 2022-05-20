import styles from './input.module.scss';
import tml from './input.hbs';

window.addEventListener('load', () => {
  const inputBoxes = document.querySelectorAll(`.${styles.box}`);
  inputBoxes.forEach((node) => {
    const input = node.querySelector(`.${styles.input}`);
    if (!input) return;

    if (input.value.trim()) {
      input.labels[0].classList.add(styles.focused);
      input.parentNode.classList.add(styles.focused);
    }

    input.addEventListener('focus', (e) => {
      const input = e.target;
      if (!input.value.trim()) {
        input.labels[0].classList.add(styles.focused);
        input.parentNode.classList.add(styles.focused);
      }
    });
    input.addEventListener('blur', (e) => {
      const input = e.target;
      if (!input.value.trim()) {
        input.labels[0].classList.remove(styles.focused);
        input.parentNode.classList.remove(styles.focused);
      }
    });
  });
});

export default function (ctx = {}) {
  const basetCtx = {
    type: 'text',
    outlinedStyle: ctx.outlined ? styles.outlined : '',
    value: '',
    styles,
  };
  return tml({ ...basetCtx, ...ctx });
}

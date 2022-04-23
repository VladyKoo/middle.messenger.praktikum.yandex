import tml from './visibility.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    width: '100%',
    height: '100%',
    color: 'white',
    off: false,
  };
  return tml({ ...basetCtx, ...ctx });
}

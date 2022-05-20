import tml from './edit.hbs';

export default function (ctx = {}) {
  const basetCtx = {
    width: '100%',
    height: '100%',
    color: 'white',
  };
  return tml({ ...basetCtx, ...ctx });
}

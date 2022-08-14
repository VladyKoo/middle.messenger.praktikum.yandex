import { Block } from '@/utils/Block';
import { LeftPanel } from './modules/left-panel';
import { Lenta } from './modules/lenta';
import { AboutPanel } from './modules/about-panel';
import styles from './home.module.scss';
import tmpl from './home.hbs';

export type HomeProps = {
  styles?: Record<string, string>;
  route: string;
  lenta?: Lenta;
  leftPanel?: LeftPanel;
  aboutPanel?: AboutPanel;
};

export class Home extends Block<HomeProps> {
  constructor(props: HomeProps) {
    super({
      styles,
      lenta: new Lenta(),
      leftPanel: new LeftPanel({ route: props.route }),
      aboutPanel: new AboutPanel(),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

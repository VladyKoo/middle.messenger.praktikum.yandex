import { Block } from '../../utils/Block';
import styles from './search.module.scss';
import { Icon } from '../icon';
import tmpl from './search.hbs';

export type SearchProps = {
  styles?: Record<string, string>;
  searchIcon?: Icon;
};

export class Search extends Block<SearchProps> {
  constructor(props: SearchProps = {}) {
    super({ styles, searchIcon: new Icon({ icon: 'search' }), ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

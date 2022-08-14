import { Block } from '@/utils/Block';
import { Icon } from '@/components/icon';
import styles from './search.module.scss';
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

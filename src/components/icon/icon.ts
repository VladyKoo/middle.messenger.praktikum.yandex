import { Block } from '../../utils/Block';
import { getPathData } from './icons';
import tmpl from './icon.hbs';

export type IconProps = {
  width?: string;
  height?: string;
  color?: string;
  icon: string;
  pathData?: string;
};

export class Icon extends Block<IconProps> {
  constructor(props: IconProps) {
    super({ width: '100%', height: '100%', color: 'white', pathData: getPathData(props.icon), ...props });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

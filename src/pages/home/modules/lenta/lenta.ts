import { Block } from '../../../../utils/Block';
import { getTime } from '../../../../utils';
import styles from './lenta.module.scss';
import tmpl from './lenta.hbs';

import { Avatar } from '../../../../components/avatar';
import { Search } from '../../../../components/search';
import { Icon } from '../../../../components/icon';
import { Message } from './modules/message';
import { ChatInput } from './modules/chat-input/chat-input';

export type LentaProps = {
  styles?: Record<string, string>;
  show: boolean;
  avatar?: Avatar;
  search?: Search;
  moreIcon?: Icon;
  messages?: Message[];
  chatInput?: ChatInput;
};

export class Lenta extends Block<LentaProps> {
  constructor(props: LentaProps) {
    const avatarUrl = new URL('../../../../assets/images/avatar.png', import.meta.url);
    const imgUrl = new URL('../../../../assets/images/img.jpg', import.meta.url);

    super({
      styles,
      avatar: new Avatar({ url: avatarUrl }),
      search: new Search(),
      moreIcon: new Icon({ icon: 'more' }),
      messages: [
        new Message({
          right: true,
          type: 'text',
          value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, aperiam.',
          time: getTime('2020-01-02T14:22:22.000Z'),
          date: 'Aprile 15',
        }),
        new Message({
          right: true,
          type: 'text',
          value:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque vel maiores corporis voluptate fugiat, fuga saepe! Doloremque ex quaerat nostrum, quibusdam blanditiis',
          time: getTime('2020-01-02T14:22:22.000Z'),
        }),
        new Message({
          type: 'text',
          value: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
          time: getTime('2020-01-02T14:22:22.000Z'),
          date: 'Aprile 16',
        }),
        new Message({
          type: 'text',
          value:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam assumenda laudantium, cum voluptatibus at, odit harum possimus temporibus iure voluptates minima sapiente nemo placeat! Fugit aliquid quis omnis tenetur earum reiciendis repellat, suscipit exercitationem repudiandae perferendis incidunt in deleniti, rem repellendus. Deleniti molestias accusamus consectetur tempore, quo ipsam cupiditate vitae quos illo culpa tenetur repellat non cum rerum aut explicabo qui temporibus deserunt perspiciatis asperiores! Assumenda quos aliquam incidunt numquam nemo veniam voluptatem voluptate cupiditate enim! Animi tenetur magnam aut sint, illo placeat voluptatibus pariatur ab in minima ipsam fuga sunt incidunt impedit sit commodi quos consequuntur labore eveniet perspiciatis sequi soluta blanditiis quia. Consequuntur, excepturi quia? Ipsum ad sequi, ducimus odit dignissimos illum est error adipisci molestias laborum expedita amet repellat sit velit deserunt placeat, nulla corporis odio ab repellendus officia tempore modi. Quisquam vel neque quis consectetur, optio quam consequuntur quae perferendis maiores voluptates ex obcaecati eum distinctio aspernatur vero necessitatibus in est. Consectetur sunt rerum consequatur vitae amet culpa quia obcaecati ullam, deserunt pariatur expedita. Quae, ab assumenda. Reiciendis obcaecati placeat excepturi nesciunt nulla mollitia eius optio eveniet, cum accusantium provident, autem ut minus, sed sunt sint. Ducimus asperiores deserunt laborum quidem totam aut molestiae rem. Modi.',
          time: getTime('2020-01-02T14:22:22.000Z'),
        }),
        new Message({
          type: 'image',
          value: imgUrl,
          time: getTime('2020-01-02T14:22:22.000Z'),
          date: 'Aprile 16',
        }),
      ],
      chatInput: new ChatInput(),
      ...props,
    });
  }

  render(): DocumentFragment {
    return this.compile(tmpl, { ...this.props });
  }
}

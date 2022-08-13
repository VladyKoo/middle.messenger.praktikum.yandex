import { ChatsController } from './controllers/chats';
import { router } from './router';
import { store } from './store';
import { AuthController } from './controllers/auth';

import './assets/styles/normalize.css';
import './assets/styles/style.scss';

const authController = new AuthController();
const chatsController = new ChatsController();

authController.getUser().then((data) => {
  if (data) {
    router.go('/messenger');
  }
});
chatsController.getChats();

store.subscribe(() => {
  if (!store.state.auth.isAuth) {
    router.go('/');
  }
});

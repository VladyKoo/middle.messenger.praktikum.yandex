import { ChatsController } from './controllers/chats';
import { router } from './router';
import { store } from './store';
import { AuthController } from './controllers/auth';

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

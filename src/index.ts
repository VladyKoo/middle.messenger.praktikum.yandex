import { createRoot } from './utils/createRoot';
import { Home } from './pages/home';
import { Error } from './pages/error';
import { Signin } from './pages/signin';
import { Signup } from './pages/signup';
import { Default } from './layout/default';

const root = createRoot(document.querySelector('#root'));

const page404 = new Error({ title: '404 Page Not Found' });

const { pathname } = window.location;
switch (pathname) {
  case '/':
  case '/profile':
  case '/settings':
    root.render(
      new Default({
        outlet: new Home({ route: pathname }),
      }),
    );
    break;
  case '/signin':
    root.render(
      new Default({
        outlet: new Signin(),
      }),
    );
    break;
  case '/signup':
    root.render(
      new Default({
        outlet: new Signup(),
      }),
    );
    break;
  default:
    root.render(new Default({ outlet: page404 }));
    break;
}

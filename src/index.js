import renderHomePage from './pages/home';
import renderErrorPage from './pages/error';
import renderSigninPage from './pages/signin';
import renderSignupPage from './pages/signup';
import renderLayout from './layout/default';

const root = document.querySelector('#root');
const content = document.createElement('div');

const { pathname } = window.location;
switch (pathname) {
  case '/':
  case '/profile':
  case '/settings':
    content.innerHTML = renderLayout(renderHomePage({}, pathname));
    break;
  case '/signin':
    content.innerHTML = renderLayout(renderSigninPage());
    break;
  case '/signup':
    content.innerHTML = renderLayout(renderSignupPage());
    break;
  default:
    content.innerHTML = renderLayout(renderErrorPage({ code: 404 }));
    break;
}
root.appendChild(content);

import { renderHomePage } from './pages/HomePage';
import { renderProfilePage } from './pages/ProfilePage';
import { renderLoginPage } from './pages/LoginPage';
import { renderNotFoundPage } from './pages/NotFoundPage';

// 라우팅 경로 설정
export const routes = [
  { path: '/', handler: (isLoggedIn) => renderHomePage(isLoggedIn) },
  {
    path: '/profile',
    handler: (isLoggedIn) => {
      if (!isLoggedIn) {
        renderLoginPage(isLoggedIn);
      } else {
        renderProfilePage(isLoggedIn);
      }
    },
  },
  {
    path: '/login',
    handler: (isLoggedIn) => {
      if (!isLoggedIn) {
        renderLoginPage(isLoggedIn);
      } else {
        renderHomePage(isLoggedIn);
      }
    },
  },
  { path: '/404', handler: (isLoggedIn) => renderNotFoundPage(isLoggedIn) },
];

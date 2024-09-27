import Router from './router/Router';
import { renderHomePage } from './pages/HomePage';
import { renderProfilePage } from './pages/ProfilePage';
import { renderLoginPage } from './pages/LoginPage';
import { renderNotFoundPage } from './pages/NotFoundPage';

// 라우터 인스턴스 생성 및 초기화
const router = Router.getInstance();
router.init();

// 라우팅 경로 설정
const routes = [
  { path: '/', component: renderHomePage },
  { path: '/profile', component: renderProfilePage },
  { path: '/login', component: renderLoginPage },
  { path: '/404', component: renderNotFoundPage },
];

// 라우팅 설정
routes.forEach((route) => {
  router.addRoute(route.path, () => route.component(router.isLoggedIn));
});

// 현재 활성화된 메뉴 강조 처리
const handleMenuActive = (currentPath) => {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href').replace('.', '') === currentPath;
    link.classList.toggle('text-blue-600', isActive);
    link.classList.toggle('font-bold', isActive);
    link.classList.toggle('text-gray-600', !isActive);
  });
};

// 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
const handleLinkClick = (e) => {
  const link = e.target.closest('nav a');
  if (link) {
    e.preventDefault();
    router.navigateTo(link.pathname);
    handleMenuActive(link.pathname);
  }
};

// 애플리케이션 초기화 처리
const initializeApp = () => {
  router.handleRoute(window.location.pathname);
  handleMenuActive(window.location.pathname);
};

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', initializeApp);
document.addEventListener('click', handleLinkClick);

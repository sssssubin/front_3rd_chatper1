import Router from './router/Router';
import { UserPreferences } from './services/UserPreferences';
import { routes } from './routes';

// 경로 가드 설정
const routeGuard = (route) => {
  // 로그인 상태를 확인하기 위해 getter를 호출
  const isLoggedIn = UserPreferences.preferences.isLoggedIn;

  // 외부에서 설정된 핸들러를 호출
  route.handler(isLoggedIn);
};

// 라우팅 설정
Router.routeGuard(routeGuard);
routes.forEach((route) => {
  Router.addRoute(route.path, () => Router.executeGuard(route));
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

// 링크 클릭 시 페이지 전환 및 메뉴 활성화
const navigateToLink = (path) => {
  Router.navigateTo(path);
  handleMenuActive(path);
};

// 네비게이션 이벤트 처리
const handleLinkClick = (e) => {
  const link = e.target.closest('nav a');
  if (link) {
    e.preventDefault();
    navigateToLink(link.pathname);
  }
};

// 로그인 성공 처리
const handleLoginSuccess = () => {
  const userInfo = {
    username: document.getElementById('username').value,
    email: '',
    bio: '',
    isLoggedIn: true,
  };
  UserPreferences.set(userInfo); // LocalStorage에 사용자 정보 저장

  Router.handleLogin();
  navigateToLink('/profile'); // 프로필 페이지로 이동
};

// 로그아웃 성공 처리
const handleLogoutSuccess = () => {
  UserPreferences.delete(); // 사용자 정보 삭제
  Router.handleLogout();
  navigateToLink('/'); // 홈 페이지로 이동
};

// 프로필 업데이트 성공 처리
const handleProfileUpdateSuccess = () => {
  const userInfo = {
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    bio: document.getElementById('bio').value,
    isLoggedIn: UserPreferences.preferences.isLoggedIn,
  };

  UserPreferences.set(userInfo); // LocalStorage에 사용자 정보 업데이트
  alert('프로필이 업데이트되었습니다.');
};

// 애플리케이션 초기화 처리
const initializeApp = () => {
  Router.handleRoute(window.location.pathname);
  handleMenuActive(window.location.pathname);
};

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', initializeApp);
document.addEventListener('click', handleLinkClick);
window.addEventListener('loginSuccess', handleLoginSuccess);
window.addEventListener('logoutSuccess', handleLogoutSuccess);
window.addEventListener('profileUpdateSuccess', handleProfileUpdateSuccess);

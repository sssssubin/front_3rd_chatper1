// Router 구현
const Router = {
  routes: {},
  guard: null,
  isLoggedIn: false,

  addRoute(path, handler) {
    this.routes[path] = handler;
  },

  navigateTo(path) {
    history.pushState(null, '', path);
    this.handleRoute(path);
  },

  handlePopState() {
    this.handleRoute(window.location.pathname);
  },

  handleRoute(path) {
    const handler = this.routes[path] || this.routes['/404'];
    this.executeHandler(handler);
  },

  executeHandler(handler) {
    if (handler) {
      handler(); // 외부에서 설정된 핸들러를 호출
    } else {
      console.error(`No handler found for path: ${path}`); // 핸들러가 없을 경우 에러 로그
    }
  },

  routeGuard(guard) {
    this.guard = guard;
  },

  executeGuard(route) {
    if (this.guard) {
      this.guard(route);
    } else {
      this.handleRoute(route.path);
    }
  },

  setLoginStatus(status) {
    this.isLoggedIn = status;
  },

  handleLogin() {
    this.setLoginStatus(true);
  },

  handleLogout() {
    this.setLoginStatus(false);
  },

  init() {
    window.addEventListener('popstate', this.handlePopState.bind(this));
  },
};

// 라우터 인스턴스 초기화
Router.init();

export default Router;

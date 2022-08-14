import { Block } from './Block';
import { createRoot, Root } from './createRoot';

export type Route = {
  path: string;
  component: new (props: any) => Block;
  props?: Record<string, unknown>;
  name?: string;
  children?: Route[];
};

export class Router {
  private readonly history: History;

  private routes: Route[] = [];

  private currentRoute: Route | null = null;

  private currentComponent: any | null = null;

  private root: Root;

  constructor(routes: Route[], selector: string) {
    this.history = window.history;
    this.routes = routes;

    this.root = createRoot(document.querySelector(selector));

    this.init();
  }

  private init() {
    window.addEventListener('popstate', () => {
      const path = window.location.pathname;

      this.onRoute(path);
    });
    this.onRoute(window.location.pathname);
  }

  private getRoute(path: string) {
    let route = this.routes.find((item) => item.path === path);

    if (!route) {
      route = this.routes.find((item) => item.path === '*');
    }

    return route;
  }

  private onRoute(path: string) {
    const route = this.getRoute(path);
    if (!route) {
      return;
    }

    if (this.currentRoute) {
      this.currentComponent.dispatchComponentWillDestroy();
      this.currentComponent = null;
    }

    this.currentRoute = route;
    this.currentComponent = new this.currentRoute.component(this.currentRoute.props || {});

    this.root.render(this.currentComponent);
  }

  public getPath(): string | null {
    return this.currentRoute?.path || null;
  }

  public go(path: string | number) {
    if (path === this.getPath()) {
      return;
    }

    if (typeof path === 'number') {
      this.history.go(path);
    } else {
      this.history.pushState('', '', path);
      this.onRoute(path);
    }
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }
}

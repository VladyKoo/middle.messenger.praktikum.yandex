export class EventBus {
  listeners: Record<string, any[]>;

  constructor() {
    this.listeners = {};
  }

  on<T extends unknown[]>(event: string, callback: (...args: T) => void): EventBus {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return this;
  }

  off<T extends unknown[]>(event: string, callback: (...args: T) => void): EventBus {
    if (!this.listeners[event]) {
      throw new Error(`The event '${event}' does't exist`);
    }
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
    return this;
  }

  emit<T extends unknown[]>(event: string, ...args: T): EventBus {
    if (!this.listeners[event]) {
      throw new Error(`The event '${event}' does't exist`);
    }
    this.listeners[event].forEach((cb) => {
      cb(...args);
    });
    return this;
  }
}

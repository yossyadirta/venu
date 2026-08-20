export type EventType = 'ADD_TO_CART' | 'TICKET_SELECTED' | 'AUTH_STATE_CHANGED';

type EventCallback = (payload: any) => void;

class EventBus {
  private listeners: Record<string, EventCallback[]> = {};

  on(event: EventType, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => this.off(event, callback);
  }

  off(event: EventType, callback: EventCallback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback);
  }

  emit(event: EventType, payload?: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((callback) => callback(payload));
  }
}

export const eventBus = new EventBus();

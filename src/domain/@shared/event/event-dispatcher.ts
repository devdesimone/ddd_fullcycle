import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private _handlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this._handlers;
  }

  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this._handlers[eventName]) {
      this._handlers[eventName] = [];
    }
    this._handlers[eventName].push(eventHandler);
  }

  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this._handlers[eventName]) {
      return;
    }
    this._handlers[eventName] = this._handlers[eventName].filter(
      (handler) => handler !== eventHandler
    );
  }
  unregisterAll(): void {
    this._handlers = {};
  }

  notyfy(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (!this._handlers[eventName]) {
      return;
    }
    this._handlers[eventName].forEach((handler) => handler.handle(event));
  }
}

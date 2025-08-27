import { subscribe } from "./events-api.utils";
import type { EventType, IEventsApi } from "./events-api.types";

export class EventsApi implements IEventsApi {
  public on(
    event: EventType,
    listener: (this: Window, ev: CustomEventInit) => void
  ): () => void {
    return subscribe(event, listener);
  }
}

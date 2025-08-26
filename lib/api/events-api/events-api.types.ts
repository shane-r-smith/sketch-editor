/**
 * Event types that can occur within the editor.
 *
 * "SKETCH" Events that occur within the editor that would update the editor sketch.
 * "TOOL": Events that occur within the editor that would update the tools state and selection
 */
export type EventType = "SKETCH" | "TOOL";

export interface IEventsApi {
  /**
   * Listen to changes in the editor. Events like `resize` or `dragging` may trigger the operation frequently.
   * @param event The type of event to listen to.
   * @param listener The callback function to fire, when an event occurs.
   * @returns An unsubscribe function, to stope listening to changes.
   * @example Unsubscribing example
   *
   * const off = sketchApiInstance.on('SKETCH', (e) => {
   *    console.log("A sketch change has occurred");
   * });
   *
   * // When you have finished listening to events (E.G. the user closes the sketch), you can unsubscribe from the event.
   * off();
   *
   * @example Throttled saving example
   *
   * let timeout = null;
   * const requestSave = (sketch) => {
   *     // if save is already requested - do nothing
   *     if (timeout) {
   *         return;
   *     }
   *
   *     // schedule saving to the backend
   *     timeout = setTimeout(() => {
   *          // reset timeout
   *          timeout = null;
   *
   *          // Call the save function
   *          save(sketch);
   *     }, 1000);
   * };
   *
   * // request saving operation on any changes
   * sketchApiInstance.on('SKETCH', (e) => {
   *     requestSave(e.detail.sketch);
   * });
   *
   */
  on: (
    event: EventType,
    listener: (this: Window, ev: CustomEventInit) => void
  ) => () => void;
}

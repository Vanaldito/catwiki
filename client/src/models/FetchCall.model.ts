export interface FetchCall<T> {
  call: Promise<T>;
  controller: AbortController;
}

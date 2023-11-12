export interface IActionCallbackOptions {
  onSuccess?: () => Promise<void> | void;
  onError?: () => Promise<void> | void;
}

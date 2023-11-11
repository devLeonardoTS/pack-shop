export interface IActionCallbackOptions {
  onSuccess?: () => Promise<void> | void;
  onFailure?: () => Promise<void> | void;
}

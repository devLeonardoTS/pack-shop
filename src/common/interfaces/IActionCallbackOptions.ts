export interface IActionCallbackOptions {
  onSuccess?: () => Promise<any> | any;
  onError?: () => Promise<any> | any;
}

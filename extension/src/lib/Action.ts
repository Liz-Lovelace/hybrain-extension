export default function (actionName: string, func: Function) {
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (actionName !== message.action) {
      return;
    }
    func(message.data, sendResponse);
    return true;
  });
}

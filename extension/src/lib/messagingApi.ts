export function callBackgroundScript(action, data) {
  console.log('ACTION (background): ', action);
  return new Promise((resolve, reject) => {
    browser.runtime.sendMessage({ action, data }, resolve);
  });
}

export function callContentScript(action, data) {
  console.log('ACTION (content): ', action);
  return new Promise((resolve, reject) => {
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      browser.tabs.sendMessage(tabs[0].id, { action, data }, resolve);
    });
  });
}

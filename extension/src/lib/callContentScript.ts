export default function callContentScript(action, prompt) {
  // Send a message to the content script
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action, data: prompt });
  });
}

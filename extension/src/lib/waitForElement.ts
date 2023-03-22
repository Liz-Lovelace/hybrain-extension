export default function waitForElement(selector, timeout = 3000) {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);

    if (element) {
      resolve(element);
    } else {
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              const foundElement = node.querySelector(selector);
              if (foundElement) {
                observer.disconnect();
                resolve(foundElement);
              }
            }
          }
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
    }
  });
}
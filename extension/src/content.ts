export {};

// Listen for messages from the popup script
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'callFunction') {
    const result = ins(message.data);
    sendResponse(result);
  }
});

async function ins(prompt) {
  try {
    // Find the first text input on the current tab
    let selector = 'textarea';
    const textInput = await waitForElement(selector, 5000);
    if (textInput) {
      // Paste the string "beans" into that text input
      pasteIntoInput(textInput, prompt);
    } else {
      console.log('No text input found on the current tab.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function waitForElement(selector: string, timeout = 3000): Promise<HTMLTextAreaElement | null> {
  return new Promise((resolve) => {
    const element = document.querySelector<HTMLElement>(selector);

    if (element) {
      resolve(element);
    } else {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          Array.from(mutation.addedNodes).forEach((node) => {
            if (node instanceof HTMLElement) {
              const foundElement = node.querySelector<HTMLTextAreaElement>(selector);
              if (foundElement) {
                observer.disconnect();
                resolve(foundElement);
              }
            }
          });
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      setTimeout(() => {
        observer.disconnect();
        resolve(null);
      }, timeout);
    }
  });
}

function pasteIntoInput(input: HTMLTextAreaElement, text: string): void {
  console.log('pasting into', input);
  input.focus();
  input.value = text.replace('{PROMPT}', input.value);
  // stupid evil hack to make multiline input work
  console.log(input.style);
  input.style['padding-right'] = input.style['padding-right'] == '1.76rem' ? '1.75rem' : '1.76rem';
}

// Listen for the 'pasteEvent' message and dispatch the event accordingly
//window.addEventListener('message', (event) => {
//  if (event.origin !== window.location.origin || event.data.type !== 'pasteEvent') {
//    return;
//  }
//
//  const { target, eventInit } = event.data;
//  const inputEvent = new Event("input", eventInit);
//  target.dispatchEvent(inputEvent);
//});

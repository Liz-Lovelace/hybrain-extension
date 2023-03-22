import waitForElement from './lib/waitForElement.ts'

export {};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action in actions == false){
    console.error(`Message ${message.action} isn't an available action.`)
    return;
  }
  actions[message.action](message, sender, sendResponse)
});

let actions = {
  'insert prompt': async (message, sender, sendResponse) => {
    const result = await insertPrompt(message.data);
    sendResponse(result);
  }
}

async function insertPrompt(prompt) {
  try {
    const selector = 'textarea';
    const textInput = await waitForElement(selector, 5000);
    if (textInput) {
      pasteIntoInput(textInput, prompt);
    } else {
      console.error('No text input found on the current tab.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

function pasteIntoInput(input, text) {
  input.focus();
  input.value = text.replace('{PROMPT}', input.value);
  // stupid hack to get around chatGPT ui not showing multiline strings correctly
  input.style['padding-right'] = input.style['padding-right'] === '1.76rem' ? '1.75rem' : '1.76rem';
}

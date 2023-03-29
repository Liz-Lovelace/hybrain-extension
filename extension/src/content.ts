import Action from './lib/Action.ts';
import gptInputRefresh from './lib/gptInputRefresh.ts';
import lastElementWithSelector from './lib/lastElementWithSelector.ts';
import { callBackgroundScript, callContentScript } from './lib/messagingApi.ts';
import transformPrompt from './lib/transformPrompt.ts';
import waitForElement from './lib/waitForElement.ts';

export {};

Action('apply template', async (template) => {
  const input = await waitForElement('textarea', 5000);
  if (!input) {
    throw 'No text input found on the current tab.';
  }
  input.focus();
  input.value = transformPrompt(input.value, template);
  gptInputRefresh(input);
});

Action('display prompt suggestions', async (suggestions) => {
  alert(`suggestions: ${JSON.stringify(suggestions)}`);
});

monitorAnswerDiv();
async function monitorAnswerDiv() {
  let wasInProcess = false;

  const awaitAnswerFinish = async () => {
    const answerElem = lastElementWithSelector('.markdown.prose.w-full.break-words');
    if (!answerElem) {
      return;
    }

    const isStreaming = answerElem.classList.contains('result-streaming');

    if (isStreaming) {
      wasInProcess = true;
    }

    if (!isStreaming && wasInProcess) {
      wasInProcess = false;
      await callBackgroundScript('send answer to backend', answerElem.innerHTML);
    }
  };

  setInterval(awaitAnswerFinish, 100);
}

import React from 'react';
import ReactDOM from 'react-dom';

import CopyButton from './components/general/CopyButton.tsx';
import Suggestion from './components/promptSuggestions/Suggestion.tsx';
import Action from './lib/action.ts';
import gptInputRefresh from './lib/gptInputRefresh.ts';
import htmlToCopyableText from './lib/htmlToCopyableText.ts';
import lastElementWithSelector from './lib/lastElementWithSelector.ts';
import { callBackgroundScript, callContentScript } from './lib/messagingApi.ts';
import { Settings } from './lib/settings.ts';
import transformPrompt from './lib/transformPrompt.ts';
import waitForElement from './lib/waitForElement.ts';

import 'chrome-browser-object-polyfill';

export const config: PlasmoCSConfig = {
  matches: ['https://chat.openai.com/c*']
};

Action('apply template', async (template) => {
  const input = await waitForElement('textarea', 5000);
  if (!input) {
    throw 'No text input found on the current tab.';
  }
  input.focus();
  input.value = transformPrompt(input.value, template);
  gptInputRefresh(input);
});

Action('display prompt suggestions', async (suggestion) => {
  const answerElem = lastElementWithSelector('.markdown.prose.w-full.break-words');
  const suggestionComponent = React.createElement(Suggestion, {
    mainText: suggestion.suggestion,
    buttonText: suggestion.prompt
  });
  const container = document.createElement('div');

  answerElem.appendChild(container);
  ReactDOM.render(suggestionComponent, container);
});

Action('open feedback popup', async (suggestion) => {
  const body = lastElementWithSelector('body');
  const feedbackComponent = React.createElement(FeedbackPopup);
  const container = document.createElement('div');

  body.appendChild(container);
  ReactDOM.render(feedbackComponent, container);
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
      if (await Settings.get('requestPromptSuggestions')) {
        await callBackgroundScript('send answer to backend', htmlToCopyableText(answerElem.innerHTML));
      }
    }
  };

  setInterval(awaitAnswerFinish, 100);
}

async function addCopyButtons() {
  let elems = document.querySelectorAll('.markdown.prose.w-full.break-words');
  //let elems = document.querySelectorAll('.text-base');
  elems.forEach((elem) => {
    if (elem.classList.contains('result-streaming')) {
      return;
    }
    // Check if the Suggestion component has already been appended
    if (elem.hasAttribute('data-has-copy-button')) {
      return;
    }
    const buttonComponent = React.createElement(CopyButton, {
      buttonText: htmlToCopyableText(elem.innerHTML),
      onCopy: () => {}
    });
    const container = document.createElement('div');

    elem.appendChild(container);
    ReactDOM.render(buttonComponent, container);

    // Set the custom attribute to indicate that the Suggestion component has been appended
    elem.setAttribute('data-has-copy-button', 'true');
  });
}

setInterval(addCopyButtons, 100);

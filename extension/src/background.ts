import Action from './lib/Action.ts';
import callBackend from './lib/callBackend.ts';
import { callContentScript } from './lib/messagingApi.ts';

export {};

Action('send answer to backend', async (data) => {
  const result = await callBackend('post', '/processResult', { content: data });
  await callContentScript('display prompt suggestions', result);
});

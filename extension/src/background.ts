import Action from './lib/action.ts';
import callBackend from './lib/callBackend.ts';
import { callContentScript } from './lib/messagingApi.ts';

export {};

Action('send answer to backend', async (content) => {
  const result = await callBackend('post', '/processResult', { content });
  if (!result.suggestion){
    return;
  }
  await callContentScript('display prompt suggestions', result);
});

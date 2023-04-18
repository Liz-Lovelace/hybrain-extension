import { getHandbook } from './lib.js';

export async function matchDescriptionPrompt(resultText) {
  const handbook = await getHandbook();
  
  let promptText = 'TASK:\n\nYou\'re given an AI-generated answer and multiple descriptions that could match this answer. Determine if any of the descriptions match the answer exactly, and if so, output the tag of the matching description. If there isn\'t a description that matches exactly, output "NULL". Output "NULL" in all cases where the answer doesn\'t have a perfectly matching description.\n\n';
  promptText += 'DESCRIPTIONS:\n\n';

  for (const key in handbook.promptingSuggestions) {
    const criteria = handbook.promptingSuggestions[key].criteria;
    promptText += `${key}:\n${criteria}\n\n`;
  }

  //promptText += `EXAMPLES:\n\n`;

  promptText += `ANSWER:\n\n${resultText}`;

  return promptText;
}

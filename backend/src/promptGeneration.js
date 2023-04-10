import { getHandbook } from './lib.js';

export async function matchDescriptionPrompt(resultText) {
  const handbook = await getHandbook();
  
  let promptText = `TASK:\n\nYou're given an AI-generated answer and multiple descriptions that could match this answer. Determine if any of the descriptions match the answer very close9ly, and if so, output the tag of the description. If there isn't a description that matches, output "NULL". Output "NULL" unless you're absolutely confident the answer matches the description.\n\n`;
  promptText += `DESCRIPTIONS:\n\n`;

  for (const key in handbook.promptingSuggestions) {
    const criteria = handbook.promptingSuggestions[key].criteria;
    promptText += `${key}:\n${criteria}\n\n`;
  }

  //promptText += `EXAMPLES:\n\n`;

  promptText += `ANSWER:\n\n${resultText}`;

  return promptText;
}

import { Configuration, OpenAIApi } from "openai";
import findConfig from 'find-config'
import * as dotenv from 'dotenv'

dotenv.config({path: findConfig('.env')});

const configuration = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function askAI(prompt) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": prompt}], 
    max_tokens: 70,
    temperature: 0,
  });
  console.log('used', response.data.usage.total_tokens, 'tokens for response:')
  console.log(response.data.choices[0].message.content)
  return response.data.choices[0].message.content.trim()
}
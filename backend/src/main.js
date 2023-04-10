import moment from 'moment';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import bodyParser from 'body-parser';
import { matchDescriptionPrompt } from './promptGeneration.js';
import { askAI } from './openAiApi.js';
import { getHandbook, findMatchingSuggestionCase, writeDebugFile } from './lib.js'

const app = express();
const port = 3000;


const prompts = yaml.load(fs.readFileSync(new URL('../prompts.yaml', import.meta.url), 'utf8'));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
}));

app.use(bodyParser.json());

app.get('/test', async (req, res) => {
  console.log(`received a request to /test at ${moment()}`)
  res.send('ok');
});

app.get('/prompts', async (req, res) => {
  console.log(`received a request to /prompts at ${moment()}`)
  res.send(JSON.stringify(prompts));
});

app.post('/processResult', async (req, res) => {
  console.log(`received a request to /processResult at ${moment()}`);
  const divContent = req.body.content;

  const handbook = await getHandbook();

  let prompt = await matchDescriptionPrompt(divContent);

  if (prompt.length > 4 * 3000) {
    console.log('prompt too long, not processing it')
    res.send({
      suggestion: null,
      prompt: null
    });
    return;
  };

  let answer = await askAI(prompt)

  let result = await findMatchingSuggestionCase(answer)


  if (!result){
    res.send({
      suggestion: null,
      prompt: null
    });
    return;
  }

  writeDebugFile('lastSuggestionPrompt.txt', `${prompt}\n\n${result.criteria}`)

  res.send({
    suggestion: result.suggestion,
    prompt: result.prompt,
  });
});

app.listen(port, () => {
  console.log(`App listening on  http://localhost:${port}`);
});

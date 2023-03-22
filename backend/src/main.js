import moment from 'moment';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';

const app = express();
const port = 3000;


const prompts = yaml.load(fs.readFileSync(new URL('../prompts.yaml', import.meta.url), 'utf8'));

app.use(cors({
  origin: '*',
  methods: 'GET',
}));

app.get('/test', async (req, res) => {
  console.log(`received a request to /test at ${moment()}`)
  res.send('ok');
});

app.get('/prompts', async (req, res) => {
  console.log(`received a request to /prompts at ${moment()}`)
  res.send(JSON.stringify(prompts));
});

app.listen(port, () => {
  console.log(`App listening on  http://localhost:${port}`);
});

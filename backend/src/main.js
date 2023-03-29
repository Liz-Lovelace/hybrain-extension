import moment from 'moment';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import yaml from 'js-yaml';
import bodyParser from 'body-parser';

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

  console.log(divContent);

  res.send({ message: `GOT: ${divContent}` });
});

app.listen(port, () => {
  console.log(`App listening on  http://localhost:${port}`);
});

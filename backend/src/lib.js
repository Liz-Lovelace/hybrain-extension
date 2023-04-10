import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

export async function getHandbook() {
  const handbookPath = relativePath('handbook.yaml');
  const fileContents = await fs.promises.readFile(handbookPath, 'utf8');
  return yaml.load(fileContents);
}

export async function findMatchingSuggestionCase(str) {
  const handbook = await getHandbook();
  const suggestions = handbook.promptingSuggestions;

  for (const key in suggestions) {
    if (str.includes(key)) {
      return suggestions[key];
    }
  }
  return null;
}

export async function writeDebugFile(fileName, content) {
  await fs.promises.writeFile(relativePath(`debug/${fileName}`), content);
}

export function relativePath(relativePath) {
  const currentUrl = new URL(import.meta.url);
  const absolutePath = path.resolve(currentUrl.pathname, '..', '..', '..', relativePath);
  return new URL(`file://${absolutePath}`);
}


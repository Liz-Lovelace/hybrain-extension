export default function (text, template) {
  return template.replace('{PROMPT}', text);
}

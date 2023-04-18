// Import the necessary packages
import { NodeHtmlMarkdown } from 'node-html-markdown';

// Function to convert HTML to Markdown
export default function convertHtmlToMarkdown(html: string): string {
  // Convert the HTML string to Markdown using the node-html-markdown package
  const markdown = NodeHtmlMarkdown.translate(html);

  // Remove all occurrences of the string "Copy code" from the markdown
  const cleanedMarkdown = markdown.replace(/Copy code/g, '');

  // Return the cleaned Markdown
  return cleanedMarkdown;
}

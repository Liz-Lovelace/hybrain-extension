import React from 'react';
import styles from './Prompt.module.css';
import callContentScript from '../lib/callContentScript.ts';
import Tag from './Tag.tsx';

// interface PromptProps {
//   promptName: string;
//   prompt: {
//     prompt: string;
//     tags: {
//       title: string;
//       color: string;
//     }[];
//   };
// }

function Prompt ({ promptName, prompt }) {
  console.log(prompt, promptName)
  return (
    <li
      className={styles.listItem}
      onClick={async () => {
        await callContentScript('insert prompt', prompt.prompt);
      }}>
      {promptName}
      <div className={styles.tagContainer}>
        {prompt.tags.map((tag, index) => (
          <Tag key={index} title={tag.title} color={tag.color} />
        ))}
      </div>
    </li>
  );
};

export default Prompt;

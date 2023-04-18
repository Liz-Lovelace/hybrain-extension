import React, { useEffect, useState } from 'react';
import Toggle from 'react-toggle';

import { Settings } from '../../lib/settings.ts';
import globalStyles from '../GlobalStyles.module.css';
import styles from './PopupMenu.module.css';

import 'react-toggle/style.css';

const PromptSuggestions = () => {
  const [isToggled, setIsToggled] = useState(Settings.getDefault('requestPromptSuggestions'));

  useEffect(() => {
    const fetchToggleState = async () => {
      const toggleState = await Settings.get('requestPromptSuggestions');
      console.log(isToggled, '->', toggleState);
      setIsToggled(toggleState);
    };
    fetchToggleState();
  }, []);

  const handleToggle = async () => {
    let newToggleState = !isToggled;
    setIsToggled(newToggleState);
    await Settings.set('requestPromptSuggestions', newToggleState);
  };

  const handleFeedbackClick = () => {
    browser.tabs.create({
      url: 'https://forms.gle/G27EFwaGGnC2XPN18'
    });
  };

  return (
    <div className={`${globalStyles.container} ${styles.popupMenu}`}>
      <div className={styles.toggleWrapper}>
        <label htmlFor="toggle">Prompt suggestions</label>
        <Toggle className={styles.toggle} id="toggle" checked={isToggled} onChange={handleToggle} />
      </div>
      <button onClick={handleFeedbackClick} className={`${globalStyles.button} ${styles.feedbackButton}`}>
        Send feedback!
      </button>
    </div>
  );
};

export default PromptSuggestions;

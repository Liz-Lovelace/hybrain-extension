import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import CategoryList from './components/CategoryList';
import useFetchData from './lib/useFetchedData.ts';

function IndexPopup() {
  const { data, error, loading } = useFetchData('http://localhost:3000/prompts');
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return 'No data!';
  }
  const categories = JSON.parse(data).data;
  let promptChooserFunction = async (prompt) => {
    await callContentScriptFunction('callFunction', prompt);
  };
  return <CategoryList categories={categories} promptChooserFunction={promptChooserFunction} />;
}

function callContentScriptFunction(action, prompt) {
  // Send a message to the content script
  browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    browser.tabs.sendMessage(tabs[0].id, { action, data: prompt });
  });
}

export default IndexPopup;

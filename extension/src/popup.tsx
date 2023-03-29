import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import CategoryList from './components/popup/CategoryList';
import { callBackgroundScript, callContentScript } from './lib/messagingApi.ts';
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
  return <CategoryList categories={categories} />;
}

export default IndexPopup;

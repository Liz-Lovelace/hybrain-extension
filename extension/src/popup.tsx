import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import CategoryList from './components/CategoryList';
import useFetchData from './lib/useFetchedData.ts';
import callContentScript from './lib/callContentScript.ts';

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

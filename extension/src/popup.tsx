import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import CategoryList from './components/popup/CategoryList';
import PopupMenu from './components/popupMenu/PopupMenu';
import { callBackgroundScript, callContentScript } from './lib/messagingApi.ts';
import useFetchData from './lib/useFetchedData.ts';

function OldPopup() {
  const { data, error, loading } = useFetchData('http://localhost:3000/prompts');
  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return 'No data!';
  }
  const categories = JSON.parse(data).data;
  callContentScript('display prompt suggestions', "stuff")
  return <CategoryList categories={categories} />;
}

export default function(){
  return <>
    <PopupMenu />
  </>
};

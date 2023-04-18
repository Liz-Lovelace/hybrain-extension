import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

import PopupMenu from './components/popupMenu/PopupMenu';
import { callBackgroundScript, callContentScript } from './lib/messagingApi.ts';
import useFetchData from './lib/useFetchedData.ts';

import 'chrome-browser-object-polyfill';

export default function () {
  // callContentScript('display prompt suggestions', {
  //   suggestion: 'Hello',
  //   prompt: 'bean',
  // });
  return <PopupMenu />;
}

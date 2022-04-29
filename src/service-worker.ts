/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';

declare const self: ServiceWorkerGlobalScope & { __WB_MANIFEST: unknown };
// keep self.__WB_MANIFEST somewhere in your file, as the Workbox compilation plugin checks for this value when generating a manifest of URLs to precache.
// eslint-disable-next-line
const _ = self.__WB_MANIFEST;

clientsClaim();

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.

(()=>{"use strict";var e={923:()=>{try{self["workbox:core:5.1.4"]&&_()}catch(e){}},190:()=>{try{self["workbox:expiration:5.1.4"]&&_()}catch(e){}},437:()=>{try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}},185:()=>{try{self["workbox:routing:5.1.4"]&&_()}catch(e){}},833:()=>{try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{s(923);const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const n=new Set;const a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},r=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),i=e=>e||r(a.precache),c=e=>e||r(a.runtime);const o=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),""),h=(e,t)=>e.filter((e=>t in e)),l=async({request:e,mode:t,plugins:s=[]})=>{const n=h(s,"cacheKeyWillBeUsed");let a=e;for(const r of n)a=await r.cacheKeyWillBeUsed.call(r,{mode:t,request:a}),"string"===typeof a&&(a=new Request(a));return a},u=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const r=await self.caches.open(e),i=await l({plugins:a,request:t,mode:"read"});let c=await r.match(i,n);for(const o of a)if("cachedResponseWillBeUsed"in o){const t=o.cachedResponseWillBeUsed;c=await t.call(o,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:i})}return c},d=async({cacheName:e,request:s,response:a,event:r,plugins:i=[],matchOptions:c})=>{const d=await l({plugins:i,request:s,mode:"write"});if(!a)throw new t("cache-put-with-no-response",{url:o(d.url)});const p=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,r=!1;for(const i of n)if("cacheWillUpdate"in i){r=!0;const t=i.cacheWillUpdate;if(a=await t.call(i,{request:e,response:a,event:s}),!a)break}return r||(a=a&&200===a.status?a:void 0),a||null})({event:r,plugins:i,response:a,request:d});if(!p)return void 0;const f=await self.caches.open(e),g=h(i,"cacheDidUpdate"),m=g.length>0?await u({cacheName:e,matchOptions:c,request:d}):null;try{await f.put(d,p)}catch(w){throw"QuotaExceededError"===w.name&&await async function(){for(const e of n)await e()}(),w}for(const t of g)await t.cacheDidUpdate.call(t,{cacheName:e,event:r,oldResponse:m,newResponse:p,request:d})},p=u;let f;function g(e){e.then((()=>{}))}class m{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise(((e,t)=>{let s=!1;setTimeout((()=>{s=!0,t(new Error("The open request was blocked and timed out"))}),this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"===typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}})),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map((e=>e.key))}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",((i,c)=>{const o=i.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(r?e:e.value),a&&l.length>=a?c(l):e.continue()):c(l)}}))}async transaction(e,t,s){return await this.open(),await new Promise(((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,(e=>n(e)))}))}async _call(e,t,s,...n){return await this.transaction([t],s,((s,a)=>{const r=s.objectStore(t),i=r[e].apply(r,n);i.onsuccess=()=>a(i.result)}))}close(){this._db&&(this._db.close(),this._db=null)}}m.prototype.OPEN_TIMEOUT=2e3;const w={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[s,J]of Object.entries(w))for(const e of J)e in IDBObjectStore.prototype&&(m.prototype[e]=async function(t,...n){return await this._call(e,t,s,...n)});const y=async({request:e,fetchOptions:s,event:n,plugins:a=[]})=>{if("string"===typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const r=h(a,"fetchDidFail"),i=r.length>0?e.clone():null;try{for(const t of a)if("requestWillFetch"in t){const s=t.requestWillFetch,a=e.clone();e=await s.call(t,{request:a,event:n})}}catch(o){throw new t("plugin-error-request-will-fetch",{thrownError:o})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of a)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(l){0;for(const e of r)await e.fetchDidFail.call(e,{error:l,event:n,originalRequest:i.clone(),request:c.clone()});throw l}};async function _(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,r=function(){if(void 0===f){const t=new Response("");if("body"in t)try{new Response(t.body),f=!0}catch(e){f=!1}f=!1}return f}()?s.body:await s.blob();return new Response(r,a)}s(190);const R="cache-entries",v=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class x{constructor(e){this._cacheName=e,this._db=new m("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore(R,{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise(((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}}))})(this._cacheName)}async setTimestamp(e,t){const s={url:e=v(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put(R,s)}async getTimestamp(e){return(await this._db.get(R,this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction(R,"readwrite",((s,n)=>{const a=s.objectStore(R).index("timestamp").openCursor(null,"prev"),r=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else n(r)}})),n=[];for(const a of s)await this._db.delete(R,a.id),n.push(a.url);return n}_getId(e){return this._cacheName+"|"+v(e)}}class q{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new x(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const n of t)await s.delete(n);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,g(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}s(437);const U=[],b={get:()=>U,add(e){U.push(...e)}};function T(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),r=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:r.href}}class E{constructor(e){this._cacheName=i(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const s=[];for(const n of e){"string"===typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=T(n),r="string"!==typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!==typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),r=await a.keys(),i=new Set(r.map((e=>e.url)));for(const[o,h]of this._urlsToCacheKeys)i.has(h)?n.push(o):s.push({cacheKey:h,url:o});const c=s.map((({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),r=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:r,event:e,integrity:a,plugins:t,url:n})}));await Promise.all(c);return{updatedURLs:s.map((e=>e.url)),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:s,cacheMode:n,event:a,plugins:r,integrity:i}){const c=new Request(s,{integrity:i,cache:n,credentials:"same-origin"});let o,h=await y({event:a,plugins:r,request:c});for(const t of r||[])"cacheWillUpdate"in t&&(o=t);if(!(o?await o.cacheWillUpdate({event:a,request:c,response:h}):h.status<400))throw new t("bad-precaching-response",{url:s,status:h.status});h.redirected&&(h=await _(h)),await d({event:a,plugins:r,response:h,request:e===s?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this._cacheName,url:s instanceof Request?s.url:s})}catch(n){if(e)return fetch(s);throw n}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),a=new Request(e);return()=>n({request:a})}}let L;const N=()=>(L||(L=new E),L);const K=(e,t)=>{const s=N().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let C=!1;function M(e){C||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=i();self.addEventListener("fetch",(r=>{const i=K(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!i)return;let c=self.caches.open(a).then((e=>e.match(i))).then((e=>e||fetch(i)));r.respondWith(c)}))})(e),C=!0)}const O=e=>{const t=N(),s=b.get();e.waitUntil(t.install({event:e,plugins:s}).catch((e=>{throw e})))},A=e=>{const t=N();e.waitUntil(t.activate())};s(185);const S=e=>e&&"object"===typeof e?e:{handle:e};class W{constructor(e,t,s="GET"){this.handler=S(t),this.match=e,this.method=s}}class k extends W{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class D{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((e=>{"string"===typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let r=a&&a.handler;if(!r&&this._defaultHandler&&(r=this._defaultHandler),!r)return void 0;let i;try{i=r.handle({url:s,request:e,event:t,params:n})}catch(c){i=Promise.reject(c)}return i instanceof Promise&&this._catchHandler&&(i=i.catch((n=>this._catchHandler.handle({url:s,request:e,event:t})))),i}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n;const r=a.match({url:e,request:t,event:s});if(r)return n=r,(Array.isArray(r)&&0===r.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"===typeof r)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=S(e)}setCatchHandler(e){this._catchHandler=S(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let I;const P=()=>(I||(I=new D,I.addFetchListener(),I.addCacheListener()),I);function H(e,s,n){let a;if("string"===typeof e){const t=new URL(e,location.href);0;a=new W((({url:e})=>e.href===t.href),s,n)}else if(e instanceof RegExp)a=new k(e,s,n);else if("function"===typeof e)a=new W(e,s,n);else{if(!(e instanceof W))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return P().registerRoute(a),a}s(833);const F={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};var B;Boolean("localhost"===globalThis.location.hostname||"[::1]"===globalThis.location.hostname||globalThis.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)),null===(B="88e7e92fc8b496d449477aa837a7bbf7e883813b")||B.slice(0,6);const j="/memlog";var $;self.addEventListener("activate",(()=>self.clients.claim())),function(e){N().addToCacheList(e),e.length>0&&(self.addEventListener("install",O),self.addEventListener("activate",A))}([{'revision':'f7d3b72860684e073811232c2c037a1a','url':'/memlog/index.html'},{'revision':null,'url':'/memlog/static/css/main.1a7488ce.css'},{'revision':null,'url':'/memlog/static/js/377.81b25707.chunk.js'},{'revision':null,'url':'/memlog/static/js/main.b3774294.js'}]),M($);const G=new RegExp("/[^/?]+\\.[^/]+$");var Q;H((({request:e,url:t})=>"navigate"===e.mode&&(!t.pathname.startsWith("/_")&&!t.pathname.match(G))),(Q=j+"/index.html",N().createHandlerBoundToURL(Q))),H((({url:e})=>e.origin===self.location.origin&&e.pathname.endsWith(".png")),new class{constructor(e={}){if(this._cacheName=c(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[F,...e.plugins]}else this._plugins=[F];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:s}){"string"===typeof s&&(s=new Request(s));const n=this._getFromNetwork({request:s,event:e});let a,r=await p({cacheName:this._cacheName,request:s,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(r){if(e)try{e.waitUntil(n)}catch(a){0}}else{0;try{r=await n}catch(i){a=i}}if(!r)throw new t("no-response",{url:s.url,error:a});return r}async _getFromNetwork({request:e,event:t}){const s=await y({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=d({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(a){0}return s}}({cacheName:"images",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);g(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(c){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),n.add(t))}_getCacheExpiration(e){if(e===c())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new q(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}({maxEntries:50})]})),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}))})()})();
//# sourceMappingURL=service-worker.js.map
import { ENV } from './environments';

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
};

const logged: string[] = [];
const log = (message: string, ...args: any[]) => {
  const newMessage = args.length === 0 ? `[dev] ${message}` : args.length === 1 ? `[dev] ${message}: ${JSON.stringify(args.at(0))}` : `[dev] ${message}: ${JSON.stringify(args)}`;
  logged.push(newMessage);
  console.log(newMessage);
  const e = document.querySelector<HTMLPreElement>('#devlog');
  if (e) {
    e.innerText = logged.join('\n');
  }
};

const subscribeLogsFromServiceWorker = () => {
  navigator.serviceWorker.addEventListener('message', (event) => {
    log('service-worker message', event.data);
  });
};

log('app environments', ENV);
log('start url', window.location.href);

export function register(config?: Config) {
  if (ENV.isProduction) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(ENV.publicURL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      log(
        "Our service worker won't work if PUBLIC_URL is on a different origin from what our page is served on. This might happen if a CDN is used to serve assets; see https://github.com/facebook/create-react-app/issues/2374",
      );
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${ENV.publicURL}/service-worker.js`;

      if (ENV.isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          log('This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA');
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

const getRegistrationStatus = (reg: ServiceWorkerRegistration) => {
  return {
    active: Boolean(reg.active),
    installing: Boolean(reg.installing),
    waiting: Boolean(reg.waiting),
    scope: reg.scope,
  };
};

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl, { scope: '/memlog/' })
    .then((registration) => {
      log('service worker registered', getRegistrationStatus(registration));

      subscribeLogsFromServiceWorker();

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              log('New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA.');

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              log('Content is cached for offline use.');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      log('Error during service worker registration', { error });
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get('content-type');
      if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      log('No internet connection found. App is running in offline mode.');
    });
}

export async function unregister() {
  try {
    const registration = await navigator.serviceWorker.ready;
    log('start service worker unregister', getRegistrationStatus(registration));
    const result = await registration.unregister();
    log('service worker unregistered', { result });
  } catch (e) {
    log('failed to unregister serviceworker', e);
  }
}

// TODO(refactor):
const handleQueryParamsFromShareTargetAPI = () => {
  const params = Array.from(new URLSearchParams(window.location.search).entries());
  log('query params', params);
};
handleQueryParamsFromShareTargetAPI();

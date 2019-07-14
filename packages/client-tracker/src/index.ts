/**
 * The URL that the client-tracker POSTs to.
 * This is set when init() is called
 */
let trackingUrl: string;

/**
 * Check if DoNotTrack is enabled (and supported by the browser)
 * inspired by https://dev.to/corbindavenport/how-to-correctly-check-for-do-not-track-with-javascript-135d by @corbindavenport
 */
const isDoNotTrackEnabled = (): boolean => {
  // first check if the browser supports DoNotTrack
  if (
    !window.doNotTrack &&
    !navigator.doNotTrack &&
    // @ts-ignore - old MS vendor prefix not in typings
    !navigator.msDoNotTrack
  ) {
    return false;
  }

  if (
    window.doNotTrack == '1' ||
    navigator.doNotTrack == 'yes' ||
    navigator.doNotTrack == '1' ||
    // @ts-ignore - old MS vendor prefix not in typings
    navigator.msDoNotTrack == '1'
  ) {
    return true;
  } else {
    return false;
  }
};

export type AnonyticsTracker = (
  eventType: string,
  context?: Record<string, string>,
) => Promise<void>;

/**
 * Tracks an event to the anonytics server
 * @param {string} eventType any string represeting the type of the event, eg. 'click'
 * @param {object} [context] an object with any extra context information to send, such as button action
 */
export const track: AnonyticsTracker = async (
  eventType,
  context,
): Promise<void> => {
  if (!trackingUrl) {
    throw new Error(
      'Cannot track an Anonytics event before it has been initialized. Please invoke init() one time before tracking first.',
    );
  }
  if (isDoNotTrackEnabled()) {
    return;
  }

  fetch(trackingUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventType,
      context,
    }),
  });
};

interface AnonyticsInitializerConfig {
  host: string;
  path?: string;
  ignorePageLoad?: boolean;
  disableHttpsAndUseInsecureHttp?: boolean;
}
export type AnonyticsInitializer = (
  config: AnonyticsInitializerConfig,
) => Promise<void>;

/**
 * Initializer function that must be invoked once before any tracking can occur
 * @param {string} config.host the host to track the events to, eg. 'localhost' or 'mywebsite.io'
 * @param {string} [config.path='/'] an optional path the anonytics server is listening on, eg. '/anonytics'
 * @param {boolean} [config.disableHttpsAndUseInsecureHttp=false] during development, track events over HTTP instead of HTTPS
 * @param {boolean} [config.ignorePageLoad=false] set this to true to disable auto tracking a 'pageLoad' event immediately after initialization
 */
export const init: AnonyticsInitializer = async ({
  host,
  path = '/anonytics/track',
  ignorePageLoad = false,
  disableHttpsAndUseInsecureHttp = false,
}): Promise<void> => {
  const protocol = disableHttpsAndUseInsecureHttp ? 'http' : 'https';
  trackingUrl = `${protocol}://${host}${
    path.startsWith('/') ? '' : '/'
  }${path}`;

  if (!ignorePageLoad) {
    track('pageLoad', { pathname: location.pathname });
  }
};

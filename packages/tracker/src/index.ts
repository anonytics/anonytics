export type AnonyticsTracker = (
  eventType: string,
  context?: Record<string, string>,
) => Promise<void>;

// export default class AnonyticsTrackerClass {
//   public static lol(): void {
//     console.log('hello');
//   }
// }

/**
 * The URL that the tracker POSTs to.
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

export const track: AnonyticsTracker = async (
  eventType,
  context,
): Promise<void> => {
  if (!trackingUrl) {
    throw new Error(
      'Cannot track an Anonytics event before it has been initialized. Please invoke the init() one time before tracking first.',
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
  disableHttpsAndUseInsecureHttp?: boolean;
  ignorePageLoad?: boolean;
}
export type AnonyticsInitializer = (
  config: AnonyticsInitializerConfig,
) => Promise<void>;

export const init: AnonyticsInitializer = async ({
  host,
  path = '/',
  disableHttpsAndUseInsecureHttp = false,
  ignorePageLoad = false,
}): Promise<void> => {
  const protocol = disableHttpsAndUseInsecureHttp ? 'http' : 'https';
  trackingUrl = `${protocol}://${host}${
    path.startsWith('/') ? '' : '/'
  }${path}`;

  if (!ignorePageLoad) {
    track('pageLoad', { pathname: location.pathname });
  }
};

export type AnonyticsTracker = (
  eventType: string,
  context?: Record<string, string>,
) => Promise<void>;

// export default class AnonyticsTrackerClass {
//   public static lol(): void {
//     console.log('hello');
//   }
// }

let trackingUrl: string;

export const track: AnonyticsTracker = async (
  eventType,
  context,
): Promise<void> => {
  console.log(trackingUrl);
  if (!trackingUrl) {
    throw new Error(
      'Cannot track an Anonytics event before it has been initialized. Please invoke the init() one time before tracking first.',
    );
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
  trackingUrl = `${protocol}://${host}${path}`;

  if (!ignorePageLoad) {
    track('pageLoad', { pathname: location.pathname });
  }
};

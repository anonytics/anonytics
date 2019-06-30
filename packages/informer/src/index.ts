export type AnonyticsInformer = (
  eventType: string,
  context?: Record<string, string>,
) => Promise<void>;

export const anon: AnonyticsInformer = async (
  eventType,
  context,
): Promise<void> => {
  if (eventType === 'pageLoad') {
    console.log('LOG PAGE LOAD', context);
    return;
  }
  console.log('LOG INTERACTION', context);
};

interface AnonyticsInitializerConfig {
  host: string;
  secret: string;
  ignorePageLoad?: boolean;
}

export type AnonyticsInitializer = ({
  host: hostname,
  secret,
  ignorePageLoad,
}: AnonyticsInitializerConfig) => Promise<void>;
export const initAnon: AnonyticsInitializer = async ({
  host,
  secret,
  ignorePageLoad = false,
}): Promise<void> => {
  console.log('LOG initing with:', host, secret);
  if (!ignorePageLoad) {
    anon('pageLoad');
  }
};

window.anon = anon;
window.initAnon = initAnon;

declare global {
  interface Window {
    anon: AnonyticsInformer;
    initAnon: AnonyticsInitializer;
  }
}

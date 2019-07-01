export type AnonyticsInformer = (
  eventType: string,
  context?: Record<string, string>,
) => Promise<void>;

export const inform: AnonyticsInformer = async (
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
  host,
  secret,
  ignorePageLoad,
}: AnonyticsInitializerConfig) => Promise<void>;
export const init: AnonyticsInitializer = async ({
  host,
  secret,
  ignorePageLoad = false,
}): Promise<void> => {
  console.log('LOG initing with:', host, secret);
  if (!ignorePageLoad) {
    inform('pageLoad');
  }
};

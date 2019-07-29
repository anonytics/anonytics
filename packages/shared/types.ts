export type TrackingRequest = {
  eventType: string;
  context?: {
    [key: string]: string;
  };
};

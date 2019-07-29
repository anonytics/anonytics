import { TrackingRequest } from '../shared/types';

export const isTrackingRequestBody = (
  body: unknown,
): body is TrackingRequest => {
  const trackingRequestBody = body as TrackingRequest;
  if (typeof trackingRequestBody.eventType !== 'string') {
    return false;
  }
  if (trackingRequestBody.context) {
    for (const key in trackingRequestBody.context) {
      if (
        typeof key !== 'string' ||
        typeof trackingRequestBody.context[key] !== 'string'
      ) {
        return false;
      }
    }
  }
  return true;
};

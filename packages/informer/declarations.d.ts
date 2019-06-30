import { AnonyticsInformer } from './src';

declare global {
  interface Window {
    anon: AnonyticsInformer;
  }
}

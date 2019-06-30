export const anon: AnonyticsInformer = async (eventType, context) => {
  if (eventType === EventType.PageLoad) {
    console.log('LOG PAGE LOAD');
    return;
  }
  if (eventType === EventType.Interaction) {
    console.log('LOG INTERACTION');
    return;
  }
};
window.anon = anon;

export type AnonyticsInformer = (
  eventType: EventType,
  context: Record<string, string>,
) => Promise<void>;

enum EventType {
  PageLoad = 'pageLoad',
  Interaction = 'interaction',
}

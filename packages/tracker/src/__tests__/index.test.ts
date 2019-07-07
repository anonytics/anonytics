// import { init, track } from '..';
import { GlobalWithFetchMock } from 'jest-fetch-mock';
import { AnonyticsTracker, AnonyticsInitializer } from '..';

describe('Tracker', () => {
  const mockFunction = jest.fn();

  const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
  customGlobal.fetch = require('jest-fetch-mock');
  customGlobal.fetchMock = customGlobal.fetch;

  /*
  Defining our imports here, lets us dynamically import them in the 
  beforeEach below. That allows us to reset the module between each test,
  to make sure state in the module doesn't leak between tests
  */
  let init: AnonyticsInitializer;
  let track: AnonyticsTracker;
  beforeEach(async () => {
    jest.resetModules();
    ({ init, track } = await import('..'));
  });

  it('should track a page load and a basic event to the host given at initialization', async () => {
    // Arrange - mock current location and initialize tracking
    window.history.pushState(
      {},
      'Test Title',
      '/some/path#at-hash?with=queryparam',
    );
    init({ host: 'localhost' });
    const testEventContext = { testKey: 'testValue' };

    // Assert - page load has been sent to server with pathname
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('https://localhost/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType: 'pageLoad',
        context: {
          pathname: '/some/path',
        },
      }),
    } as RequestInit);

    // Act - track an event
    await track('testEvent', testEventContext);

    // Assert - event has been sent to server
    expect(fetchMock).toBeCalledTimes(2);
    expect(fetchMock).nthCalledWith(2, 'https://localhost/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType: 'testEvent',
        context: testEventContext,
      }),
    } as RequestInit);
  });

  it("should not track a page load when initializing with 'ignorePageLoad' parameter", async () => {
    // Arrange - initialize with 'ignorePageLoad'
    init({ host: 'localhost', ignorePageLoad: true });

    // Assert - page load has not been sent to server
    expect(fetchMock).not.toBeCalled();
  });

  it("should track to other endpoint when 'path' parameter is passed", async () => {
    // Arrange - initialize with non-default 'path' set
    init({
      host: 'localhost',
      path: '/some/sub-endpoint',
      ignorePageLoad: true,
    });

    // Act - track an event
    await track('testEvent');

    // Assert - event has been sent to server at specific path
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith('https://localhost/some/sub-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType: 'testEvent',
      }),
    } as RequestInit);
  });

  it('should throw if trying to track without initializing first', async () => {
    // Act & Assert - track an event and expect it to throw because Anonytics has not been initialized
    await expect(track('testEvent')).rejects.toThrowError(
      'Cannot track an Anonytics event before it has been initialized. Please invoke the init() one time before tracking first.',
    );
  });

  it('should not track anything if the DoNotTrack flag is set', async () => {
    // Arrange - initialize and set DoNotTrack flag
    init({
      host: 'localhost',
      ignorePageLoad: true,
    });

    // Arrange - set DoNotTrack (Safari, Edge, IE11)
    //@ts-ignore
    window.doNotTrack = '1';

    // Act - track an event
    await track('testEvent');

    // Assert - nothing was sent to server because DoNotTrack is set (Safari, Edge, IE11)
    expect(fetchMock).not.toBeCalled();

    // Arrange - set DoNotTrack (Chrome, Firefox)
    //@ts-ignore
    window.doNotTrack = undefined;
    //@ts-ignore
    navigator.doNotTrack = '1';

    // Act - track an event
    await track('testEvent');

    // Assert - nothing was sent to server because DoNotTrack is set (Chrome, Firefox)
    expect(fetchMock).not.toBeCalled();

    // Arrange - set DoNotTrack (IE10)
    //@ts-ignore
    navigator.doNotTrack = undefined;
    //@ts-ignore
    navigator.msDoNotTrack = '1';

    // Act - track an event
    await track('testEvent');

    // Assert - nothing was sent to server because DoNotTrack is set (IE10)
    expect(fetchMock).not.toBeCalled();
  });

  /*
  The following to tests make sure that jest configurations are inherited from 'jest.config.base.js' in the root dir
  by checking that the mock function is cleared between tests 
   */
  it("should use 'clearMocks' configuration from base jest config", () => {
    mockFunction();
  });
  it("should use 'clearMocks' configuration from base jest config", () => {
    mockFunction();
    // if the mock hadn't been cleared, it would have been called two times by now
    expect(mockFunction).toBeCalledTimes(1);
  });
});

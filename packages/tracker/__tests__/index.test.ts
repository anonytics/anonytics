const someMock = jest.fn();
describe('Tracker', () => {
  it('should work', () => {
    someMock();
    expect(someMock).toBeCalledTimes(1);
    expect(true).toBeTruthy();
  });
  it('should still work', () => {
    someMock();
    expect(someMock).toBeCalledTimes(1);
    expect(true).toBeTruthy();
  });
});

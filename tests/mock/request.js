/**
 * @param mock - Accepts the mocked lib
 * */
const mockImplementation = mock => {
  const send = jest.fn();
  const set  = jest.fn(() => ({ send }));
  mock.mockImplementation(() => ({ set }));
  return {
    headers: set,
    payload: send,
    request: {
      mockResolvedValue(value) {
        send.mockResolvedValue({
          body: value
        });
      },
      mockReset() {
        send.mockReset();
      }
    }
  };
};

module.exports = {
  mockImplementation
};
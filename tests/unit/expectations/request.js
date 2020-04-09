const expectRequestHeaders = (setHeadersFn, appToken) => {
  expect(setHeadersFn).toHaveBeenCalledWith({
    'Content-Type' : 'application/json',
    'Authorization': 'Bearer ' + appToken
  });
}

module.exports = {
  expectRequestHeaders
};
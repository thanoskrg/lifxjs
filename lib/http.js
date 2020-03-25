const superagent = require('superagent');

const Http = (function () {

  let _headers;

  // function request(path, method, data) {
  //   return new Promise((resolve, reject) => {
  //     try {
  //       console.log(_host, path)
  //       const req = http.request({
  //         host: _host,
  //         headers: _headers,
  //         path,
  //         method,
  //       }, res => {
  //         res.on('data', d => console.log(d))
  //       });
  //       req.on('error', err => {
  //         console.error('ERROR:', err.message);
  //       });
  //       req.end();
  //     } catch (ex) {
  //       console.error(ex.message);
  //     }
  //   });
  //   // let result;
  //   // try {
  //   //   const res = await http.request({

  //   //   });
  //   //   if (res.ok) {
  //   //     result = res.body;
  //   //   }
  //   // } catch (ex) {
  //   //   console.error(ex.message);
  //   // } finally {
  //   //   return result;
  //   // }
  // }

  async function request (method, url) {
    let result;
    try {
      result = await method(url)
        .set(_headers);
    } catch (ex) {
      console.error(ex);
    } finally {
      return result;
    }
  }

  function Http ({ headers = {} }) {
    _headers = headers;
  }

  Http.prototype.get = async function (resource) {
    const res = await request(superagent.get, resource);
    return res.body;
  }

  Http.prototype.put = function (resource, data) {

  }

  return Http;

}());

module.exports = Http;
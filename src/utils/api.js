class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  getStatus(pid) {
    return fetch(`${this._url}/pay/check/${pid}`, {
      headers: this._headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  saveCard(input) {
    return fetch(`${this._url}/api`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: '63671a5a-21d1-406d-b6b4',
        method: 'pay',
        params: {
          pan: input,
          expire: '12/25',
          cardholder: 'SAD SAAS',
          cvc: '213',
        },
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`error: ${res.status}`);
  }
}

const api = new Api({
  url: 'http://localhost:2050',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

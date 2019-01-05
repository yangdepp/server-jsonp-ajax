window.jQuery = () => {

}
window.jQuery.ajax = (options) => {
  // let url = options.url;
  // let method = options.method;
  // let body = options.body;
  // let successFn = options.successFn;
  // let failFn = options.failFn;

  let {url, method, body, successFn, failFn} = options;

  let request = new XMLHttpRequest()
  request.open(method, url);

  for (let key in headers) {
    let value = headers[key];
    request.setRequestHeader(key, value)
  }
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        successFn.call(undefined, request.responseText)
      } else if (request.status >= 400) {
        failFn.call(undefined, request)
      }
    }
  }
  request.send()
}

window.$ = window.jQuery

myButton.addEventListener('click', (e) => {
  window.jQuery.ajax({
    url: '/xxx',
    method: 'get',
    body: 'xxx',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'frank': 18
    },
    successFn: (respopnseText) => {
      console.log('111')
    },
    failFn: (responseText) => {
      console.log('222')
    }
  })
})
window.jQuery = () => {

}
window.jQuery.ajax = (url, method, body, successFn, failFn) => {
  let request = new XMLHttpRequest()
  request.open(method, url);

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

  let obj = {
    url: '/xxx',
    method: 'get',
    successFn: (respopnseText) => {
      console.log('111')
    },
    failFn: (responseText) => {
      console.log('222')
    }
  }
  $.ajax(obj)
})
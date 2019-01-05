// myButton.addEventListener('click', (e) => {
//   $.ajax({
//     url: '/xxx',
//     method: 'get',
//   }).then(
//       (responseText) => {
//         console.log(responseText);
//         return '第一次then成功已经处理';
//       },
//       (request) => {
//         console.log(request)
//         return '第一次then失败已经处理';
//
//       }
//   ).then(
//       (responseText) => {
//         console.log(responseText)
//       },
//       (request) => {
//         console.log(request)
//       }
//   )
// })


// 自己封装一个jquery的promise过程
window.jQuery = () => {

}
window.jQuery.ajax = ({url, method, headers}) => {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest()
    request.open(method, url);

    for (let key in headers) {
      let value = headers[key];
      request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          resolve.call(undefined, request)
        } else if (request.status >= 400) {
          reject.call(undefined, request)
        }
      }
    }
    request.send()
  })

}

window.$ = window.jQuery

myButton.addEventListener('click', (e) => {
  window.jQuery.ajax({
    url: '/xxx',
    method: 'get',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'frank': 18
    },
  }).then(
      (response) => {
        console.log(response.responseText)
      },
      (response) => {
        console.log(response)
      }
  )
})



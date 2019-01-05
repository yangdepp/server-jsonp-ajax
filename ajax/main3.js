myButton.addEventListener('click', (e) => {
  $.ajax({
    url: '/xxx',
    method: 'get',
  }).then(
      (responseText) => {
        console.log(responseText);
        return '第一次then成功已经处理';
      },
      (request) => {
        console.log(request)
        return '第一次then失败已经处理';

      }
  ).then(
      (responseText) => {
        console.log(responseText)
      },
      (request) => {
        console.log(request)
      }
  )
})
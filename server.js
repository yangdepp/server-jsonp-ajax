var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号\n例如node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    // var string = fs.readFileSync('./jsonp/index.html', 'utf-8')
    var string = fs.readFileSync('./jsonp/index2.html', 'utf-8')
    var amount = fs.readFileSync('./db', 'utf-8');
    string = string.replace('&&&amount&&&', amount)
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/pay') {
    var amount = fs.readFileSync('./db', 'utf-8');
    var newAmount = amount - 1;
    fs.writeFileSync('./db', newAmount)
    response.setHeader('content-type', 'application/javascript');
    response.statusCode = 200
    // response.write(fs.readFileSync('./img/image.png'))
    response.write(`
      // 不关心页面dom
      // 只返回一个函数
      // ${query.callback}.call(undefined, 'success')
      // 直接返回JSON
      ${query.callback}.call(undefined, {
        "success": true,
        "left": ${newAmount},
      })
    `)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('出错了')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
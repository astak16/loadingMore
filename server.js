var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/



  if(path === '/'){
	response.setHeader('Content-Type','text/html;charset=utf-8')
	response.statusCode = 200
  	response.write('哈哈')
	response.end()
  }else if(path === '/xxx' && method === 'GET'){
  	console.log(1)
	response.setHeader('Content-Type','text/json','http://frank.com:8889')
	response.statusCode = 200

	  let currentIndex = parsedUrl.query.currentIndex
	  console.log(currentIndex)
	  let len = parsedUrl.query.len
	  let data = []
	  for(let i = 0; i < len; i++){
	  	data.push('内容'+ (parseInt(currentIndex)+i))
	  }
	response.write(JSON.stringify(data))
	response.end()
  }else if(path === '/index.html'){
 	let string = fs.readFileSync('./index.html','utf8')
	response.setHeader('Content-Type','text/html;charset=utf-8')
	response.statusCode = 200
	response.write(string)
	response.end()
  }else if(path === '/css/style.css'){
  	let string = fs.readFileSync('./css/style.css','utf-8')
	response.setHeader('Content-Type','text/css;charset=utf-8')
	response.statusCode = 200
	response.write(string)
	response.end()
  }else if(path === '/js/main.js'){
  	let string = fs.readFileSync('./js/main.js','utf8')
	response.setHeader('Content-Type','text/js;charset=utf-8')
	response.statusCode = 200
	response.write(string)
	response.end()
  }else{
	response.statusCode = 404
  	response.write('请访问正确路径')
	response.end()
  }







  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)



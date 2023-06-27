const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>enter message</title></head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on('end', () => {
      // req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(message);
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        // return res.end();
        res.end();
      });
    });
  }
  // 응답이 종료되었지만 응답 객체에 대해 또다시 헤더를 설정하려고 하므로 에러가 발생
  // return req.on('end', () => {...}설정
  //  '/' 또는 '/message'로 요청이 들어오지 않은 모든 다른 요청에 대한 처리를 담당
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>enter message</title></head>');
  res.write('<body><h1>Hello</h1></body>');
  res.write('</html>');
  return res.end();
};

module.exports = requestHandler;

// module.exports = {
//   // 객체로 보내기
//   handler: requestHandler,
//   아무텍스트 : '이야호'
// }
// 위코드는 아래와 같이 축약이 가능하다.
// exports.handler = requestHandler
// exports.아무거 = '이야호'
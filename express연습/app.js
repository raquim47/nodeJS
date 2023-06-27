const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const notFoundRoutes = require('./routes/notFound');

app.use(bodyParser.urlencoded({ extended: false }));
// express.static는 Express의 빌트인 미들웨어 함수 중 하나입니다. 이 함수는 정적 파일(HTML, CSS, 이미지, JavaScript 파일 등)을 제공하는 데 사용됩니다. 이러한 정적 파일들은 서버 사이드 로직 없이 클라이언트에 직접 전달됩니다.
app.use(express.static(path.join(__dirname, 'public')));
// app.use'는 모든 HTTP 메소드(GET, POST, PUT, DELETE 등)의 요청을 처리, 또한 'app.use'는 주어진 경로로 시작하는 모든 요청을 처리 -> 순서 중요 (또는 next()로 다음 미들웨어로 연결)

// 경로 필터링
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFoundRoutes);

app.listen(3000);

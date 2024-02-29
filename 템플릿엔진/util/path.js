const path = require('path');
module.exports = path.dirname(process.mainModule.filename);

// __dirname을 사용하면 현재 파일 (예시 'admin.js')이 있는 디렉토리를 기준으로 경로를 만든다.
// 반면에, rootDir을 사용하면 애플리케이션의 메인 모듈 파일이 있는 디렉토리를 기준으로 경로를 만든다.
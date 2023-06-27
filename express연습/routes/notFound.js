const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path')

router.use('/', (req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(rootDir, 'views', 'not-found.html'));
    // ../ === ..
});

module.exports = router;


// 다음 강의에서는 다음과 같은 코드를 작성합니다.

// module.exports = path.dirname(process.mainModule.filename);
// (다음 강의를 진행하면서 왜 이 코드를 사용하는지 설명할게요!)

// deprecation warning이 나타나는 것을 유의해야 합니다. 해당 오류가 나타나면, 다음과 같은 코드로 바꾸면 됩니다.

// module.exports = path.dirname(require.main.filename);
// 아주 간단하죠 :)
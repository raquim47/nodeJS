const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path')

router.get('/', (req, res, next) => {
  // sendFile() 메소드에 전달하는 경로는 절대 경로여야 한다. 
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;

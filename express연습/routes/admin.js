const path = require('path');
const express = require('express');
const rootDir = require('../util/path')
const router = express.Router();


// admin/add-product -> GET
router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// 메서드가 다르면 같은 경로 사용 가능
// admin/add-product -> POST
router.post('/add-product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;

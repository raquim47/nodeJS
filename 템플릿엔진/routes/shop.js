const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const adminData = require('./admin');

router.get('/', (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  res.render('shop', { prods: adminData.products, pageTitle: 'My Shop', path: '/' });
});

module.exports = router;

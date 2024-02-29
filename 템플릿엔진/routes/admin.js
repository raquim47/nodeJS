const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

const products = [];

// admin/add-product -> GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
});

// 메서드가 다르면 같은 경로 사용 가능
// admin/add-product -> POST
router.post('/add-product', (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.products = products;

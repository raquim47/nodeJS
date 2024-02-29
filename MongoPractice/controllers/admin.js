const Product = require('../models/product');

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product(
    title,
    imageUrl,
    price,
    description,
    null,
    req.user._id
  );
  product
    .save()
    .then((result) => {
      console.log('상품 생성');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product',
    editing: false,
  });
};

exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.render('admin/products', {
        path: '/admin/products',
        pageTitle: 'Admin Products',
        prods: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');

  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }

      res.render('admin/edit-product', {
        path: '/admin/edit-product',
        pageTitle: 'Edit Product',
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const { title, imageUrl, description, price, productId } = req.body;
  const updatedProduct = new Product(
    title,
    imageUrl,
    price,
    description,
    productId
  );

  updatedProduct
    .save()
    .then((result) => {
      console.log('업데이트');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId)
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
  res.redirect('/admin/products');
};

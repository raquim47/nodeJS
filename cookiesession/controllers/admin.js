const Product = require('../models/product');

exports.postAddProduct = (req, res) => {
  const { title, imageUrl, price, description } = req.body;

  const product = new Product({
    title,
    imageUrl,
    description,
    price,
    userId: req.user, //Mongoose는 해당 객체에서 ID만을 가져올 수 있음
  });

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
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.getProducts = (req, res) => {
  Product.find()
    // .select('title price -_id')
    // .populate('userId', 'username')
    .then((products) => {
      res.render('admin/products', {
        path: '/admin/products',
        pageTitle: 'Admin Products',
        prods: products,
        isAuthenticated: req.session.isLoggedIn,
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
  // ObjectId로 변환하지 않아도 몽구스가 내부적으로 변환
  Product.updateOne(
    { _id: productId },
    { title, imageUrl, description, price, userId: req.user }
  )
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
  res.redirect('/admin/products');
};

const Product = require('../models/product');
const Order = require('../models/order');

exports.getHome = (req, res) => {
  Product.find().then((products) => {
    res.render('shop/home', {
      path: '/',
      pageTitle: 'My Shop',
      prods: products,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.getProducts = (req, res) => {
  Product.find().then((products) => {
    res.render('shop/product-list', {
      path: '/products',
      pageTitle: 'All Products',
      prods: products,
      isAuthenticated: req.session.isLoggedIn,
    });
  });
};

exports.getOneProduct = (req, res) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res) => {
  req.user
    .populate('cart.items.productId')
    .then((user) => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: user.cart.items,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(() => res.redirect('/cart'))
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res) => {
  req.user
    .populate('cart.items.productId')
    .then((user) => {
      const products = user.cart.items.map((item) => ({
        quantity: item.quantity,
        product: { ...item.productId._doc },
      }));
      const order = new Order({
        user: {
          username: req.user.username,
          userId: req.user
        },
        products,
      });

      return order.save();
    })
    .then(() => {
      req.user.clearCart();
    })
    .then(() => res.redirect('/orders'))
    .catch((err) => console.log(err));
};

exports.getOrders = (req, res) => {
  Order.find({ 'user.userId': req.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch((err) => console.log(err));
};

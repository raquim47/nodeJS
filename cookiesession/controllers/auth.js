const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res) => {
  User.findById('64a17d3e32b6e66d7a287b9d')
    .then((user) => {
      req.session.isLoggedIn = true;
      req.user = user;
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    // console.log(err);
    res.redirect('/');
  });
};

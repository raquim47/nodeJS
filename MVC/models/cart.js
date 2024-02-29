const fs = require('fs');
const path = require('path');

const cartPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
        // existingProduct.quantity += 1; // 얕은 복사가 꼭 필요한지 고민해볼 것.
      } else {
        updatedProduct = { id, quantity: 1 };
        cart.products.push(updatedProduct);
      }
      cart.totalPrice += parseInt(productPrice);
      console.log(cart);
      fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  
  static deleteProduct(id, productPrice) {
    fs.readFile(cartPath, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const foundProduct = updatedCart.products.find(
        (product) => product.id === id
      );
      if(!foundProduct) return;

      const productQty = foundProduct.quantity;
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      updatedCart.totalPrice -= productPrice * productQty;

      fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }

  static getProducts(cb) {
    fs.readFile(cartPath, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null)
      } else {
        cb(cart);
      }
    });
  }
};

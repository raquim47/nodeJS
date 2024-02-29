const { ObjectId } = require('mongodb');
const { getDb } = require('../service/database');

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart || { items: [] };
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => i.productId);

    const quantityMap = this.cart.items.reduce((obj, item) => {
      obj[item.productId.toString()] = item.quantity;
      return obj;
    }, {});

    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) =>
        products.map((product) => ({
          ...product,
          quantity: quantityMap[product._id.toString()],
        }))
      );
  }

  deleteItemFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== prodId.toString()
    );
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart().then((products) => {
      const order = {
        items: products,
        user: {
          _id: new ObjectId(this._id),
          name: this.name,
        },
      };
      return db
        .collection('orders')
        .insertOne(order)
        .then((result) => {
          this.cart = { items: [] };
          return db
            .collection('users')
            .updateOne(
              { _id: new ObjectId(this._id) },
              { $set: { cart: this.cart } }
            );
        });
    });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }

  static findById(userId) {
    const db = getDb();
    // 하나의 요소만을 찾는 것이 확실할 경우 find - next 대신 findOne 하나로 가능
    // return db.collection('users').find({ _id: new ObjectId(userId) }).next();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;

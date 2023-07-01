const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  // 데이터의 일관성과 완전성을 보장
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', //user 모델을 참조
    required: true,
  },
});

// Mongoose가 모델 이름인 Product를 소문자로 바꾼 후 복수형으로 만들어 collection 이름으로 사용
module.exports = mongoose.model('Product', productSchema);

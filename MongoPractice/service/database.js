const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    'mongodb+srv://cmikal47:1234@cluster0.l3nuccr.mongodb.net/shop?retryWrites=true&w=majority',
    { useUnifiedTopology: true }
  )
    .then((client) => {
      console.log('연결됨');
      _db = client.db();
      cb();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
// 데이터베이스 연결을 필요로 할 때마다 MongoClient.connect를 호출해서 새로운 연결을 만드는 대신, getDb를 통해 기존 연결을 재사용
const getDb = () => {
  if (_db) return _db;

  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StockSchema = new Schema({
  symbol: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
});


const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;

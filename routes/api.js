'use strict';

const expect = require('chai').expect;
const fetch = require('node-fetch');
const Stock = require('../models/stock-model');


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
    
    const like = req.query.like;
    const symb = req.query.symbol;
    const price = async(symbol)=>{
      let response = `https://api.iextrading.com/1.0/stock/${symbol}/price`;
      await fetch(response)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err));
    }
    
    Stock.findOne({symbol: symb})
      .then(stock => {
        if (!stock){
          let newStock = new Stock({
            symbol: symb,
            like: like ? 1 : 0,
            price: price(symb)            
          });
          return newStock.save();
        } else {
          const update = {
            price: price(symb)
          }
          if (like){
            update.like = like++;
          }
          Stock.update(stock, update)
        }
      })
    });
    
};

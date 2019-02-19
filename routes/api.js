'use strict';

const expect = require('chai').expect;
const fetch = require('node-fetch');
const Stock = require('../models/stock-model');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
    let like = req.query.like;
    const symb = req.query.symbol;    
    const price = fetch(`https://api.iextrading.com/1.0/stock/${symb}/price`).then(res => res.json());

      Stock.findOne({symbol: symb})
      .then(stock => {
        if (!stock){
          let stock = new Stock({
            symbol: symb,
            likes: like ? 1 : 0,
          });
          stock.save();            
        } else {
          if (like === 'true'){
            like = stock.likes + 1;
            Stock.update({symbol: symb}, {likes: stock.likes + 1})
          } else {
            like = stock.likes;
          }
        }
      })
      .catch(err => console.log(err));

    price.then(data =>{ 
      let response = {
        symbol: symb,
        price: data,
        likes: like
      }
      console.log(response);
      res.json(response)
    })
    .catch(err => console.log(err));
  })
};

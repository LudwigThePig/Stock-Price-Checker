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
        // .then(data => data)
        // .catch(err => console.log(err));
    
    
    Promise.resolve(price).then(_=>{
      Stock.findOne({symbol: symb})
      .then(stock => {
        if (!stock){
          let stock = new Stock({
            symbol: symb,
            like: like ? 1 : 0,
          });
          stock.save();            
        } else {
          const update = {
            price: price
          }
          if (like){
            update.like = like++;
          }
          Stock.update(stock, update)
        }
      })
      .catch(err => console.log(err));
    });
    price.then(data =>{ 
      let response = {
        symbol: symb,
        price: data,
        like: like
      }
      res.json(response)
    })
    .catch(err => console.log(err));
  })
};

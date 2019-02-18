'use strict';

const expect = require('chai').expect;
const fetch = require('node-fetch');
const Stock = require('../models/stock-model');


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
    
    const like = req.query.like;
    const symb = req.query.symbol;    
    const price = fetch(`https://api.iextrading.com/1.0/stock/${symb}/price`).then(res => res.json());
        // .then(data => data)
        // .catch(err => console.log(err));
    
    
    Promise.resolve(price).then(_=>{
      Stock.findOne({symbol: symb})
      .then(stock => {
        if (!stock){
          price.then(res=>res)
            .then(data=>{
          let newStock = new Stock({
            symbol: symb,
            like: like ? 1 : 0,
            price: data            
          });
          
        return newStock.save()})
          .catch(err=>err);
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
  })
};

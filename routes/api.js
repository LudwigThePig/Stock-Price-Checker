'use strict';
/*
  Symbols are held in an array.
  Each member of the array is given to the db function and returns an object with symbol and likes
  Object is stored in response array
  
*/
const expect = require('chai').expect;
const fetch = require('node-fetch');
const Stock = require('../models/stock-model');

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
    let like = req.query.like;
    let symb;  
    let response = [];
    if (req.query.symboltwo){
      symb = [req.query.symbolone, req.query.symboltwo]
    } else { 
      symb = [req.query.symbolone];
    }
        
    const db = (symb)=>{
      let obj = {
        symbol: symb
      }
      
      //Just for getting and setting likes
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
              obj.like = stock.likes + 1;
              Stock.update({symbol: symb}, {likes: stock.likes + 1})
            } else {
              like = stock.likes;
            }
          }
        })
        .catch(err => console.log(err));
      
      //For getting price
      const price = fetch(`https://api.iextrading.com/1.0/stock/${symb}/price`).then(res => res.json());
      price.then(data=>{
        obj.price = data;
      })
      response.push(obj);
    }
    
    symb.forEach(x => db(x));
    setTimeout(_=>res.json(response), 1000)
    
  })
};

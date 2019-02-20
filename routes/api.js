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
    let symb = [req.query.symbolone];
    let response = [];
    
    if (req.query.symboltwo !== undefined){
      symb.push(req.query.symboltwo);
      console.log('two symbs');
    }
        
    const db = (symbol)=>{
      let obj = {
        symbol: symbol,
        likes: 0,
        price: 0
      }
      
      //Just for getting and setting likes
      Stock.findOne({symbol: symbol})
        .then(stock => {
          if (!stock){
            let stock = new Stock({
              symbol: symbol,
              likes: like ? 1 : 0,
            });
            stock.save();            
          } else {
            if (like === 'true'){
              obj.like = stock.likes + 1;
              Stock.update({symbol: symbol}, {likes: stock.likes + 1})
            } else {
              console.log('line 46');
              like = stock.likes;
            }
          }
        })
        .catch(err => console.log(err));
      
      //For getting price
      const price = fetch(`https://api.iextrading.com/1.0/stock/${obj.symbol}/price`).then(res => res.json());
      price.then( data =>{
        obj.price = data; 
        response.push(obj);
      })
        .catch( err => console.log(err) );
    }//end db function
    
    symb.forEach(x => db(x));
    setTimeout(_=>res.json(response), 2000); //hack and slash method of asynch/await 
    
  })//end get function
}//end module.exports
 
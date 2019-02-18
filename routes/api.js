'use strict';

const expect = require('chai').expect;

const Stock = require('../models/stock-model');


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
    const stockSymbol = req.query.symbol;
    console.log(req.query);
    res.json({message: 'lol'})
    // Stock.findOne({})
    
      
    });
    
};

'use strict';

const expect = require('chai').expect;

const Stock = require('../models/stock-model');


module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
    const stockSymbol = req;
    
    Stock.findOne({})
    
      
    });
    
};

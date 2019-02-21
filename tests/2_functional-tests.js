/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({symbolone: 'goog', like: false})
        .end(function(err, res){
          assert.equal(res[0].symbol, "goog");
          assert.isString(res[0].symbol, "Symbol one should be a string");
          assert.isNumber(res[0].price, "Price should be a number");  
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({symbolone: 'ge', like: true})
        .end(function(err, res){
            assert.equal(res[0].symbol, "ge");
            assert.isString(res[0].symbol, "Symbol one should be a string");
            assert.isNumber(res[0].price, "Price should be a number");
            assert.isNumber(res[0].likes, "Likes should be a number")
            assert.equal(res[0].likes, 1)
            done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({symbolone: 'ge', like: true})
        .end(function(err, res){
            assert.equal(res[0].symbol, "ge");
            assert.isString(res[0].symbol, "Symbol one should be a string");
            assert.isNumber(res[0].price, "Price should be a number");
            assert.isNumber(res[0].likes, "Likes should be a number")
            assert.equal(res[0].likes, 2)
            done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({symbolone: 'msft', symboltwo: 'face', like: false})
        .end(function(err, res){
            assert.equal(res[0].symbol, "msft");
            assert.equal(res[1].symbol, "face")
            assert.isString(res[0].symbol, "Symbol should be a string");
            assert.isString(res[1].symbol, "Symbol should be a string")
            assert.isNumber(res[0].price, "Price should be a number");
            done();
        });        
      });
      
      test('2 stocks with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({symbolone: 'msft', symboltwo: 'face', like: true})
        .end(function(err, res){
            assert.equal(res[0].symbol, "msft");
            assert.equal(res[1].symbol, "face")
            assert.isString(res[0].symbol, "Symbol should be a string");
            assert.isString(res[1].symbol, "Symbol should be a string")
            assert.isNumber(res[0].price, "Price should be a number");
            assert.isNumber(res[0].likes, "Likes should be a number");
            assert.isNumber(res[1].likes, "Likes should be a number")
            assert.equal(res[0].likes, 1);
            assert.equal(res[1].likes, 1);
            done();
        });
      });
      
    });

});

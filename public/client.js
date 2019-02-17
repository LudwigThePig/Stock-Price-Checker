const  init = ()=>{
    listeners();
  };
  
  const fetchers = {
    getOneStock: function(stock, like = false){
      
      const request = {
        symbol: stock,
        likes: like      
      }
      
      const options = {
        type: 'GET',
        body: JSON.stringify(request),
        headers: {'Content-Type': 'application/json'}
      }
      return fetch('/api/stock-prices')
    },
    getTwoStocks: function(stockOne, stockTwo, like = false){
    
    }
  }
  
  const listeners = ()=>{
      const formOne = document.getElementById("singleStock"),
        singleField = document.getElementsByName("stock")[0],
  
        formTwo = document.getElementById("twoStocks"),
        compareFieldOne = document.getElementsByName("stock")[1],
        compareFieldTwo = document.getElementsByName("stock")[2];
    
    formOne.addEventListener('submit', function(e){
      e.preventDefault();
      console.log(singleField.value);
    })
    formTwo.addEventListener('submit', function(e){
      e.preventDefault();
      console.log(compareFieldOne.value);
      console.log(compareFieldTwo.value);
    })
  }
  
  window.onload = init();
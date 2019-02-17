const  init = ()=>{
    listeners();
  };
  
  const fetchers = {
    getOneStock: function(stock, like = false){
      
      const request = `/api/stock-prices?symbol=${stock}?like=${like}`
      
      return fetch(request)
        .then(res => res.json)
        .then(data => data)
        .catch(err => console.log(err));
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
      fetchers.getOneStock(singleField.value);
    })
    formTwo.addEventListener('submit', function(e){
      e.preventDefault();
      console.log(compareFieldOne.value);
      console.log(compareFieldTwo.value);
    })
  }
  
  window.onload = init();
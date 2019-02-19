const  init = ()=>{
  listeners();
};
let results = [];
const fetchers = {
  getOneStock: function(stock, like = false){
    
    const request = `/api/stock-prices?symbol=${stock}&like=${like}`
    
    return fetch(request)
      .then(res => res.json())
      .then(data => results.push(data))
      .catch(err => console.log(err));
  },
  getTwoStocks: function(stockOne, stockTwo, like = false){
  
  }
}

const listeners = ()=>{
    const formOne = document.getElementById("singleStock"),
      singleField = document.getElementsByName("stock")[0],
      likeOne = document.getElementsByName("like")[0],

      formTwo = document.getElementById("twoStocks"),
      compareFieldOne = document.getElementsByName("stock")[1],
      compareFieldTwo = document.getElementsByName("stock")[2],
      likeTwo = document.getElementsByName("like")[1];

  
  formOne.addEventListener('submit', function(e){
    e.preventDefault();
    fetchers.getOneStock(singleField.value, likeOne.value)
    console.log(likeOne.value);
      setTimeout(_=>renderer(results), 1000);
    ;
  })
  formTwo.addEventListener('submit', function(e){
    e.preventDefault();
    console.log(compareFieldOne.value);
    console.log(compareFieldTwo.value);
  })
}

const renderer = (results)=>{
  
  for (let i = 0; i<results.length; i++){
    const domNode = document.getElementById('display');
    const div = document.createElement('div');
    const symbol = document.createElement('h1');
    const price = document.createElement('p');
    const likes = document.createElement('p');
    
    symbol.innerText = results[i].symbol;
    price.innerText = results[i].price;
    likes.innerText = results[i].likes;
    
    div.appendChild(symbol);
    div.appendChild(price);
    div.appendChild(likes);
    
    domNode.appendChild(div);
  }
  
}

window.onload = init();
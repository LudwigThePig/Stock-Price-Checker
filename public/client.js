const  init = ()=>{
  listeners();
};
let results = [];
const fetchers = {
  getOneStock: function(stock, like = false){
    
    const request = `/api/stock-prices?symbolone=${stock}&like=${like}`;
    
    return fetch(request)
      .then(res => res.json())
      .then(data => results.push(data[0]))
      .then( _=> renderer(results))
      .catch(err => console.log(err));
  },
  getTwoStocks: function(stockOne, stockTwo, like = false){
  const request = `/api/stock-prices?symbolone=${stockOne}&symboltwo=${stockTwo}&like=${like}`;
    return fetch(request)
      .then(res => res.json())
      .then(data => results = data)
      .then( _=> renderer(results))
      .catch(err => console.log(err));
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
    fetchers.getOneStock(singleField.value, likeOne.checked);
    singleField.value = '';
    likeOne.checked = false;    
  })
  
  formTwo.addEventListener('submit', function(e){
    e.preventDefault();
    fetchers.getTwoStocks(compareFieldOne.value, compareFieldTwo.value, likeTwo.checked);
    compareFieldOne.value = '';
    compareFieldTwo.value = '';
    likeTwo.checked = false;
  })
}

const renderer = (results)=>{
  const domNode = document.getElementById('display');
  while(domNode.firstChild){
    domNode.removeChild(domNode.firstChild);
  }
  
  for (let i = 0; i < results.length; i++){
    const div = document.createElement('div');
    const symbol = document.createElement('h1');
    const price = document.createElement('p');
    const likes = document.createElement('p');
    
    symbol.innerText = `${results[i].symbol.toUpperCase()}`;
    price.innerText = `$${results[i].price}usd`;
    likes.innerText = `Likes: ${results[i].likes}`;
    
    div.setAttribute('class', 'stock-box')
    
    div.appendChild(symbol);
    div.appendChild(price);
    div.appendChild(likes);
    
    domNode.appendChild(div);
  } 
}

window.onload = init();
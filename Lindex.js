//localStorage.clear();

let watchList = []

let movieTitleArray = [] 
let boxes = document.getElementById('boxes')
let content
let moreText
let displayText
let movietoPush
let movietoDrop

let movieInputStorage = localStorage.getItem('movieInputStorage');
//console.log(movieInputStorage);

if (movieInputStorage) {
  watchList = JSON.parse(movieInputStorage);
} else {
  watchList = []
}

function removeNullsFromArray(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== null) {
      result.push(array[i]);
    }
  }
  return result;
}

function removeunDefineFromArray(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] !== undefined) {
      result.push(array[i]);
    }
  }
  return result;
}

addtotheList()
    
function addtotheList(){
    //console.log(movietoPush + 'is the moive to push ');
    watchList.push(movietoPush)
    //console.log(watchList + ' is the new watchlist')
    //localStorage.setItem('movieInputStorage', JSON.stringify(watchList));
    watchList = watchList.filter(Boolean);
    console.log(watchList); 
    console.log("hi")
    watchList = removeNullsFromArray(watchList)
    watchList = removeunDefineFromArray(watchList)
     localStorage.setItem('movieInputStorage', JSON.stringify(watchList));
        if (document.getElementById('page2watchlist')){
        document.getElementById('page2watchlist').innerText = watchList
    } 
    //what()    
    }
    

if (document.getElementById('submit')){  
submit.addEventListener('click', () => {
    let inPut = inputBox.value;
    inputBox.value = '';
    //console.log('one')
    movieTitleArray = []; // clear previous search entriesfunde
    boxes.innerHTML = ''; // remove previous display
fetch(`https://www.omdbapi.com/?s=${inPut}&apikey=db11493d`)
    .then(response => response.json())
    .then(data => {
    //console.log('two')
    //console.log(item.Title)
    data.Search.forEach(function(item) {
    //console.log(item.Title)
    //console.log('three')
    movieTitleArray.push(item.Title)
    })
       if (movieTitleArray.length > 0) {
    for (let i=0; i < movieTitleArray.length; i++) {
        
    fetch(`https://www.omdbapi.com/?t=${(movieTitleArray[i])}&apikey=db11493d`)
    .then(response => response.json())
    .then(data => {
         //console.log(data.Runtime)
    const newElement = document.createElement('div');
    
    newElement.innerHTML += `
    <div class = 'eachThing'> 
    <div class = 'left'>      
    <div id = 'imageHolder' class = 'imgholder'><img src = "${data.Poster}" class = 'imgholder'></div>
    </div>
    <div class = 'right'>
    <div class = 'titleAndYear'>
    <h1>${data.Title}</h1>
    <h2>${data.Year}</h2>
    </div>
    <div class = 'threeInfo'>
    <div class = 'runTime'>${data.Runtime}</div>
    <div class ='movieType'>${data.Genre}</div>
    <div class = 'addtoList'>
        <div class = 'addPlusHolder'><button id = 'addtoWatch' class = 'addPlus'>+</button></div>
        <div class = 'addMessage'>Add to watchlist</div>
        </div>     
    </div>
    <p class = 'content'>${data.Plot}</p>    
    </div>
    </div>`
    boxes.appendChild(newElement);
    //console.log(newElement.querySelector('#addtoWatch'))

    let addWatch = (newElement.querySelector('#addtoWatch'))
    addWatch.addEventListener("click", function() {
        movietoPush = data.Title 
        addtotheList()
});
//console.log(watchList + "hello")
    })
    }
    }
    })
})
}


function takeOffList(){
    //console.log(movietoPush + 'is the moive to push ');
    //watchList.push(movietoDrop)
    let index = watchList.indexOf(movietoDrop);
    if (index > -1) {
    watchList.splice(index, 1);
    }
    //console.log(watchList + ' is the new watchlist')
    localStorage.setItem('movieInputStorage', JSON.stringify(watchList));
    //console.log(watchList)
    watchList = removeNullsFromArray(watchList)
        if (document.getElementById('page2watchlist')){
        document.getElementById('page2watchlist').innerText = watchList
    } 
    //what()    
    }
//console.log(removeNullsFromArray(watchlist))

if (watchList.length > 0) {
    for (let i=0; i < watchList.length; i++) {
        
    fetch(`https://www.omdbapi.com/?t=${(watchList[i])}&apikey=db11493d`)
    .then(response => response.json())
    .then(data => {
         //console.log(data.Runtime)       
    const newWatchElement = document.createElement('div');
    newWatchElement.innerHTML += `
    <div class = 'eachThing'> 
    <div class = 'left'>      
    <div id = 'imageHolder' class = 'imgholder'><img src = "${data.Poster}" class = 'imgholder'></div>
    </div>
    <div class = 'right'>
    <div class = 'titleAndYear'>
    <h1>${data.Title}</h1>
    <h2>${data.Year}</h2>
    </div>
    <div class = 'threeInfo'>
    <div class = 'runTime'>${data.Runtime}</div>
    <div class ='movieType'>${data.Genre}</div>
    <div class = 'addtoList'>
        <div class = 'addPlusHolder'><button id = 'removeFromWatch' class = 'reMove'>-</button></div>
        <div class = 'addMessage'>Remove from watchlist</div>
        </div>     
    </div>
    <p class = 'content'>${data.Plot}</p>    
    </div>
    </div>`
    if (document.getElementById('faveBoxes')){        
    faveBoxes.appendChild(newWatchElement)
        let reMove = (newWatchElement.querySelector('#removeFromWatch'))
    reMove.addEventListener("click", function() {
        movietoDrop = data.Title 
        takeOffList()
        faveBoxes.removeChild(newWatchElement)
        });
     }
    });
}}
   

    
    

let gameGrid = undefined;
let emptyCells = undefined;
let numberOfCells = 16;
const tileDiv = document.querySelector(".tile-container");
newGame()
document.onkeydown = function(e) {
  switch (e.key) {
      case "ArrowLeft":
          move("ArrowLeft");
          console.log(gameGrid)
          break;
      case "ArrowUp":
          move("ArrowUp"); //show the message saying up"
          console.log(gameGrid)
          break;
      case "ArrowRight":
          move("ArrowRight");
          console.log(gameGrid)
          break;
      case "ArrowDown":
          move("ArrowDown"); //show the message saying down"
          break;
  }
};

function newGame(){
  gameGrid = new Array(4);
  emptyCells = new Array(numberOfCells);
  for(let i = 0; i < 4; i++){
    gameGrid[i] = new Array(4);
  }
  while (tileDiv.firstChild) {
    tileDiv.removeChild(tileDiv.lastChild);
  }

  populateEmptyCell();
  populateEmptyCell();
}

function populateEmptyCell(){
  const newDiv = document.createElement("div");
  newDiv.classList.add('tile');
  let [rowNum,colNum] = getRandomEmptyCell();
  if(rowNum == -1){
    alert('no')
    return;
    
  }
  newDiv.classList.add(`tile-position-${rowNum}-${colNum}`);
  newDiv.classList.add(`tile-num-2`);

  const innerDiv = document.createElement("div");
  innerDiv.classList.add('tile-inner');
  innerDiv.textContent = 2;
  newDiv.appendChild(innerDiv)
  tileDiv.appendChild(newDiv);
  gameGrid[rowNum][colNum] = 2;
}

function getRandomEmptyCell(){
  let cells = getAvailableCells();
  if(cells.length == 0){
    return [-1,-1];
  }
  let index =  Math.floor(Math.random() * cells.length);

  let cell = cells[index];
  return cell;

}

function getAvailableCells(){
  let cells = [];
  let rowLength = gameGrid[0].length;
  for(let i = 0; i < gameGrid.length; i++){
    for(let j = 0; j < rowLength; j++){
      if(gameGrid[i][j] == undefined){
        cells.push([i,j]);
      }
    }
  }
  return cells;
}

function move(dir){
  if(dir === "ArrowLeft"){
    for(let n = 0; n < gameGrid.length; n++){
      let row = gameGrid[n]
      let current = 0;
      for(let i = 1; i < row.length; i++){
        if(row[current] == row[i] && row[i] != undefined){
          mergeTile(n,current,n,i);
          break;
        }
        else if(row[i] != undefined){
          current = i;
        }
      }
      for(let i = 1; i < row.length; i++){
        if(row[i] !== undefined){
          for(let j = 0; j < i; j++){
            if(row[j] === undefined){
              moveTile(n,j,n,i);
              
              break;
            }
          }
        }
      }
    }
  }
  if(dir === "ArrowRight"){
    for(let n = 0; n < gameGrid.length; n++){
      let row = gameGrid[n]
      let current = row.length-1;
      for(let i = row.length-2; i >= 0; i--){
        if(row[current] == row[i] && row[i] != undefined){
          mergeTile(n,current,n,i);
          break;
        }
        else if(row[i] != undefined){
          current = i;
        }
      }
      for(let i = row.length-2; i >= 0; i--){
        if(row[i] !== undefined){
          for(let j = row.length-1; j > 0; j--){
            if(row[j] === undefined){
              moveTile(n,j,n,i);
              
              break;
            }
          }
        }
      }
    }    
  }
  if(dir === "ArrowDown"){
    for(let n = 0; n < gameGrid.length; n++){
      let row = gameGrid[n]
      let current = row.length-1;
      for(let i = row.length-2; i >= 0; i--){
        if(gameGrid[current][n] == gameGrid[i][n] && gameGrid[i][n] != undefined){
          mergeTile(current,n,i,n);
          break;
        }
        else if(gameGrid[i][n] != undefined){
          current = i;
        }
      }
      for(let i = row.length-2; i >= 0; i--){
        if(gameGrid[i][n] !== undefined){
          for(let j = row.length-1; j > 0; j--){
            if(gameGrid[j][n] === undefined){
              moveTile(j,n,i,n);
              
              break;
            }
          }
        }
      }
    }    
  }
  if(dir === "ArrowUp"){
    for(let n = 0; n < gameGrid.length; n++){
      let row = gameGrid[n]
      let current = 0;
      for(let i = 1; i < row.length; i++){
        if(gameGrid[current][n] == gameGrid[i][n] && gameGrid[i][n] != undefined){
          mergeTile(current,n,i,n);
          break;
        }
        else if(gameGrid[i][n] != undefined){
          current = i;
        }
      }
      for(let i = 1; i < row.length; i++){
        if(gameGrid[i][n] !== undefined){
          for(let j = 0; j < i; j++){
            if(gameGrid[j][n] === undefined){
              moveTile(j,n,i,n);
              
              break;
            }
          }
        }
      }
    }    
  }
}
function moveTile(x1,y1,x2,y2){
  
  if(gameGrid[x1][y1] === undefined){
    console.log(x2,y2,gameGrid[x2][y2])
    console.log(x1,y1,gameGrid[x1][y1])
    let tile = tileDiv.querySelector(`.tile-position-${x2}-${y2}`)
    tile.classList.remove(`tile-position-${x2}-${y2}`);
    tile.classList.add(`tile-position-${x1}-${y1}`);
    gameGrid[x1][y1] = gameGrid[x2][y2];
    gameGrid[x2][y2] = undefined;
  }
}
//merges [x2,y2] into [x1,y2]
function mergeTile(x1,y1,x2,y2){
  if(gameGrid[x1][y1] == gameGrid[x2][y2]){
    tileDiv.querySelector(`.tile-position-${x2}-${y2}`).remove();
    let tile = tileDiv.querySelector(`.tile-position-${x1}-${y1}`);
    tile.classList.remove(`tile-num-${gameGrid[x1][y1]}`);
    let value = gameGrid[x1][y1] + gameGrid[x2][y2];
    tile.textContent = value;
    gameGrid[x1][y1] = value;
    tile.classList.add(`tile-num-${gameGrid[x1][y1]}`);
    gameGrid[x2][y2] = undefined;
  }
}
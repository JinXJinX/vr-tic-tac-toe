var SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;

function play(element) {
  if (element.innerHTML !== EMPTY) {
    return;
  }
  element.innerHTML = turn;
  moves += 1;

  if (moves === 9){
    alert('Draw');
    newGame();
  }

  // switch
  turn = turn === 'X' ? 'O' : 'X';
}

function newGame(){
  score = {
    'X': 0,
    'O': 0
  };
  moves = 0;
  turn = 'X';
  var cells = document.getElementsByClassName("cell");
  [].forEach.call(cells, function (cell) { cell.innerHTML = EMPTY; })
}

newGame();

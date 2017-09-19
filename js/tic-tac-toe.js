var SIZE = 3,
  EMPTY = '&nbsp;',
  boxes = [],
  turn = 'X',
  score,
  moves;

function check(cell){
  var memberOf = cell.id.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    score[turn][memberOf[i]] += 1;
    if (score[turn][memberOf[i]] == SIZE) {
      return true;
    }
  }
  return false
}

function play(element) {
  if (element.innerHTML !== EMPTY) {
    return;
  }
  element.innerHTML = turn;
  moves += 1;
  if (check(element)){
    alert(turn + ' Win!');
    newGame();
  } else if (moves === 9){
    alert('Draw');
    newGame();
  } else {
    // switch
    turn = turn === 'X' ? 'O' : 'X';
  }
}

function newGame(){
  score = {
    'X': {
      'col0': 0,
      'col1': 0,
      'col2': 0,
      'row0': 0,
      'row1': 0,
      'row2': 0,
      'diagonal0': 0,
      'diagonal1': 0,
    },
    'O': {
      'col0': 0,
      'col1': 0,
      'col2': 0,
      'row0': 0,
      'row1': 0,
      'row2': 0,
      'diagonal0': 0,
      'diagonal1': 0,
    },
  };
  moves = 0;
  turn = 'X';
  var cells = document.getElementsByClassName("cell");
  [].forEach.call(cells, function (cell) { cell.innerHTML = EMPTY; })
}

newGame();

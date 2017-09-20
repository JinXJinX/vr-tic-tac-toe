var SIZE = 3,
  // EMPTY = '&nbsp;',
  EMPTY = '',
  boxes = [],
  turn = 'X',
  user = 'X',
  score,
  moves,
  win,
  lose,
  draw,
  sceneEl,
  cont;

function init(){
  win = document.createElement('a-entity');
  lose = document.createElement('a-entity');
  draw = document.createElement('a-entity');

  win.setAttribute('ply-model', 'src: #winer');
  win.setAttribute('dynamic-body', {
    sphereRadius: NaN,
    shape: 'auto',
    cylinderAxis: 'y',
    mass: 5.00
  });
  win.setAttribute('position', {x: 1, y: 6, z: -4});
  win.setAttribute('class', 'status');
  win.setAttribute('scale', '0.08 0.08 0.08');

  lose.setAttribute('ply-model', 'src: #loser');
  lose.setAttribute('dynamic-body', {
    sphereRadius: NaN,
    shape: 'auto',
    cylinderAxis: 'y',
    mass: 5.00
  });
  lose.setAttribute('position', {x: 1, y: 6, z: -4});
  lose.setAttribute('class', 'status');
  lose.setAttribute('scale', '0.08 0.08 0.08');

  draw.setAttribute('ply-model', 'src: #gg');
  draw.setAttribute('dynamic-body', {
    sphereRadius: NaN,
    shape: 'auto',
    cylinderAxis: 'y',
    mass: 5.00
  });
  draw.setAttribute('position', {x: 1, y: 6, z: -4});
  draw.setAttribute('class', 'status');
  draw.setAttribute('scale', '0.05 0.05 0.05');

  newGame();
}

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

function gamewin(){
  win.setAttribute('position', {x: 1, y: 6, z: -4});
  sceneEl = document.querySelector('a-scene');
  sceneEl.appendChild(win);
}
function gamelose(){
  lose.setAttribute('position', {x: 1, y: 6, z: -4});
  sceneEl = document.querySelector('a-scene');
  sceneEl.appendChild(lose);
}
function gamedraw(){
  draw.setAttribute('position', {x: 1, y: 6, z: -4});
  sceneEl = document.querySelector('a-scene');
  sceneEl.appendChild(draw);
}

function selectrole(ele){
  if (ele.classList.contains('selected')){
    return;
  }
  var tmp = document.querySelector(".selected");
  tmp.classList.remove("selected");
  var pointer = document.querySelector("#pointer");
  if (ele.id == 'o'){
    pointer.setAttribute('position', {x: -3.226, y: 0.973, z:  -3.755});
  } else if (ele.id == 'x') {
    pointer.setAttribute('position', {x: -3.811, y: 0.973, z: -2.662});
  }
  ele.classList.add('selected');
  turn = turn === 'X' ? 'O' : 'X';
  user = turn;
  newGame();
}

function tictactoe(ele) {
  if (cont !== 'true' || ele.getAttribute('used') === 'true') {
    return;
  }
  // console.log(ele.getAttribute('used'));
  if (turn === 'X') {
    // Add to the scene with `appendChild`.
    // ele.sceneEl.appendChild(newVoxelEl);
    ele.setAttribute('geometry', 'radius:0.4;primitive:dodecahedron');
  } else {
    ele.setAttribute('geometry', 'radius:0.25;radiusTubular:0.02;primitive:torusKnot');
  }
  ele.setAttribute('visible', 'true');
  ele.setAttribute('used', 'true');
  moves += 1;
  if (check(ele)){
    if (turn == user){
      gamewin();
    } else {
      gamelose();
    }
    cont = 'false';
  } else if (moves === 9){
    gamedraw();
    cont = 'false';
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
  cont = 'true';
  moves = 0;
  turn = 'X';
  var cells = document.querySelectorAll(".cell");
  [].forEach.call(cells, function (cell) {
                cell.setAttribute('geometry', '');
                cell.setAttribute('used', 'false');
                cell.setAttribute('visible', 'false');
              })
  var eles = document.querySelectorAll(".status");
  [].forEach.call(eles, function (ele) { ele.parentNode.removeChild(ele); })
}

init();

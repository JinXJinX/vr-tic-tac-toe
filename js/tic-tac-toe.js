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
  cont,
  xs,
  os;

const shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5))

function init(){
  win = document.createElement('a-entity');
  lose = document.createElement('a-entity');
  draw = document.createElement('a-entity');
  xs = document.createElement('a-entity');
  os = document.createElement('a-entity');

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

  // var tmp = document.querySelector("#x-tag");
  // tmp.setAttribute('ply-model', 'src: #x-model');
  // tmp = document.querySelector("#o-tag");
  // tmp.setAttribute('ply-model', 'src: #o-model');
  // var tmp = document.querySelector("#o-tag");
  // tmp.addEventListener('click', selectrole(tmp));
  // tmp = document.querySelector("#x-tag");
  // tmp.addEventListener('click', selectrole(tmp));


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
  if (ele.id == 'p1'){
    pointer.setAttribute('position', {x: -3.679, y: 0.973, z:  -4.131});
  } else if (ele.id == 'p2') {
    pointer.setAttribute('position', {x: -3.679, y: 0.45, z: -4.131});
  }
  ele.classList.add('selected');
  turn = turn === 'X' ? 'O' : 'X';
  user = turn;
  console.log('curr user: ' + user);
  newGame();
}

function tictactoe(ele, botturn=false) {
  if (cont !== 'true' || ele.getAttribute('used') === 'true' || (user != turn && !botturn)) {
    return;
  }
  // console.log(ele.getAttribute('used'));
  if (turn === 'X') {
    // Add to the scene with `appendChild`.
    // ele.sceneEl.appendChild(newVoxelEl);
    ele.setAttribute('ply-model', 'src: #x-model');
  } else {
    ele.setAttribute('ply-model', 'src: #o-model');
  }
  ele.setAttribute('rotation', '270 0 0');
  ele.setAttribute('scale', '0.02 0.02 0.02');
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
  if (turn != user){
    setTimeout(bot, 1500);
  }
}
function bot(){
  var cells = document.querySelectorAll(".cell");
  var i;
  var arr = shuffleArray([0,1,2,3,4,5,6,7,8]);
  for (i = 0; i < cells.length; i++) {
      if (cells[arr[i]].getAttribute('visible') == false) {
        tictactoe(cells[arr[i]], true);
        break;
      }
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
                cell.removeAttribute('ply-model');
                cell.removeAttribute('rotation');
                cell.removeAttribute('scale');
              })
  var eles = document.querySelectorAll(".status");
  [].forEach.call(eles, function (ele) { ele.parentNode.removeChild(ele); })
  if (user != 'X'){
    bot();
  }
}

init();

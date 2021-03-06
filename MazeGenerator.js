var cols, rows;
var w = 40;
var grid = [];
var current; //current cell being visited

var stack = [];

function setup() {
  createCanvas(1000, 800);
  cols = floor(width / w);
  rows = floor(height / w);
  frameRate(15);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
} // end setup()

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  //RECURSIVE BACKTRACKER
  //STEP 1 : CHOOSE NEXT UNVISTED NEIGHBOR AND MARK AS VISITED
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    //STEP 2: PUSH CURRENT CELL TO STACK
    stack.push(current);

    //STEP 3: REMOVE WALL BETWEEN CURRENT CELL AND CHOSEN CELL
    removeWalls(current, next);

    //STEP 4: SET CHOSEN CELL THE CURRENT CELL
    current = next;
  } else if (stack.length > 0) {
    //if stuck, make use of the stack
    current = stack.pop(); //pop cell from stack and make current cell
  }
} //end draw()

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }

  return i + j * cols;
} //end index

function removeWalls(a, b) {
  var x = a.i - b.i;

  if (x == 1) {
    a.walls[3] = false;
    b.walls[1] = false;
    console.log(a);
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;

  if (y == 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
} // end removeWalls

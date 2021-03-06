function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true]; //top, right, bottom, left
  this.visited = false; //keeps track of where the cell has gone/has not gone

  this.checkNeighbors = function () {
    var neighbors = [];

    var top = grid[index(i, j - 1)];
    var right = grid[index(i + 1, j)];
    var bottom = grid[index(i, j + 1)];
    var left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }; //end checkedNeighbors

  this.highlight = function () {
    var x = this.i * w;
    var y = this.j * w;
    noStroke();
    fill(255, 183, 39);
    rect(x, y, w, w);
  }; //end highlight

  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);

    //if wall equals true, we will draw these lines:
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      noStroke();
      fill(0, 34, 102);
      rect(x, y, w, w);
    }
  }; //end show
} // end Cell()

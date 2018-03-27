let grid;
let cols;
let rows;
let cWidth = 1000;
let cHeight = 1000;
const resolution = 10;
let res = [];

const genBool = () => Math.round(Math.random());
const arr2dFilled = (col, row, gen) => Array(col).fill().map(() => Array(row).fill().map(() => gen.call()));

const drawGrid = (arr2d) => {
  arr2d.forEach((col, i) => {
    col.forEach((row, j) => {
      fill(row * 255);
      stroke(0);
      rect( 
            i * resolution, 
            j * resolution, 
            resolution, 
            resolution
          );
    });
  });
}

const countNeighbors = (arr2d, x, y) => {
  let sum = 0 - arr2d[x][y];
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let c = (x + i + cols) % cols;
      let r = (y + j + rows) % rows;
      sum += arr2d[c][r];
    }
  }
  return sum;
}

function setup() {
  createCanvas(cWidth + 1, cHeight + 1); // +1 in order to display left and bottom border
  background(0);

  cols = cWidth / resolution;
  rows = cHeight / resolution;
  
  grid = arr2dFilled(cols, rows, genBool);
  drawGrid(grid);
}

function draw() {
  let next = arr2dFilled(cols, rows, () => undefined);
  grid.forEach((col, i) => {
    col.forEach((row, j) => {
      let sumNeighbors = countNeighbors(grid, i, j);
      let me = grid[i][j];

      if(me == 0 && sumNeighbors == 3) {
        next[i][j] = 1;
      } 
      else if (me == 1 && (sumNeighbors < 2 || sumNeighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = me;
      }
    });
  });
  drawGrid(next);
  grid = next;
}
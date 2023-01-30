const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const gridSize = 10;
const width = canvas.width / gridSize;
const height = canvas.height / gridSize;

// initialize grid with all cells set to white
const grid = [];
for (let i = 0; i < width; i++) {
  grid[i] = [];
  for (let j = 0; j < height; j++) {
    grid[i][j] = "white";
  }
}

// initial position of the ant and direction
let x = Math.floor(width / 2);
let y = Math.floor(height / 2);
let direction = "up";

// function to update the ant's direction based on current cell color
const updateDirection = (color) => {
  switch (color) {
    case "white":
      switch (direction) {
        case "up":
          direction = "right";
          break;
        case "right":
          direction = "down";
          break;
        case "down":
          direction = "left";
          break;
        case "left":
          direction = "up";
          break;
      }
      break;
    case "black":
      switch (direction) {
        case "up":
          direction = "left";
          break;
        case "left":
          direction = "down";
          break;
        case "down":
          direction = "right";
          break;
        case "right":
          direction = "up";
          break;
      }
      break;
  }
};

// function to move the ant to the next cell
const moveAnt = () => {
  switch (direction) {
    case "up":
      y--;
      break;
    case "right":
      x++;
      break;
    case "down":
      y++;
      break;
    case "left":
      x--;
      break;
  }

  // wrap around edges
  x = (x + width) % width;
  y = (y + height) % height;
};

// function to update the grid and draw on canvas
const update = () => {
  const color = grid[x][y];
  updateDirection(color);

  grid[x][y] = color === "white" ? "black" : "white";
  ctx.fillStyle = grid[x][y];
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);

  moveAnt();
};

// run the simulation
setInterval(update, 50);

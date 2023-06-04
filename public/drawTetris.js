// viewport canvas dimensions
const canvasSizeX = 1000;
const canvasSizeY = 2000;
const playfieldSizeX = 10;
const playfieldSizeY = 20;
var playfieldCanvas = document.getElementById("board");

// draws a block on the 10x20 tetris board
const drawBlock = (x, y, c) => {
    let ctx = playfieldCanvas.getContext("2d");
    ctx.fillStyle = c;

    // scale the block to the board
    sizeCoefX = canvasSizeX / playfieldSizeX;
    sizeCoefY = canvasSizeY / playfieldSizeY;

    // draw block if the coords are in range
    if(x < 10 && y < 20 && x >= 0 && y >= 0)
        ctx.fillRect(x * sizeCoefX, y * sizeCoefY, sizeCoefX, sizeCoefY);
}

// clear the visible screen
const cls = () => {
    let ctx = playfieldCanvas.getContext("2d");
    ctx.clearRect(0, 0, canvasSizeX, canvasSizeY);
}
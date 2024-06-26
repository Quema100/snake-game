//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = Math.floor(Math.random() * cols) * blockSize;
var snakeY = Math.floor(Math.random() * rows) * blockSize;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];
let retry = false
//food
var foodX;
var foodY;

let GameOver = false

let main = () => {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);

    setInterval(update, 100); //100 milliseconds
}

window.onload = main

let update = () => {

    if (GameOver){
        console.log("here")
        return window.location.reload(),GameOver = false;
    }

    console.log(snakeBody.length)
    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX >= cols*blockSize || snakeY < 0 || snakeY >= rows*blockSize) {
        alert(`Game Over\nbest Score:${snakeBody.length}`);
        GameOver = true
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            alert(`Game Over\nbest Score:${snakeBody.length}`);
            GameOver = true
        }
    }
}

let changeDirection = (e) => {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


let placeFood = () => {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
//game unit
  const box = 32;
//load images
  //background image
  const ground = new Image();
  ground.src = "img/ground.png";
  // food image the apple
  const foodImg = new Image();
  foodImg.src = "img/food.png";

  //load audio files
    const dead = new Audio();
    const eat = new Audio();
    const up = new Audio();
    const left = new Audio();
    const right = new Audio();
    const down = new Audio();

    dead.src = "audio/dead.mp3";
    eat.src = "audio/eat.mp3";
    up.src = "audio/up.mp3";
    right.src = "audio/right.mp3";
    left.src = "audio/left.mp3";
    down.src = "audio/down.mp3";



  //create the snake object
  let snake = [];
  //iniate the snake at a fixed position on the canvas
    snake[0] = {
    x : 9*box,
    y : 10*box
  }
  //create food at a random location
  let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box
  }
  //score variable
  let score = 0;
  let d;

  // snake controls
  document.addEventListener("keydown",direction);
  function direction(event) {
    if (event.keyCode == 37) {
      if (snake.length == 1) {
      left.play();
      d = "Left";
    }
      else if ( d != "Right" ) {
        left.play();
        d = "Left";
      }

    }else if (event.keyCode == 38) {
      if (snake.length == 1) {
      up.play();
      d = "Up";
    }else if ( d != "Down" ) {
      up.play();
      d = "Up";
    }
    }else if (event.keyCode == 39) {
      if (snake.length == 1 ) {
      right.play();
      d = "Right";
    }else if ( d != "Left" ) {
      right.play();
      d = "Right";
    }
    }else if (event.keyCode == 40) {
      if (snake.length == 1 ) {
      down.play();
      d = "Down";
    }else if ( d != "Up" ) {
      down.play();
      d = "Down";
    }
  }
}





  //draw everything to the canvas gets called every 100ms!
  function draw() {
    ctx.drawImage(ground,0,0);
    for ( let i =0; i < snake.length ; i++) {
      ctx.fillStyle = ( i == 0 )? "green" : "white";
      ctx.fillRect(snake[i].x,snake[i].y,box,box);
      //mark the rectangle with red stroke
      ctx.strokeStyle = "red";
      ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    //draw the food
    ctx.drawImage(foodImg, food.x, food.y);

    //Old head position
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;
    //direction decoding
      if ( d == "Left") snakeX -= box;
      if ( d == "Up") snakeY -= box;
      if ( d == "Right") snakeX += box;
      if ( d == "Down") snakeY += box;
      //check collision function
        function collision (head, array) {

          for (let i = 0; i<array.length; i++) {
            if (array[i].x == head.x && array[i].y == head.y ) {
              return true;
            }
          }
          return false;
        }
      //Snake eats the food scenario
        if ( snakeX == food.x && snakeY == food.y) {
          score++;
          eat.play();
          //generate new random food location
          food = {
            x : Math.floor(Math.random()*17 +1)*box,
            y : Math.floor(Math.random()*15+3)*box
          }
          //We don't remove the tail so the snake will grow!
        } else {
          //remove tail of the snake
          snake.pop();
        }

        //add new Head
        let newHead = {
          x : snakeX,
          y : snakeY
        }
        //Game Over Conditions
          if (snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box ||
            collision(newHead, snake)) {
            clearInterval(game);
            ctx.fillStyle = "red";
            ctx.font = "45px Changa one";
            ctx.fillText("GameOver",4*box,1.6*box);
            dead.play();
          }

      //insert the new head to the first cell of the array
        snake.unshift(newHead);
    //draw the Score !
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
  }
  //call the draw function every 100ms
  let game = setInterval(draw,100);

document.addEventListener("DOMContentLoaded", () => {
    const bird = document.querySelector(".bird");
    const gameDisplay = document.querySelector(".game-container");
    const ground = document.querySelector(".ground");
  
    let birdLeft = 220;
    let birdBotton = 100;
    let gravity = 2;
    let isGameOver = false;
    let gap = 430;
    let score = 0;
  
    function startGame() {
      birdBotton -= gravity;
      bird.style.bottom = birdBotton + "px";
      bird.style.left = birdLeft + "px";
    }
    let gameTimerId = setInterval(startGame, 20);
  
    function control(e) {
      if (e.keyCode === 32) {
        jump();
      }
    }
  
    function jump() {
      if (birdBotton < 500) {
        birdBotton += 50;
      }
      bird.style.bottom = birdBotton + "px";
      console.log(birdBotton);
    }
    document.addEventListener("keyup", control);
  
    function generateObstacle() {
      let obstacleLeft = 500;
      let randomHeight = Math.random() * 150;
      let obstacleBottom = randomHeight;
      const obstacle = document.createElement("div");
      const topObstacle = document.createElement("div");
      if (!isGameOver) {
        obstacle.classList.add("obstacle");
        topObstacle.classList.add("topObstacle");
      }
      gameDisplay.appendChild(obstacle);
      gameDisplay.appendChild(topObstacle);
      obstacle.style.left = obstacleLeft + "px";
      topObstacle.style.left = obstacleLeft + "px";
      obstacle.style.bottom = obstacleBottom + "px";
      topObstacle.style.bottom = obstacleBottom + gap + "px";
  
      function moveObstacle() {
        obstacleLeft -= 2;
        obstacle.style.left = obstacleLeft + "px";
        topObstacle.style.left = obstacleLeft + "px";
  
        if (obstacleLeft === -60) {
          clearInterval(timerId);
          gameDisplay.removeChild(obstacle);
          gameDisplay.removeChild(topObstacle);
        }
        if (
          obstacleLeft > 200 &&
          obstacleLeft < 280 &&
          birdLeft === 220 &&
          (
            birdBotton < obstacleBottom + 153 ||
            birdBotton > obstacleBottom + gap - 200
          ) ||
          birdBotton === 0
        ) {
          gameOver();
          clearInterval(timerId);
        }
      }
      let timerId = setInterval(moveObstacle, 20);
      if (!isGameOver) {
        setTimeout(generateObstacle, 2000);
        score++;
        const points = document.getElementById("points");
        points.innerText = `Score: ${score}`;
      }
    }
    generateObstacle();
  
    function gameOver() {
      clearInterval(gameTimerId);
      isGameOver = true;
      document.removeEventListener("keyup", control);
      const go = document.getElementById("go");
      go.textContent = 'GAME OVER';
      const rs = document.getElementById("rs");
      rs.innerText = "Press 'ENTER' Key to Restart the Game";
      rs.style.backgroundColor = "greenyellow";
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      window.location.reload();
    }
  });
  
  
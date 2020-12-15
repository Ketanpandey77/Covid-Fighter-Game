function load_image() {
    // console.log("Loaded images");

    enemy_image = new Image;
    enemy_image.src = "Assets/v1.png";

    player_image = new Image;
    player_image.src = "Assets/superhero.png";

    gem_image = new Image;
    gem_image.src = "Assets/gemmm.svg";
}

function init() {
    // console.log("Initial() called");

    canvas = document.getElementById("mycanvas");
    gameOver=false;
    H = 400;
    W = 700;

    canvas.height = H;
    canvas.width = W;

    pen = canvas.getContext('2d');

    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20,
    };

    e2 = {
        x: 300,
        y: 100,
        w: 60,
        h: 60,
        speed: 30,
    };

    e3 = {
        x: 450,
        y: 20,
        w: 60,
        h: 60,
        speed: 40,
    };

    enemy = [e1, e2, e3];

    player = {
        x: 10,
        y: H / 2 - 30,
        w: 60,
        h: 60,
        speed: 20,
        moving: false,
        Score:100,
    };

    gem = {
        x: W - 100,
        y: H / 2 - 30,
        w: 60,
        h: 60,
    };

    function movement() {
        console.log("Mouse pressed");
        player.moving = true;
    }

    canvas.addEventListener('mousedown', movement);

    function stop() {
        console.log("Mouse released");
        player.moving = false;
    }

    canvas.addEventListener('mouseup', stop);


}

function isCollission(rect1,rect2) {

    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        // collision detected!

        return true;
    }
    return false;
}

function draw() {
    // console.log("Draw() called");

    pen.clearRect(0, 0, W, H);
    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }

    pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);
    pen.drawImage(player_image, player.x, player.y, player.w, player.h);
    pen.fillStyle="white";
    pen.fillText("Score:"+player.Score,20,20);


}

function update() {
    // console.log("Update() called");

    if (player.moving == true) {
        player.x += player.speed;
        player.Score+=20;
    }

    for(let i=0;i<enemy.length;i++){
        if(isCollission(player,enemy[i])){
            player.Score-=40;
        }
        if(player.Score<0){
            gameOver=true;
            
            alert("Game Over Player's helath "+player.Score);
            
            if(gameOver==true){
                clearInterval(f);
            }
    
        }
    }

    if(isCollission(player,gem)==true){
        console.log("You won");
        alert("You won");
        gamoOver=true;
          
        if(gameOver==true){
            clearInterval(f);
        }
    
    }

    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;

        if (enemy[i].y > H - enemy[i].h || enemy[i].y < 0) {
            enemy[i].speed *= -1;
        }
    }
}

function gameLoop() {
    // console.log("GameLoop() called")
  
    draw();
    update();
}

load_image();
init();
f = setInterval(gameLoop, 100);
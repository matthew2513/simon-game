const buttonColors = ["red", "blue", "green", "yellow"];

const gamePattern = [];

const userClickedPattern = [];

let level = 0;

function nextSequence() {
  userClickedPattern.length = 0; //clear all the elements while keeping the original reference(const)

  level++;
  $("#level-title").text(`Level ${level}`);

  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100); //animate flash

  playSound(randomChosenColor);
}

//for user
$(".btn").on("click", function () {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

//play sound base on the color
function playSound(name) {
  var audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

//animation when button is pressed
function animatePress(currentColor) {
  let pressed = $(`.${currentColor}`);

  pressed.addClass("pressed");
  setTimeout(() => {
    pressed.removeClass("pressed");
  }, 100);
}

//starting the game
let gameStarted = false; //keeping tracK wether the game has started

$(document).on("keydown", function () {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");

    const body = $("body");

    body.addClass("game-over");
    setTimeout(() => {
      body.removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

//restarting the game
function startOver() {
  level = 0;

  gamePattern.length = 0;

  gameStarted = false;
}

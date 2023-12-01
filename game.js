const buttonColors = ["red", "purple", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(".btn").click(function() {
    animatePress(this.id, "userPressed");
    playSound(this.id);
    userClickedPattern.push(this.id);

    if (userClickedPattern[userClickedPattern.length - 1] !== gamePattern[userClickedPattern.length - 1]) {
        let gameOver = new Audio("./sounds/wrong.mp3");
        gameOver.play();
        $("#overlay h1").text("GAME OVER");
        $("#overlay").css("background-color", "#690000")
        $("#overlay").fadeToggle();
        setTimeout(function(){
            location.reload();
        }, 5000);
    } else {
        if (userClickedPattern.length === gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 500);
        }
    }
});

function nextSequence() {
    level = level + 1;
    $("#level-title").text(`Level ${level}`);

    let randomNumber = Math.round(Math.random() * 3);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    setTimeout(function(){
        for (let i = 0; i < gamePattern.length; i++) {
            (function(i) {
                setTimeout(function() {
                    animatePress(gamePattern[i], "gamePressed")
                    playSound(gamePattern[i]);
                }, 500 * i);
            })(i);
        }
    }, 500);
}

function playSound(htmlId) {
    let buttonSound = new Audio(`./sounds/${htmlId}.mp3`);
    buttonSound.play();
}

function animatePress(htmlId, cssClass) {
    $(`#${htmlId}`).addClass(cssClass);
    setTimeout(function(){
        $(`#${htmlId}`).removeClass(cssClass);
    }, 250);
}

$(document).one('keydown', function(){
    $("#overlay").fadeToggle();
    $("#level-title").text(`Level ${level}`);
    setTimeout(function(){
        nextSequence();
    }, 1000)
});

$(document).one('click', function(){
    $("#overlay").fadeToggle();
    $("#level-title").text(`Level ${level}`);
    setTimeout(function(){
        nextSequence();
    }, 1000)
});
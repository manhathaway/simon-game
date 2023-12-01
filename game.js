const buttonColors = ["red", "purple", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(".btn").click(function() {
    let userChosenColor = this.id;
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);

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
    for (let i = 0; i < gamePattern.length; i++) {
        (function(i) {
            setTimeout(function() {
                playSound(gamePattern[i]);
            }, 500 * i);
        })(i);
    }
}

function playSound(name) {
    $(`#${name}`).fadeIn(100).fadeOut(100).fadeIn(100);
    let buttonSound = new Audio(`./sounds/${name}.mp3`);
    buttonSound.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

$(window).one('keydown', function(){
    $("#overlay").fadeToggle();
    $("#level-title").text(`Level ${level}`);
    setTimeout(function(){
        nextSequence();
    }, 1000)
});

/*
$(window).one('click', function(){
    $("#overlay").fadeToggle();
    $("#level-title").text(`Level ${level}`);
    setTimeout(function(){
        nextSequence();
    }, 1000)
});
*/
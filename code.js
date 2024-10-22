const allButtons = ["green", "red", "yellow", "blue"];
let level = 1;
let sequenceArr = [];
let count = 0;
let color;

$("#start").click(function() {
    if (sequenceArr.length === 0) {
        $("#start").css({
            "background-color": "#0f0",
            "box-shadow": "0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0"
        });
        $("h1").html("Level " + level);
        color = createSequence();
        displaySequence();
    } else {
        $("#start").css({
            "background-color": "#f00",
            "box-shadow": "0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00"
        });
        $("h1").html("Press the start button to play");
        resetGame();
    }
});

for (let i = 0; i < 4; i++) {
    $("." + allButtons[i]).click(function() {
        if (sequenceArr.length !== 0) {
            buttonBlink(allButtons[i]);
            game(i);
        }
    });
}

function game(num) {
    if (num === sequenceArr[count]) {
        playAudio(allButtons[num]);
        if (count + 1 === level) {
            levelUp();
        } else {
            count++;
        }
    } else {
        gameOver();
    }
}

function levelUp() {
    color = createSequence();
    setTimeout(function() {
        buttonBlink(allButtons[color]);
        playAudio(allButtons[color]);
        count = 0;
        $("h1").html("Level " + level);
    }, 1000);
    level++;
}

function gameOver() {
    $("h1").html("Game Over");
    playAudio("wrong");
    $("#start").css({
        "background-color": "#f00",
        "box-shadow": "0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00"
    });
    screenAnimation();
    resetGame();
}

function createSequence() {
    const randomButton = Math.floor(Math.random() * 4);
    sequenceArr.push(randomButton);
    return randomButton;
}

function displaySequence() {
    let index = 0;
    function showNextButton() {
        if (index < sequenceArr.length) {
            buttonBlink(allButtons[sequenceArr[index]]);
            playAudio(allButtons[sequenceArr[index]]);
            index++;
            setTimeout(showNextButton, 600); // Adjust timing to match your animation duration
        }
    }
    showNextButton();
}

function buttonBlink(color) {
    $("." + color).css({
        "animation-name": color,
        "animation-duration": "0.4s"
    });
    setTimeout(function() {
        removeAnimation(color);
    }, 400);
}

function removeAnimation(color) {
    $("." + color).css({
        "animation-name": "",
        "animation-duration": ""
    });
}

function screenAnimation() {
    $("body").css({
        "animation-name": "red",
        "animation-duration": "0.4s"
    });
    setTimeout(function() {
        $("body").css({
            "animation-name": "",
            "animation-duration": ""
        });
    }, 400);
}

function playAudio(color) {
    const audio = new Audio(`./${color}.mp3`);
    audio.play();
}

function resetGame() {
    sequenceArr = [];
    count = 0;
    level = 1;
}

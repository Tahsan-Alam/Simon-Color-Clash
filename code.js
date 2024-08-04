const allButtons = ["green", "red", "yellow", "blue"];
var level = 1;
var sequenceArr = [];
var count = 0;
var color;

$("#start").click( function(){
    if(sequenceArr.length === 0){
        $("#start").css({
            "background-color": "#0f0",
            "box-shadow": "0 0 10px #0f0, 0 0 20px #0f0, 0 0 30px #0f0, 0 0 40px #0f0"
        })
        $("h1").html("level" + " " + level);
        color = createSequence();
        buttonBlink(allButtons[color]);
        var audio = new Audio("./"+ allButtons[color] + ".mp3");
        audio.play();
        }
    else{
        $("#start").css({
            "background-color": "#f00",
            "box-shadow": "0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00"
        })
        $("h1").html(" Press the start button to play");
        sequenceArr = [];
        count = 0;
        level = 1;
    }
})

for(let i = 0; i < 4; i++){
    $("." + allButtons[i]).click(function(){
        if(sequenceArr.length != 0){
            buttonBlink(allButtons[i]);
            game(i);   
        }
    })  
}


function game(num){
    if(num === sequenceArr[count]){
        var audio = new Audio("./"+allButtons[num] + ".mp3");
        audio.play();
        if(count + 1 != level){
            count++;
        }
        else{
            color = createSequence();
            setTimeout(function(){
                buttonBlink(allButtons[color]);
                var audio = new Audio("./"+allButtons[color] + ".mp3");
                audio.play();
            }, 1000)
            
            level++;
            $("h1").html("level" + " " + level);
            count = 0;
            
        }
    }
    else{
        $("h1").html("Game Over");
        var audio = new Audio("./wrong.mp3");
        audio.play();
        $("#start").css({
            "background-color": "#f00",
            "box-shadow": "0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00"
        })
        screenAnimation()
        sequenceArr = [];
        count = 0;
        level = 1;
    }

}


function createSequence(){
    randomButton = Math.floor(Math.random() * 4);
    sequenceArr.push(randomButton);
    return randomButton;
}

function buttonBlink(color){
    $("."+ color).css({
        "animation-name": color,
        "animation-duration": "0.4s"
    })
    setTimeout(function(){
        removeAnimation(color);
    },400)
}

function removeAnimation(color){
    $("."+ color).css({
        "animation-name": "",
        "animation-duration": ""
    })
}

function screenAnimation(){
    $("body").css({
        "animation-name": "red",
        "animation-duration": "0.4s"
    })
    setTimeout(function(){
        $("body").css({
            "animation-name": "",
            "animation-duration": ""
        })
    },2)
}


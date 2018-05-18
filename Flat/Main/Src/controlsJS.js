//Canvas Declarations
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Event Listeners
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

ctx.font = "48px Arial";
ctx.fillText("Controls\n", 200, 50);
ctx.font = "26px Arial";
ctx.fillText("The controls are simple.  Use the arrow keys to", 20, 75);
ctx.fillText("move the character and the spacebar to attack!", 20, 100);

//Image Declarations
var enterKey = new Image();
enterKey.src = "images/computer_key_enter.png";
var arrowKeys = new Image();
arrowKeys.src = "images/arrow-keys-vectors.jpg";

arrowKeys.onload = function()
{
    render();
};


function render()
{
    ctx.drawImage(enterKey, 350, 125);
    ctx.drawImage(arrowKeys, 70, 120);
    flashingText();

}


//Confirmation Variable
var enterPressed = false;

function onKeyDown(e)
{
    console.log(e.keyCode);
    switch(e.keyCode)
    {

        case 13:
            enterPressed = true;
            break;
        default:
            break;
    }
}

function onKeyUp(e)
{
    switch (e.keyCode) {
        case 13:
            enterPressed = false;
            break;
        default:
            break;
    }
}

function loadGame()
{
    if(enterPressed)
    {
        //load game
    }
}

function flashingText()
{
    var count = 0;
    var timer = setInterval(function()
    {
        count++;
        if(count%2 == 1)
        {
            ctx.font = "26px Arial";
            ctx.fillStyle = '#000000';
            ctx.fillText("Press Enter to Continue...", 150, 275);
            console.log(count);
        }
        else
        {
            ctx.clearRect(0,250, 600, 26);
            /*ctx.font = "26px Arial";
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText("Press Enter to Continue...", 150, 275);*/
        }

    }, 1000);
}
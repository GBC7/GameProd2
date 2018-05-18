//Canvas Declarations
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


ctx.font = "48px Arial";
ctx.fillText("Controls\n", 200, 50);
ctx.font = "26px Arial";
ctx.fillText("The controls are simple.  Use the arrow keys to", 20, 75);
ctx.fillText("move the character and the spacebar to attack!", 20, 100);

//Image Declarations
var enterKey = new Image();
enterKey.src = "../images/computer_key_enter.png";
var arrowKeys = new Image();
arrowKeys.src = "../images/arrow-keys-vectors.jpg";

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

var count = 0;
var timer = setInterval(flashingText, 1000);
function flashingText()
{
    count++;
    if(count%2 === 1)
    {
        ctx.font = "26px Arial";
        ctx.fillStyle = '#000000';
        ctx.fillText("Press Enter to Continue...", 150, 275);
    }
    else
    {
        ctx.clearRect(0,250, 600, 26);
    }
}
setTimeout(input, 500);                                                    // after all effect, add keyboard input

function input()
{
    window.addEventListener("keyup", startGame);

    function startGame()
    {
        clearInterval(timer);
        location.href = 'Main.html'                                         //next page link
    }

}


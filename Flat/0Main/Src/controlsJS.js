//Canvas Declarations
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = '#ffffff';
ctx.fillRect(0,0,800,600);
ctx.font = "48px Arial";
ctx.fillStyle = '#000000';
ctx.fillText("Controls\n", 300, 100);
ctx.font = "26px Arial";
ctx.fillText("The controls are simple.  Use the arrow keys to", 120, 175);
ctx.fillText("move the character and the spacebar to attack!", 120, 200);

//Image Declarations
var enterKey = new Image();
enterKey.src = "../images/computer_key_spacebar.png";
var arrowKeys = new Image();
arrowKeys.src = "../images/arrow-keys-vectors.jpg";

arrowKeys.onload = function()
{
    render();
};


function render()
{
    ctx.drawImage(enterKey, 450, 275);
    ctx.drawImage(arrowKeys, 170, 270);
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
        ctx.fillText("Press Enter to Continue...", 250, 475);
    }
    else
    {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0,450, 800, 26);
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


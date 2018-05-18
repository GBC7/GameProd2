//Canvas Declarations
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


let warningBackground = new Image();
warningBackground.src = "../images/warning.gif";


/*//Event Listeners
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);*/


ctx.fillRect(450,0,100,20);
ctx.fillRect(450,270,100,20);
ctx.font = "20px Arial";
ctx.fillStyle = '#FF0000';
ctx.fillText("There is violence in", 385, 100);
ctx.fillText("this game that might ", 385, 122);
ctx.fillText("be offensive to some ", 385, 144);
ctx.fillText("people.  Players be  ", 385, 166);
ctx.fillText("advised.  ", 385, 188);

let timer = setInterval(flashingText, 1000);

let count = 0;
function flashingText()
{
    count++;
    if(count%2 === 1)
    {
        ctx.font = "20px Arial";
        ctx.fillStyle ='#FF0000';
        ctx.fillText("Press Enter to Continue...", 190, 280);
    }
    else
    {
        ctx.clearRect(0,250, 420, 50);
        /*ctx.font = "26px Arial";
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText("Press Enter to Continue...", 150, 275);*/
    }
}

setTimeout(input, 500);                                                    // after all effect, add keyboard input

function input()
{
    window.addEventListener("keyup", startGame);

    function startGame()
    {
        clearInterval(timer);
        location.href = 'controls.html'                                         //next page link
    }

}
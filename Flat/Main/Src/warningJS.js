//Canvas Declarations
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");


var warningBackground = new Image();
warningBackground.src = "images/warning.gif";


//Event Listeners
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);


ctx.fillRect(450,0,100,20);
ctx.fillRect(450,270,100,20);
ctx.font = "20px Arial";
ctx.fillStyle = '#FF0000';
ctx.fillText("There is violence in", 385, 100);
ctx.fillText("this game that might ", 385, 122);
ctx.fillText("be offensive to some ", 385, 144);
ctx.fillText("people.  Players be  ", 385, 166);
ctx.fillText("advised.  ", 385, 188);
flashingText();


//Confirmation Variable
var enterPressed = false;

function onKeyDown(e)
{
    console.log(e.keyCode);
    switch(e.keyCode)
    {

        case 13:
            enterPressed = true;
            loadControls();
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

function flashingText()
{
    var count = 0;
    var timer = setInterval(function()
    {
        count++;
        if(count%2 == 1)
        {
            ctx.font = "20px Arial";
            ctx.fillStyle ='#FF0000';
            ctx.fillText("Press Enter to Continue...", 190, 280);
            console.log(count);
        }
        else
        {
            ctx.clearRect(0,250, 420, 50);
            /*ctx.font = "26px Arial";
            ctx.fillStyle = '#FFFFFF';
            ctx.fillText("Press Enter to Continue...", 150, 275);*/
        }

    }, 1000);
}

function loadControls()
{
    if(enterPressed)
    {
        location.href = 'controls.html'                                         //next page link
    }
}

let keyPressCount = 0;


function initializeTutorialLV1()
{
    removeEventListener("keydown", onKeyDown, false);
    dialogText(names[4], TutorialL1[1], "20 px", "white");
    setTimeout(startChecks, 1000);
}

function startChecks()
{
    addEventListener("keydown", leftCheck, false);
}

function leftCheck(e)
{
        if(e.keyCode === 37) //Left
        {
            onKeyDown(e);
            dialogText(names[4], TutorialL1[8], "20 px", "white");
            removeEventListener("keydown", leftCheck, false);
            addEventListener("keydown", rightCheck, false);
        }
        else
        {
            dialogText(names[4], TutorialL1[7], "20 px", "white");
        }
}

function rightCheck(e)
{
        if(e.keyCode === 39) //Right
        {
            onKeyDown(e);
            dialogText(names[4], TutorialL1[2], "20 px", "white");
            removeEventListener("keydown", rightCheck, false);
            addEventListener("keydown", upCheck, false);
        }
        else
        {
            dialogText(names[4], TutorialL1[7], "20 px", "white");
        }
}

function upCheck(e)
{
    if(e.keyCode === 38) //Up
    {
        onKeyDown(e);
        dialogText(names[4], TutorialL1[9], "20 px", "white");
        removeEventListener("keydown", upCheck, false);
        addEventListener("keydown", downCheck, false);

    }
    else
    {
        dialogText(names[4], TutorialL1[7], "20 px", "white");
    }
}

function downCheck(e)
{
    if(e.keyCode === 40) //Down
    {
        onKeyDown(e);
        dialogText(names[4], TutorialL1[5], "20 px", "white");
        removeEventListener("keydown", downCheck, false);
        addEventListener("keydown", checkWalk, false);
    }
    else
    {
        dialogText(names[4], TutorialL1[7], "20 px", "white");
    }
}

function checkWalk(e)
{
    if(e.keyCode===38)
    {
        onKeyDown(e);
        keyPressCount++;

        console.log(keyPressCount);
    }
    else
    {
        dialogText(names[4], TutorialL1[7], "20 px", "white");
    }

    if(keyPressCount === 6)
    {
        removeEventListener("keydown", checkWalk, false);
        addEventListener("keydown", spaceObjectCheck, false);
    }
}

function spaceObjectCheck(e)
{
    if(e.keyCode === 32) //Space
    {
        onKeyDown(e);//Will call check actions

        console.log("Y1");
        dialogText(names[4], TutorialL1[3], "20 px", "white");
        removeEventListener("keydown", spaceObjectCheck, false);
        addEventListener("keydown", spaceButlerCheck, false);
    }
    else {
        dialogText(names[4], TutorialL1[4], "20 px", "white");
    }
}

function spaceButlerCheck(e)
{

        if(e.keyCode === 32) //Space
        {
            onKeyDown(e);//Will call check actions

            console.log("Y2");
            dialogText(names[4], TutorialL1[6], "20 px", "white");
        }
        else
        {
            dialogText(names[4], TutorialL1[7], "20 px", "white");
        }


}
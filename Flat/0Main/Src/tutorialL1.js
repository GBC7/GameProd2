


function initializeTutorialLV1()
{
    removeEventListener("keydown", onKeyDown, false);
    dialogText(names[4], TutorialL1[1], "20 px", "white");
    setTimeout(startChecks, 1000);
}

function startChecks()
{
    addEventListener("keydown", leftCheck, false);
    addEventListener("keydown", onKeyDown, false);


}

function leftCheck(e)
{
    addEventListener("keydown", onKeyDown, false);
        if(e.keyCode === 37) //Left
        {

            dialogText(names[4], TutorialL1[8], "20 px", "white");
            removeEventListener("keydown", leftCheck, false);
            addEventListener("keydown", rightCheck, false);


        }
        else
        {
            dialogText(names[4], TutorialL1[7], "20 px", "white");
            removeEventListener("keydown", onKeyDown, false);
            addEventListener("keydown", onKeyDown, false);
        }



}

function rightCheck(e)
{
    addEventListener("keydown", onKeyDown, false);

        if(e.keyCode === 39) //Right
        {

            dialogText(names[4], TutorialL1[2], "20 px", "white");
            removeEventListener("keydown", rightCheck, false);
            addEventListener("keydown", upCheck, false);

        }
        else
        {
            dialogText(names[4], TutorialL1[7], "20 px", "white");
            removeEventListener("keydown", onKeyDown, false);
            addEventListener("keydown", onKeyDown, false);



        }



}

function upCheck(e)
{

    addEventListener("keydown", onKeyDown, false);

    if(e.keyCode === 38) //Up
    {

        dialogText(names[4], TutorialL1[9], "20 px", "white");
        removeEventListener("keydown", upCheck, false);
        addEventListener("keydown", downCheck, false);

    }
    else
    {
        dialogText(names[4], TutorialL1[7], "20 px", "white");
        removeEventListener("keydown", onKeyDown, false);
        addEventListener("keydown", onKeyDown, false);



    }



}

function downCheck(e)
{
    addEventListener("keydown", onKeyDown, false);
    if(e.keyCode === 40) //Down
    {

        dialogText(names[4], TutorialL1[5], "20 px", "white");
        setTimeout(startChecks, 1000);
        removeEventListener("keydown", downCheck, false);

        addEventListener("keydown", checkWalk, false);
    }
    else
    {
        dialogText(names[4], TutorialL1[7], "20 px", "white");
        removeEventListener("keydown", onKeyDown, false);
        addEventListener("keydown", onKeyDown, false);



    }
}

function checkWalk(e)
{
    addEventListener("keydown", onKeyDown, false);
    if (p.row === 11 && p.col === 1)
    {
        addEventListener("keydown", spaceObjectCheck, false);
    }
}

function spaceObjectCheck(e)
{
    addEventListener("keydown", onKeyDown, false);
    if(e.keyCode === 32) //Space
    {
        checkActions();
        console.log("Y1");
        dialogText(names[4], TutorialL1[3], "20 px", "white");
        removeEventListener("keydown", spaceObjectCheck, false);
        addEventListener("keydown", spaceButlerCheck, false);
    }
    else {
        dialogText(names[4], TutorialL1[4], "20 px", "white");
        removeEventListener("keydown", onKeyDown, false);
        addEventListener("keydown", onKeyDown, false);

    }
}

function spaceButlerCheck(e)
{

        if(e.keyCode === 32) //Up
        {
            checkActions();
            console.log("Y2");
            dialogText(names[4], TutorialL1[6], "20 px", "white");
            removeEventListener("keydown", spaceButlerCheck, false);
            removeEventListener("keydown", leftCheck, false);
            removeEventListener("keydown", rightCheck, false);
            removeEventListener("keydown", upCheck, false);
            removeEventListener("keydown", downCheck, false);
            removeEventListener("keydown", spaceObjectCheck, false);
            addEventListener("keydown", onKeyDown, false);
        }
        else
        {
            dialogText(names[4], TutorialL1[7], "20 px", "white");
            removeEventListener("keydown", onKeyDown, false);
            addEventListener("keydown", onKeyDown, false);

        }


}
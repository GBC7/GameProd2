let tutorialLV1bool = false;
let arrowUpTutorialLV1 = false;
let arrowDownTutorialLV1 = false;
let arrowLeftTutorialLV1 = false;
let arrowRightTutorialLV1 = false;
let interactionWithButler = false;
let interactionWithObject = false;





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

            arrowLeftTutorialLV1 = true;
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

            arrowRightTutorialLV1 = true;
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

        arrowUpTutorialLV1 = true;
        console.log("j");
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

        arrowDownTutorialLV1 = true;
        dialogText(names[4], TutorialL1[5], "20 px", "white");
        setTimeout(startChecks, 1000);
        removeEventListener("keydown", downCheck, false);
        addEventListener("keydown", spaceObjectCheck, false);
    }
    else
    {
        dialogText(names[4], TutorialL1[7], "20 px", "white");



    }
}

function spaceObjectCheck(e)
{

    if(e.keyCode === 38) //Up
    {

        interactionWithObject = true;
        dialogText(names[4], TutorialL1[6], "20 px", "white");
        removeEventListener("keydown", spaceObjectCheck, false);
        addEventListener("keydown", spaceButlerCheck, false);
    }
    else
    {
        dialogText(names[4], TutorialL1[4], "20 px", "white");



    }
   /* else if
    {
        dialogText(names[7], TutorialL1[4], "20 px", "white");
        setTimeout(dialogInitialize, 3000);


    }*/


}

function spaceButlerCheck(e)
{

        if(e.keyCode === 38) //Up
        {
            interactionWithButler = true;
            dialogText(names[4], TutorialL1[2], "20 px", "white");
            removeEventListener("keydown", spaceButlerCheck, false);
            addEventListener("keydown", onKeyDown, false);
        }
        else
        {
            dialogText(names[4], TutorialL1[7], "20 px", "white");

        }


}
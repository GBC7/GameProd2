let tutorialLV1bool = false;
let arrowUpTutorialLV1 = false;
let arrowDownTutorialLV1 = false;
let arrowLeftTutorialLV1 = false;
let arrowRightTutorialLV1 = false;
let spacebarTutorialLV1 = false;
let interactionWithButler = false;
let interactionWithObject = false;





function initializeTutorialLV1()
{
    removeEventListener("keydown", onKeyDown, false);
    dialogText(names[4], TutorialL1[1], "20 px", "white");
    setTimeout(dialogInitialize, 3000);


}


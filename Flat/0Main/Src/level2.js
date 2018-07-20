//*****Testing only*****//
let lightSwitch = 1, sewerSwitch = 1;                                //*****Testing only*****//
//*****Testing only*****//

//L2
let lightsOn = false, sewersDrained = false;                             //For sewer level
let alreadySwitched = false;
let floorSpriteX = undefined;                                           //For sewer level
let notWalking = true, canGoThisWay = false;                            //For boundaries and walking animation
let walkedUpAlready = false;                                            //For animating walking up fire escaped (l6)
let doorThreeOpen = false;                                              //For allowing walking through doorway (l2)
let alreadyBeenHere = false;
let alreadyShivering = false;
let torchesMapped = false;
let allTorchesLit = false;
let keepDrawingFlames = true;
let keyFound = false;
let burning, countingFlames;


//Sounds
let lockedDoor = new Audio;
let aghh = new Audio;
{
    waterRunning.src = ('../../2Sewer/audio/waterRunning.mp3');
    ratOfDeath.src = ('../../2Sewer/audio/ratOfDeath.mp3');
}


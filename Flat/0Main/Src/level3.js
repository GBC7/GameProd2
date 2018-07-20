//L3
let timer_level3;                                                        //For checking time for level 3
let timer_level3_enemy;                                                  //For checking time for level 3
let leftDoorOpen = false;
let rightDoorOpen = false;
let findPasscode = false;                                               //For clothing store
let findMap = false;                                                    //For clothing store
let findRollerblades = false;                                           //For clothing store
let findDisguise = false;                                               //For clothing store
let findAllLevel3 = false;
let enemyAppearLevel3 = false;
let detectPlayerLevel3 = false;
let enemyIndexLevel3 = 0; //global variable
let enemiesLevel3 = [];//Enemy Array Level 3


//Images
let windowClose = new Image();
let windowOpen = new Image();
let door1 = new Image();
let door2 = new Image();
let enemyImg = new Image();//enemy image (temp)
enemyImg.src = "../../3Store/images/enemy2.png";//enemy image (temp)

//Sounds
let warningSound = new Audio();
let bgm_level3 = new Audio;
let dangerous = new Audio;
{
    warningSound.src = ('../../3Store/audio/warningsound.mp3');
    bgm_level3.src = ("../../3Store/audio/clothingshop.mp3");
    dangerous.src = ("../../3Store/audio/enemyappear.mp3");
}


let warningTime = Math.floor(Math.random() * 20 + 10); // generate time to move 5~20
let findingTime = Math.floor(Math.random() * 10 + 5);  // generate time to wait 5~10


let CharacterName = document.getElementById("name");
let DialogText = document.getElementById("output");
let CharacterPortrait = document.getElementById("portrait");
let DialogBG = document.getElementById("dialog");

let dialogIndex = 0;
let tog = 2;

let names = [" ", "Scientist", "Mom"];  //Speaker's name, [0] is initial value
let portrait = [];
portrait[0] = "none";
portrait[1] = "url('../../0Main/images/Portrait_Scientist.png')";
portrait[2] = "url('../../0Main/images/Portrait_Mom.png')";
portrait[3] = "url('../../0Main/images/Portrait_newsanchor.png')";


let SystemMSGLevel1 = [];
let SystemMSGLevel2 = [];
let SystemMSGLevel3 = [];
let SystemMSGLevel4 = [];
let SystemMSGLevel5 = [];
let SystemMSGLevel6 = [];
let SystemMSGLevel7 = [];

let DialogNews = [];
let DialogLevel1 = [];
let DialogLevel2 = [];
let DialogLevel3 = [];
let DialogLevel4 = [];
let DialogLevel5 = [];
let DialogLevel6 = [];
let DialogLevel7 = [];


//level1 system text
SystemMSGLevel1[0] = " "; //initial value
SystemMSGLevel1[1] = "Roof is blocked by angry mob of scientist. Not sure if they’re smart for finding a way up here or the opposite for not having planned a way down. " +
    "Either way, I’m going to have to use the sewer for now.";

//level2 system text
SystemMSGLevel2[0] = " "; //initial value
SystemMSGLevel2[1] = "There has to be some way to brighten it up in here.";

//level3 system text
SystemMSGLevel3[0] = " "; //initial value
SystemMSGLevel3[1] = "I heard something! Mobbist will open window!\n";
SystemMSGLevel3[2] = "Mobbists are finding me!\nI'd rather not move ";


//level4 system text
SystemMSGLevel4[0] = ""; //initial value
SystemMSGLevel4[1] = "Quickly! \n I have to find the key to open Mom house \nSh**! Dressing like a girl is looking more appealing right about now."; 
SystemMSGLevel4[2] = "Sh**! Dressing like a girl is looking more appealing right about now.";

//level5 system text
SystemMSGLevel5[0] = " "; //initial value
SystemMSGLevel5[1] = "Mob has moved on to the lab in order to find and disprove the paper. " +
                     "However, the ones who somehow found their way to the roof didn’t plan a way to get down. They are stuck there."

//level6 system text
SystemMSGLevel6[0] = " "; //initial value
SystemMSGLevel6[1] = "Angry mob outside blocking the way is too large to fight off";
SystemMSGLevel6[2] = "There are people inside. You must have left one of the windows open or something. Let’s find where they’re getting in and block it before we get overwhelmed."

//level7 system text
SystemMSGLevel7[0] = " "; //initial value

DialogNews = [
    ["Last night we received a tip from a source who wishes to remain anonymous stating that",
        "He has scientific proof that the world is actually flat. Mobs of enraged scientists have formed outside his house.",]
];



//level1 Dialogue text
DialogLevel1 = [
    ["Hey son. I don’t know if you’ve heard yet, I called a publisher about that evidence you discovered.",
    "Ya, no sh**. Thanks for the heads up.",
    "I figured my son deserves to be recognized for his hard work!",
    "I can’t talk right now mom, I have to go destroy the evidence."]
];

//level2 Dialogue text
DialogLevel2 = [];

//level3 Dialogue text
DialogLevel3 = [
    ["Hey, a clothing store! Lucky the sewer’s staircase leads here. \nClosed mid-day too. Not odd at all.. Time to find a disguise."]
];


//level4 Dialogue text
DialogLevel4 = [
 ["There he is! \n We have to catch him."]
];

//level5 Dialogue text
DialogLevel5 = [
    ["Hi, mom.",
    "What are you doing here???",
    "I'm looking for papers. Do you know where it is?"]
];

//level6 Dialogue text
DialogLevel6 = [];

//level7 Dialogue text
DialogLevel7 = [];





function dialogInitialize() {  //clear dialogue
    CharacterName.innerHTML = names[0];
    DialogText.innerHTML = " ";
    CharacterPortrait.style.backgroundImage = portrait[0];
    DialogBG.style.backgroundImage = "none";
    DialogText.style.fontSize = "20px";
    DialogText.style.color = "white";
}

function dialogText(n, t, fs, fc){
    //n = name, t = text, fs = font size, fc = font color
    // can use array for n and t
    // fs and fc are supposed to be "number px" or "name of color"

    CharacterName.innerHTML = n;
    DialogText.innerHTML = t;
    DialogText.style.fontSize = fs;
    DialogText.style.color = fc;
    DialogBG.style.backgroundImage = "url('../../0Main/images/dialogueBG.png')";

    // to change portrait
    if (n === names[0]) {
        CharacterPortrait.style.backgroundImage = "none";
        DialogBG.style.backgroundImage = "none";
    }

    else if (n === names[1]){
        CharacterPortrait.style.backgroundImage = portrait[1];
    }

    else if (n === names[2]){
        CharacterPortrait.style.backgroundImage = portrait[2];
    }

    else if (n === names[3]){
        CharacterPortrait.style.backgroundImage = portrait[3];
    }

}

function Conversation(d, sn1, sp1, sn2, sp2) {
    // d -> dialog array
    // s1, sp1 -> speaker1 name, speaker1 portrait
    // s2, sp2 -> speaker2 name, speaker2 portrait

    let currentSpeaker;
    let speakerPortrait;

    tog = (tog === 1) ? 2 : 1;
    if (tog === 1) {
        currentSpeaker = sn1;
        speakerPortrait = sp1;
    }
    else {

        currentSpeaker = sn2;
        speakerPortrait = sp2;
    }
    CharacterName.innerText = currentSpeaker;
    CharacterPortrait.style.backgroundImage = speakerPortrait;
    DialogText.innerText = d[dialogIndex];

    DialogBG.style.backgroundImage = "url('../../0Main/images/dialogueBG.png')";
    dialogIndex++;

    if (dialogIndex > d.length){
        dialogIndex = 0;
        tog = 2;
        dialogInitialize();
    }
}

function CheckConversationAction() {

    if (l5)
    {
        if(p.row === 5 && p.col ===16) // test for conversation between two characters
            Conversation(DialogLevel5[0], names[1], portrait[1], names[2], portrait[2]);
    }

}
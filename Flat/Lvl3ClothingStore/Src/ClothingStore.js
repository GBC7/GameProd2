var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var windowOpen = false; //in order to check window status(later)

var p =         //PlayerObject

    {
        row: 14,
        col: 1,
        prevRow: undefined,        //Collects players previous x location to use for clearing only that section of canvas
        prevCol: undefined,        //Collects players previous y location to use for clearing only that section of canvas
        width: 32,               //The players width in the tile sheet
        height: 48,              //The players height in the tile sheet
        srcX: 0,                 //X location on tile sheet that current player image is coming from
        srcY: 0,                 //Y location on tile sheet that current player image is coming from
        frameX: 0,                //Counter to use for selecting section of tile sheet based on steps
        frameY: 0,
        right: false,
        left: false,
        up: false,
        down: false,
        startX: [0,0,0,0,0,0,0],
        starY: [0,0,0,0,0,0,0]
    };

var level3sprite = new Image();
level3sprite.src = "../../Lvl3ClothingStore/images/ClothingStoreSprite.png";

var scientist = new Image();                            //Declare image for player
scientist.src = "../../Main/images/scientist2.png";             //Set player image using player object



var map1 = [                    //10                          //20                          // 1F center - main floor
    [13,11,11,20,11,11,11,20,11,11,22,23,11,11,20,11,11,11,20,11,11,11,20,11,11],
    [13,12,12,12,12,12,12,12,12,12,24,25,12,12,12,12,12,12,12,12,12,12,12,12,12],
    [13,0,0,0,0,0,0,0,0,0,18,19,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,8,9,10,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,1,2,3,0,1,2,3,0,0,0,4,5,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,6,7,0,1,2,3,0,0,0,0,0,13],
    [13,0,0,1,2,3,0,1,2,3,0,0,0,0,0,0,0,0,0,0,1,2,3,0,13],
    [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [0,0,0,1,2,3,0,1,2,3,0,0,0,4,5,0,0,4,5,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,6,7,0,0,6,7,0,0,0,0,0,13],
    [13,0,0,1,2,3,0,1,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,17,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,1,2,3,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,4,5,4,5,0,0,4,5,0,0,4,5,0,0,0,4,5,0,0,0,0,13],
    [13,0,0,6,7,6,7,0,0,6,7,0,0,6,7,0,0,0,6,7,0,0,0,0,11],
    [13,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,12],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

var map2 = [                                                                // 1F west - cabinet room     : pass code
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,11,11,11,11,11,11,11,11,11,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,12,12,12,12,12,12,12,12,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,14,14,14,14,14,14,14,0,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,15,15,15,15,15,15,15,0,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,0,0,0,0,0,0,0,0,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,14,14,14,14,14,14,14,0,11],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,15,15,15,15,15,15,15,0,12],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,0,0,0,0,0,0,0,0,0],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,14,14,14,14,14,14,14,0,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,15,15,15,15,15,15,15,0,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,0,0,0,0,0,0,0,0,0,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13]
];

var map3 = [                                                                  //1F east north - staff room    : cloth
    [11,11,11,11,11,20,11,11,11,20,11,11,11,20,11,11,20,13,13,13,13,13,13,13,13],
    [12,12,12,12,12,12,12,12,12,12,12,12,12,12,14,14,12,13,13,13,13,13,13,13,13],
    [0,0,1,2,3,0,1,2,3,0,1,2,3,0,15,15,0,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13],
    [13,0,1,2,3,0,1,2,3,0,1,2,3,0,0,0,0,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,14,14,0,13,13,13,13,13,13,13,13],
    [13,0,4,5,0,4,5,0,4,5,0,4,5,0,15,15,0,13,13,13,13,13,13,13,13],
    [13,0,6,7,0,6,7,0,6,7,0,6,7,0,0,0,0,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13]
];

var map4 =[                                                         //1F east south- storage room    : 2F door switch
    [13,11,11,11,11,11,11,11,11,11,11,11,11,11,13,13,13,13,13,13,13,13,13,13,13],
    [13,14,14,14,14,14,14,14,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,13,13],
    [13,15,15,15,15,15,15,15,15,15,15,15,15,15,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,4,5,0,0,0,4,5,0,0,11,11,11,11,11,11,11,11,11,11,13],
    [13,0,4,5,0,6,7,0,0,0,6,7,0,0,12,12,12,12,12,14,14,12,12,12,13],
    [13,0,6,7,0,0,0,0,0,0,0,0,0,0,0,0,4,5,0,15,15,0,0,0,13],
    [13,0,0,0,0,0,0,4,5,0,0,0,0,0,0,0,6,7,0,0,0,0,4,5,13],
    [13,0,0,0,0,0,0,6,7,0,0,4,5,0,0,0,0,0,0,0,0,0,6,7,13],
    [13,0,0,4,5,0,0,0,0,0,0,6,7,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,6,7,0,0,0,0,0,0,0,0,0,1,2,3,0,1,2,3,0,0,0,13],
    [11,0,0,0,0,0,13,13,13,13,13,13,13,0,0,0,0,0,0,0,0,0,13,13,13],
    [12,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13]
];

var map5 = [                                                                                 //2F center - main floor
    [13,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11,11],
    [13,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
    [13,0,0,0,0,0,0,0,0,0,1,2,3,0,1,2,3,0,0,1,2,3,0,0,12],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [13,0,0,4,5,0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,6,7,0,0,6,7,0,0,0,0,0,1,2,3,0,1,2,3,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,16,0,0,0,4,5,0,0,4,5,0,0,0,1,2,3,0,1,2,3,0,0,0,13],
    [13,0,0,0,0,6,7,0,0,6,7,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,1,2,3,0,0,0,12],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [13,8,9,10,8,9,10,8,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,1,2,3,0,1,2,3,0,13],
    [13,8,9,10,8,9,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13]
];

var map6 = [                                                                                    // 2F east north room
    [11,11,11,11,11,11,11,11,11,11,11,11,11,11,13,13,13,13,13,13,13,13,13,13,13],
    [12,12,12,12,12,12,12,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,13,13],
    [0,0,1,2,3,0,1,2,3,0,1,2,3,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,1,2,3,0,1,2,3,0,1,2,3,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,4,5,0,4,5,0,4,5,0,4,5,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,6,7,0,6,7,0,6,7,0,6,7,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,1,2,3,0,1,2,3,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,8,9,10,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13]
];

var map7 = [                                                                          //2F east south room : staff key
    [13,11,11,11,11,11,11,11,11,11,11,11,13,13,11,11,11,11,11,11,11,11,11,11,13],
    [13,12,12,12,12,12,12,12,12,12,12,12,13,13,12,12,12,12,12,12,12,12,12,12,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,13,13,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,4,5,0,4,5,0,4,5,0,0,11,11,0,1,2,3,0,0,1,2,3,0,13],
    [13,0,6,7,0,6,7,0,6,7,0,0,12,12,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,0,1,2,3,0,13],
    [13,0,4,5,0,4,5,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [11,0,6,7,0,6,7,0,6,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13],
    [12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,0,1,2,3,0,13],
    [0,0,0,0,0,0,0,0,0,0,0,0,13,13,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,4,5,0,4,5,0,4,5,0,0,13,13,0,0,0,0,0,0,0,0,0,0,13],
    [13,0,6,7,0,6,7,0,6,7,0,0,13,13,0,1,2,3,0,0,1,2,3,0,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13],
    [13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13]
];

var level3 = [map1, map2, map3, map4, map5, map6, map7];
var roomNumber = 0; // 0: center room at first floor

level3sprite.onload = function() {
    drawTheMap();
};

var pMap = [];                              //Declare a player map
for (let y = 0; y < 70; y++)                //Initialize all indices with 0
{
    pMap[y] = [];

    for (let x = 0; x < 97; x++)
    {
        pMap[y].push(0)
    }
}
pMap[14][1] = 1;                             //Set the players starting position

addEventListener("keyup", onKeyUp, false);
addEventListener("keydown", onKeyDown, false);
scientist.onload = function(){drawTheMap();};

function drawTheMap()
{
    let destX = 0, destY = 0;
    for (let row = 0; row < level3[roomNumber].length; row++)
    {
        for (let col = 0; col < level3[roomNumber][0].length; col++)
        {
            switch (level3[roomNumber][row][col])
            {
                case 0: //floor
                    ctx.drawImage(level3sprite, 96, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 1: //rack1
                    ctx.drawImage(level3sprite, 128, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 2: //rack2
                    ctx.drawImage(level3sprite, 160, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 3: //rack3
                    ctx.drawImage(level3sprite, 192, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 4: //stand1
                    ctx.drawImage(level3sprite, 32, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 5: //stand2
                    ctx.drawImage(level3sprite, 64, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 6: //stand3
                    ctx.drawImage(level3sprite, 32, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 7: //stand4
                    ctx.drawImage(level3sprite, 64, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 8: //counter1
                    ctx.drawImage(level3sprite, 96, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 9: //counter2
                    ctx.drawImage(level3sprite, 128, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 10: //counter3
                    ctx.drawImage(level3sprite, 160, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 11: //wall1
                    ctx.drawImage(level3sprite, 0, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 12: //wall2
                    ctx.drawImage(level3sprite, 0, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 13: //black:void
                    ctx.drawImage(level3sprite, 224, 96, 32, 32, destX, destY, 32, 32);
                    break;
                case 14: // cabinet1
                    ctx.drawImage(level3sprite, 0, 64, 32, 32, destX, destY, 32, 32);
                    break;
                case 15: //cabinet2
                    ctx.drawImage(level3sprite, 0, 96, 32, 32, destX, destY, 32, 32);
                    break;
                case 16: //stair1
                    ctx.drawImage(level3sprite, 192, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 17: //stair2
                    ctx.drawImage(level3sprite, 224, 32, 32, 32, destX, destY, 32, 32);
                    break;
                case 18: //doormat1:exit
                    ctx.drawImage(level3sprite, 32, 64, 32, 32, destX, destY, 32, 32);
                    break;
                case 19: //doormat2:exit
                    ctx.drawImage(level3sprite, 64, 64, 32, 32, destX, destY, 32, 32);
                    break;
                case 20: // window
                    ctx.drawImage(level3sprite, 33, 96, 32, 32, destX, destY, 32, 32);
                    break;
                case 22: // door1
                    ctx.drawImage(level3sprite, 96, 64, 32, 32, destX, destY, 32, 32);
                    break;
                case 23: // door2
                    ctx.drawImage(level3sprite, 128, 64, 32, 32, destX, destY, 32, 32);
                    break;
                case 24: // door3
                    ctx.drawImage(level3sprite, 96, 96, 32, 32, destX, destY, 32, 32);
                    break;
                case 25: // door4
                    ctx.drawImage(level3sprite, 128, 96, 32, 32, destX, destY, 32, 32);
                    break;
            }
            destX += 32;
        }
        destX = 0;
        destY += 32;
    }
    drawPMap();
}


function drawPMap()
{
    let destX = 0, destY = 0;

    for (let row = 0; row < pMap.length; row++)
    {
        for (let col = 0; col < pMap[0].length; col++)
        {
            switch (pMap[row][col])
            {
                case 1:
                    //Sets position on tile sheet to pick from when drawing player
                    p.srcX = p.width * (p.frameX % 4);
                    p.srcY = p.height * p.frameY;
                    ctx.drawImage(scientist, p.srcX, p.srcY, p.width, p.height, destX, destY, p.width, p.height);
                    break;
            }

            destX += 8;
        }
        destX = 0;
        destY += 8;
    }

}

function movePlayer()
{
    p.prevCol = p.col;//Set column to clear
    p.prevRow = p.row;//Set row to clear

    if (p.left)
    {
        if (p.col > 0)
        {
            //remove player from current column
            pMap[p.row][p.col] = 0;
            //update player column
            p.col --;
            //add player to updated row
            pMap[p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking right
        p.frameY = 1;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (p.right)
    {
        if (p.col < 96)
        {
            //remove player from current column
            pMap[p.row][p.col] = 0;
            //update player column
            p.col ++;
            //add player to updated column
            pMap[p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking right
        p.frameY = 2;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (p.up)
    {
        if (p.row > 0)
        {
            //remove player from current row
            pMap[p.row][p.col] = 0;
            //update player row
            p.row --;
            //add player to updated row
            pMap[p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking up
        p.frameY = 3;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (p.down)
    {
        if (p.row < 69)
        {
            //remove player from current row
            pMap[p.row][p.col] = 0;
            //update player row
            p.row ++;
            //add player to updated row
            pMap[p.row][p.col] = 1;

        }
        //Change tile sheet frame to show player walking down
        p.frameY = 0;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }
    ctx.clearRect(p.prevCol * 8, p.prevRow * 8, p.width, p.height);//Clear portion of canvas the player was last on
    fillErasedMap(); //Fills portion of the canvas the player was just on
    moveRoom();
    drawPMap();//Draws the new players position
}

function onKeyDown(e)
//Maybe change take out onKeyUp function and have all commands in onKeyDown so that
//  you can not go diagonally -- character will always hover when going diagonally
//  unless new sprite sheet is found/made with character walking diagonally
{
    if (e.keyCode === 37)//Left

    {
        p.left = true;
    }

    else if (e.keyCode === 39)//Right

    {
        p.right = true;
    }

    else if (e.keyCode === 38)//Up

    {
        p.up = true;
    }

    else if (e.keyCode === 40)//Down

    {
        p.down = true;
    }

    else if (e.keyCode === 32) //Space
    {

    }
    movePlayer();
}

function onKeyUp(e)
{
    if (e.keyCode === 37)//Left

    {
        p.left = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }

    else if (e.keyCode === 39)//Right

    {
        p.right = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }

    else if (e.keyCode === 38)//Up

    {
        p.up = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }

    else if (e.keyCode === 40)//Down

    {
        p.down = false;
        //Reset frame so that the player starts the correct spot in the tile sheet for next direction
        p.frameX = 0;
    }
}

function Portal(row,col) {
    this.row = row;
    this.col = col;
}

// portal position to move other map
var map1toMap2 = new Portal(8,0);      // map1 -> map2 position
var map1toMap3 = new Portal(2,24);     // map1 -> map3 position
var map1toMap4 = new Portal(14,24);    // map1 -> map4 position
var map1toMap5 = new Portal(10,23);    // map1 -> map5 position
var map1toExit = new Portal(2,10);     // map1 -> exit position
var map2toMap1 = new Portal(8,24);     // map2 -> map1 position
var map3toMap1 = new Portal(2.0);      // map3 -> map1 position
var map4toMap1 = new Portal(14,0);     // map4 -> map1 position
var map5toMap1 = new Portal(8,1);      // map5 -> map1 position
var map5toMap6 = new Portal(4,24);     // map5 -> map6 position
var map5toMap7 = new Portal(11,24);    // map5 -> map7 position
var map6toMap5 = new Portal(2,0);      // map6 -> map5 position
var map7toMap6 = new Portal(10,0);     // map7 -> map6 position


//move other room, add condition as taking objects(later)
//when player go to portal, draw new map, change player character position and player draw(later)
function moveRoom() {
    if (roomNumber === 0){    // when player is in 1F center room
        if (p.row === map1toMap2.row && p.col === map1toMap2.col) {
            roomNumber = 1;
            drawTheMap();
            p.row = 8;
            p.col = 23;
        }
        else if (p.row === map1toMap3.row && p.col === map1toMap3.col) {
            roomNumber = 2;
            drawTheMap();
            p.row = 2;
            p.col = 1;
        }
        else if (p.row === map1toMap4.row && p.col === map1toMap4.col) {
            roomNumber = 3;
            drawTheMap();
            p.row = 14;
            p.col = 1;
        }
        else if (p.row === map1toMap5.row && p.col === map1toMap5.col){
            roomNumber = 4;
            drawTheMap();
            p.row = 8;
            p.col = 2;
        }
        else if (p.row === map1toExit.row && p.col === map1toExit.col || p.row === map1toExit.row && p.col === map1toExit.col+1){ //size of map1 to exit portal is 1x2
            // move to street map
        }
    }

    else if (roomNumber === 1) { //when player is in cabinet room
        if (p.row === map2toMap1.row && p.col === map2toMap1.col) {
            roomNumber = 0;
            drawTheMap();
            p.row = 8;
            p.col = 1;
        }
    }

    else if (roomNumber === 2) { //when player is in staff room
        if (p.row === map3toMap1.row && p.col === map3toMap1){
            roomNumber = 0;
            drawTheMap();
            p.row = 2;
            p.col = 23;
        }
    }

    else if (roomNumber === 3) { //when player is in storage room
        if (p.row === map4toMap1.row && p.col === map4toMap1){
            roomNumber = 0;
            drawTheMap();
            p.row = 14;
            p.col = 23;
        }
    }

    else if (roomNumber === 4) { //when player is in 2F center room
        if (p.row === map5toMap1.row && p.col === map5toMap1.col) {
            roomNumber = 0;
            drawTheMap();
            p.row = 10;
            p.col = 22;
        }
        else if (p.row === map5toMap6 && p.col === map5toMap6.col) {
            roomNumber = 5;
            drawTheMap();
            p.row = 2;
            p.col = 1;
        }
        else if (p.row === map5toMap7 && p.col === map5toMap7.col) {
            roomNumber = 6;
            drawTheMap();
            p.row = 10;
            p.col = 1;
        }
    }

    else if (roomNumber === 5) { //when player is in map6
        if (p.row === map6toMap5.row && p.col === map6toMap5.col){
            roomNumber = 4;
            drawTheMap();
            p.row = 4;
            p.col = 23;
        }
    }


    else if (roomNumber === 6) { //when player is in map7
        if (p.row === map7toMap6.row && p.col === map7toMap6.col){
            roomNumber = 4;
            drawTheMap();
            p.row = 11;
            p.col = 23;
        }
    }
}
function fillErasedMap()
{
    var map = undefined;
    switch (roomNumber)
    {
        case 0:
            map = map1;
            break;
        case 1:
            map = map2;
            break;
        case 2:
            map = map3;
            break;
        case 3:
            map = map4;
            break;
        case 4:
            map = map5;
            break;
        case 5:
            map = map6;
            break;
        case 6:
            map = map7;
            break;
    }

    for (let mC = p.col - 4; mC < p.col + 5; mC++) // mC = map column
    {
        for (let mR = p.row - 4; mR < p.row + 7; mR++) {
            let xPos = undefined, yPos = undefined;
            if (map[mR / 4] !== undefined && map[mR / 4][mC / 4] !== undefined) {
                xPos = mC * 8;
                yPos = mR * 8;
                switch (map[mR / 4][mC / 4])//decide what needs drawing based on map index
                {
                    case 0: //floor
                        ctx.drawImage(level3sprite, 96, 0, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 1: //rack1
                        ctx.drawImage(level3sprite, 128, 0, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 2: //rack2
                        ctx.drawImage(level3sprite, 160, 0, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 3: //rack3
                        ctx.drawImage(level3sprite, 192, 0, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 4: //stand1
                        ctx.drawImage(level3sprite, 32, 0, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 5: //stand2
                        ctx.drawImage(level3sprite, 64, 0, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 6: //stand3
                        ctx.drawImage(level3sprite, 32, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 7: //stand4
                        ctx.drawImage(level3sprite, 64, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 8: //counter1
                        ctx.drawImage(level3sprite, 96, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 9: //counter2
                        ctx.drawImage(level3sprite, 128, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 10: //counter3
                        ctx.drawImage(level3sprite, 160, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 11: //wall1
                        ctx.drawImage(level3sprite, 0, 0, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 12: //wall2
                        ctx.drawImage(level3sprite, 0, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 13: //black:void
                        ctx.drawImage(level3sprite, 224, 96, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 14: // cabinet1
                        ctx.drawImage(level3sprite, 0, 64, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 15: //cabinet2
                        ctx.drawImage(level3sprite, 0, 96, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 16: //stair1
                        ctx.drawImage(level3sprite, 192, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 17: //stair2
                        ctx.drawImage(level3sprite, 224, 32, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 18: //doormat1:exit
                        ctx.drawImage(level3sprite, 32, 64, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 19: //doormat2:exit
                        ctx.drawImage(level3sprite, 64, 64, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 20: // window
                        ctx.drawImage(level3sprite, 33, 96, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 22: // door1
                        ctx.drawImage(level3sprite, 96, 64, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 23: // door2
                        ctx.drawImage(level3sprite, 128, 64, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 24: // door3
                        ctx.drawImage(level3sprite, 96, 96, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                    case 25: // door4
                        ctx.drawImage(level3sprite, 128, 96, 32, 32, mC*8, mR*8, 32, 32);
                        break;
                }

            }
        }
    }
}
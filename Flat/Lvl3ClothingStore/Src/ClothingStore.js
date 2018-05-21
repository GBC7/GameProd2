var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var windowOpen = false; //in order to check window status(later)

var p =         //PlayerObject

    {
        x:0,
        y:0,
        row: 66,
        col: 4,
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



var map = [                    //10                          //20                          // 1F center - main floor
    [11,11,11,20,11,11,11,20,11,11,22,23,11,11,20,11,11,11,20,11,11,11,20,11,11],
    [14,14,14,12,12,12,12,12,12,12,24,25,12,12,12,12,12,12,12,12,12,12,12,12,12],
    [15,15,15,0,0,0,0,0,0,0,18,19,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,9,10,8,9,10,8,9,10],
    [14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [15,15,15,0,0,0,4,5,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,6,7,0,6,7,0,0,0,0,0,0,0,1,2,3,0,1,2,3],
    [14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [15,15,15,0,0,0,4,5,0,4,5,0,0,0,0,0,0,0,0,4,5,0,4,5,0],
    [0,0,0,0,0,0,6,7,0,6,7,0,0,0,0,0,0,0,0,6,7,0,6,7,0],
    [14,14,14,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,1,2,3],
    [0,0,0,0,0,0,4,5,0,0,4,5,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [14,14,14,0,0,0,6,7,0,0,6,7,0,0,0,0,0,0,0,4,5,0,4,5,0],
    [15,15,15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,7,0,6,7,0],
    [0,0,0,0,0,0,1,2,3,0,1,2,3,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,0,1,2,3],
    [16,0,0,0,0,0,1,2,3,0,1,2,3,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];
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
pMap[66][4] = 1;                             //Set the players starting position

addEventListener("keyup", onKeyUp, false);
addEventListener("keydown", onKeyDown, false);
scientist.onload = function(){drawTheMap();};



function drawTheMap()
{
    let destX = 0, destY = 0;
    for (let row = 0; row < map.length; row++)
    {
        for (let col = 0; col < map[0].length; col++)
        {
            switch (map[row][col])
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
    console.log(p.row, p.col);
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

function fillErasedMap()
{
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
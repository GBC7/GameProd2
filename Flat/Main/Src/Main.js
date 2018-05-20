var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var level = 1;
var lightsOn = true, sewersDrained = false;
var lightSwitch = 1, sewerSwitch = 0;
var floorSpriteX = undefined;
var p =         //PlayerObject

{
    row: 0,
    col: 0,
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

var wetPipe = new Image();
wetPipe.src = "../../Lvl2Sewer/images/pipeWet.png";

var pipe = new Image();
pipe.src = "../../Lvl2Sewer/images/pipe.png";

var pillar = new Image();
pillar.src = "../../Lvl2Sewer/images/pillar.png";

var wall = new Image();
wall.src = "../../Lvl2Sewer/images/wall.png";

var door = new Image();
door.src = "../../Lvl2Sewer/images/door.png";

var drain = new Image();
drain.src = "../../Lvl2Sewer/images/drain.png";

var floor = new Image();
floor.src = "../../Lvl2Sewer/images/floor.png";

var sciUndWater = new Image();
sciUndWater.src = "../../Lvl2Sewer/images/scientist2.png";

var scientist = new Image();                            //Declare image for player
scientist.src = "../images/scientist2.png";             //Set player image using player object



var map =
    //                    10                  20
    [  //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4
        [1,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0],        //0
        [2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2],        //1
        [4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4],        //2
        [5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5],        //3
        [2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2],        //4
        [3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3],        //5
        [5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5],        //6
        [2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,6],        //7
        [3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3],        //8
        [3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3],        //9
        [4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4],        //10
        [4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4],        //11
        [5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5],        //12
        [2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2],        //13
        [3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3],        //14
        [4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4],        //15
        [5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5],        //16
        [2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2],        //17
        [3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3,4,5,2,3]         //18
    ];

for (let y = 1; y < map.length; y++)        //Randomize floor pattern
    for (let x = 0; x < map[0].length; x++)
    {
        map[y][x] = (Math.floor(Math.random() * 4)+ 2);
    }
map[13][24] = 6;                            //Set the drains position

var pMap = [];                              //Declare a player map
for (let y = 0; y < 70; y++)                //Initialize all indices with 0
{
    pMap[y] = [];

    for (let x = 0; x < 97; x++)
    {
        pMap[y].push(0)
    }
}

pMap[0][0] = 1;                             //Set the players starting position
pMap[64][96] = pMap[8][96] = 2;
drain.onload = function(){addEventListener("keyup", onKeyUp, false);};
scientist.onload = function(){drawTheMap();};
floor.onload = function(){addEventListener("keydown", onKeyDown, false);};

function drawTheMap()
{
    let destX = 0, destY = 0;
    for (let row = 0; row < map.length; row++)
    {
        for (let col = 0; col < map[0].length; col++)
        {
            switch (map[row][col])
            {
                case 0:
                    ctx.drawImage(wall, destX, destY, 32, 32);
                    break;
                case 1:
                    ctx.drawImage(door, destX, destY, 32, 32);
                    break;
                case 2:
                    floorSpriteX = 0;
                    ctx.drawImage(floor, floorSpriteX, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 3:
                    floorSpriteX = 32;
                    ctx.drawImage(floor, floorSpriteX, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 4:
                    floorSpriteX = 64;
                    ctx.drawImage(floor, floorSpriteX, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 5:
                    floorSpriteX = 96;
                    ctx.drawImage(floor, floorSpriteX, 0, 32, 32, destX, destY, 32, 32);
                    break;
                case 6:
                    ctx.drawImage(drain, destX, destY, 32, 32);
                    break;
                case 7:
                    if (!sewersDrained)
                        ctx.drawImage(wetPipe, destX, destY, 32, 32);
                    else
                        ctx.drawImage(pipe, destX, destY, 32, 32);
                    break;
            }

            destX += 32;
        }
        destX = 0;
        destY += 32;
    }
    if (!sewersDrained)
    {
        ctx.fillStyle = "rgba(47, 141, 91, 0.41)";
        ctx.fillRect(0,24,320,600);
        ctx.fillRect(352,24,800,600);
        ctx.fillRect(320,32,32,600);
    }
    if (!lightsOn)
    {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0,0,800,600);
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
                    if (!sewersDrained)
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, p.width, p.height, destX, destY, p.width, p.height);
                    else
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
    else if (e.keyCode === 76) //L
    {
        lightSwitch ++;
        if (lightSwitch % 2 === 0)
            lightsOn = true;
        else
            lightsOn = false;
        drawTheMap();
    }
    else if (e.keyCode === 83) //S
    {
        sewerSwitch ++;
        if (sewerSwitch % 2 === 0)
            sewersDrained = true;
        else
            sewersDrained = false;
        drawTheMap();
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

function fillErasedMap()
//Re-draws only the section of map that was erased by the character moving over
//  it vs. redrawing the whole map.(helps with game speed)
{
    let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where

    for (let mC = p.col - 4; mC < p.col + 5; mC ++) // mC = map column
    {
        for (let mR = p.row - 4; mR < p.row + 7; mR ++)
        {
            let xPos = undefined, yPos= undefined;
            if (map[mR/4] !== undefined && map[mR/4][mC/4] !== undefined)
            {
                xPos = mC*8;
                yPos = mR*8;
                switch (map[mR/4][mC/4])//decide what needs drawing based on map index
                {
                    case 0:
                        thingToDraw = wall;
                        break;
                    case 1:
                        thingToDraw = door;
                        break;
                    case 2:
                        thingToDraw = floor;
                        floorSpriteX = 0;
                        break;
                    case 3:
                        thingToDraw = floor;
                        floorSpriteX = 32;
                        break;
                    case 4:
                        thingToDraw = floor;
                        floorSpriteX = 64;
                        break;
                    case 5:
                        thingToDraw = floor;
                        floorSpriteX = 96;
                        break;
                    case 6:
                        thingToDraw = drain;
                        break;
                    case 7:
                        if (!sewersDrained)
                            thingToDraw = wetPipe;
                        else thingToDraw = pipe;
                        break;
                }
                if (thingToDraw === floor)

                    ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC)*8, (mR*8), 32, 32);
                else
                    ctx.drawImage(thingToDraw, (mC)*8, (mR)*8);

                if (xPos !== undefined && yPos !== undefined)
                {
                    if (!sewersDrained)
                    {
                        ctx.fillStyle = "rgba(47, 141, 91, 0.41)";//Change to swamp colour}
                        if (yPos === 0 && xPos !== 320)
                            ctx.fillRect(xPos, yPos + 24, 32, 16); //Draw over the bottom eighth of the tiles (to make water look knee level)
                        else if (yPos === 0 && xPos === 320)
                            continue;
                        else
                            ctx.fillRect(xPos, yPos, 32, 32);
                    }
                    if (!lightsOn)
                    {
                        ctx.fillStyle = "rgba(0, 0, 0, 1)";
                        ctx.fillRect(xPos + 96, 0, 800, 600);
                        ctx.fillRect(0, yPos + 96, 800, 600);
                        ctx.fillRect(0, 0, xPos - 64, 600);
                        ctx.fillRect(0, 0, 800, yPos - 64);
                    }
                }

            }
        }
    }
}

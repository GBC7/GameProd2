var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

var level = 1;

var p =         //PlayerObject

    {
        x: 0,
        y: 0,
        startX: [0,0,0,0,0,0,0], //For choosing players start x coordinate on the canvas based on level
        startY: [0,0,0,0,0,0,0], //For choosing players start y coordinate on the canvas based on level
        width: 32,               //The players width in the tile sheet
        height: 48,              //The players height in the tile sheet
        srcX: 0,                 //X location on tile sheet that current player image is coming from
        srcY: 0,                 //Y location on tile sheet that current player image is coming from
        frame: 0,                //Counter to use for selecting section of tile sheet based on steps
        prevX: undefined,        //Collects players previous x location to use for clearing only that section of canvas
        prevY: undefined,        //Collects players previous y location to use for clearing only that section of canvas
    };

var wall = new Image();
wall.src = "../../Lvl2Sewer/images/wall.png";

var door = new Image();
door.src = "../../Lvl2Sewer/images/door.png";

var floor = new Image();
floor.src = "../../Lvl2Sewer/images/floor.png";

var drain = new Image();
drain.src = "../../Lvl2Sewer/images/drain.png";

var scientist = new Image();                            //Declare image for player
scientist.src = "../images/scientist2.png";             //Set player image using player object

wall.onload = function(){drawTheMap();};
scientist.onload = function(){loadPlayer();};
floor.onload = function(){addEventListener("keydown", playerActions, false);};

function loadPlayer()               //Loads player at start position for particular level

    {
        ctx.drawImage(scientist, p.srcX, p.srcY, p.width, p.height, p.startX[level], p.startY[level], p.width, p.height);
    }

var map =

    [
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],    //1
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //2
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //3
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //4
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //5
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //6
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //7
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //8
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //9
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //10
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //11
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //12
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //13
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],    //14
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //15
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //16
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //17
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]     //18
    ];

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
                    ctx.drawImage(floor, destX, destY, 32, 32);
                    break;
                case 3:
                    ctx.drawImage(drain, destX, destY, 32, 32);
                    break;
            }

            destX += 32;
        }
        destX = 0;
        destY += 32;
    }
}




//Comment below

function playerActions(e)

    {
        p.prevX = p.x;
        p.prevY = p.y;

        if (e.keyCode === 37)//Left

            {
                if (p.srcY !== p.height)
                    p.frame = 0;

                if (p.x > 0)
                    p.x -= p.width/4;

                p.srcY = p.height;
                ++p.frame;
            }

        else if (e.keyCode === 39)//Right

            {
                if (p.srcY !== p.height * 2)
                    p.frame = 0;

                if (p.x + p.width < canvas.width)
                    p.x += p.width/4;

                p.srcY = p.height * 2;
                ++p.frame;

            }

        else if (e.keyCode === 38)//Up

            {
                if (p.srcY !== p.height * 3)
                    p.frame = 0;

                if (p.y > 0)
                    p.y -= p.width/4;

                p.srcY = p.height * 3;
                ++p.frame;

            }

        else if (e.keyCode === 40)//Down

            {
                if (p.srcY !== 0)
                    p.frame = 0;

                if (p.y + p.height< canvas.height)
                    p.y += p.width/4;

                p.srcY = 0;
                ++p.frame;

            }

        //Sets position on tile sheet to pick from when drawing player
        p.srcX = p.width * (p.frame % 4);

        //Clear only the space on canvas that the player was taking up last step
        ctx.clearRect(p.prevX, p.prevY, p.width, p.height);

        //Draw the section of the map that was erased
        drawTheMap();
      /*  fillErasedMap();*/

        //Draw players position
        ctx.drawImage(scientist, p.srcX, p.srcY, p.width, p.height, p.x, p.y, p.width, p.height)
    }

function fillErasedMap()
{
/*
    let mapX =  Math.ceil(p.prevX / 32) +1; //check where on the x-axis of the canvas was erased
    let mapY = Math.floor(p.prevY / 29.4); //check where on the y-axis of the canvas was erased
    let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where

    for (let mX = mapX-2; mX < 0; mX ++)
    {
        for (let mY = 0; mY < 1; mY ++)
        {
            if (map[mapY + mY] !== undefined)
            {
                switch (map[mapY + mY][mapX + mX])//decide what needs drawing based on map index
                {
                    case 0:
                        thingToDraw = wall;
                        break;
                    case 1:
                        thingToDraw = door;
                        break;
                    case 2:
                        thingToDraw = floor;
                        break;
                }
                ctx.drawImage(thingToDraw, (mapX+mX)*32, (mapY+mY)*32);
            }
        }
    }

    let roamWidth = 768;
    //768 / 8 = 96
    //768 / 25 = 30.72
    let roamHeight = 528;
    // 528 / 8 = 66
    // 528 / 18 = 29.33333


    for (let x = p.x - 8; x < p.x + 16; x += 8)
    {
        for (let y = p.y - 8; y < p.y + 16; y += 8)
        {
            let mapX = Math.floor(768 % x);
            console.log("x:" + x);
            console.log("y:" + y);

        }
    }*/
}

let gameOver = false, changedLevels = false;
let l1 = true, l2 = false, l3 = false, l4 = false, l5 = false, l6 = false, l7 = false;

let startX = [0,0,0,0,0,0,0], startY = [20,0,0,0,0,0,0];//

let level = 1;

let lMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
let lPMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

var a,b,c,d,e,f,g,h,i,j,k,l,m,n, thingToDraw; //Used with global functions to pass case numbers to
    a = b = c  = d = e = f = g = h = i = j = k = l = m = n = thingToDraw = undefined;

let p =                                                         //PlayerObject
{
row: 20,
col: 0,
prevRow: undefined,        //Collects players previous x location to use for clearing only that section of canvas
prevCol: undefined,        //Collects players previous y location to use for clearing only that section of canvas
width: 32,               //The players width in the tile sheet
height: 48,              //The players height in the tile sheet
srcX: 0,                 //X location on tile sheet that current player image is coming from
srcY: 0,                 //Y location on tile sheet that current player image is coming from
frameX: 0,                //Counter to use for selecting section of tile sheet based on steps
frameY: 0,
};

let scientist = new Image();                                    //Declare image for player
scientist.src = "../../Main/images/scientist2.png";             //Set player image using player object

startGame();

function startGame()
{
    if (l1)//Home(roof)
    {
        lPMap[level] = [];                                                  //Declare a player map
        for (let y = 0; y < 70; y++)                                    //Initialize all indices with 0
        {
            lPMap[level][y] = [];

            for (let x = 0; x < 97; x++)
            {
                lPMap[level][y].push(0)
            }
        }
        lPMap[level][20][0] = 1; //Putting the player (scientist) into the player map for this level
        changePStartPos();


        canvas.style.backgroundImage = "url('../../Lvl1Home/images/city.gif')";
        /*You could change fill style to brown or some other colour and fill a rectangle behind the house so that the
        * background picture doesn't show through the house*/


        let roof = new Image();
        roof.src = "../../Lvl1Home/images/shingles.jpg";
        let outsideWall = new Image();
        outsideWall.src = "../../Lvl1Home/images/outsideWall.png";
        let chimney = new Image();
        chimney.src = "../../Lvl1Home/images/chimney.png";
        let windowTopLeft = new Image();
        windowTopLeft.src = "../../Lvl1Home/images/windowTopLeft.png";
        let windowTopRight = new Image();
        windowTopRight.src = "../../Lvl1Home/images/windowTopRight.png";
        let windowBottomLeft = new Image();
        windowBottomLeft.src = "../../Lvl1Home/images/windowBottomLeft.png";
        let windowBottomRight = new Image();
        windowBottomRight.src = "../../Lvl1Home/images/windowBottomRight.png";
        //var tree = new Image();
        //tree.src = "../images/tree.png";
        let streetLight = new Image();
        streetLight.src = "../../Lvl1Home/images/streetLight.png";


        //Below one letter variables must be updated upon calling each level
        a = roof;
        b = outsideWall;
        c = undefined;
        d = chimney;
        e = windowTopLeft;
        f = windowTopRight;
        g = windowBottomLeft;
        h = windowBottomRight;

        if (lMap[level] === undefined)
        {
            lMap[level] = //Map for level 1
                [
                    //0,1,2,3,4,5,6,7,8,9

                    [2,2,2,2,2,2,2,2,2,2],      //0
                    [2,2,2,2,2,2,2,2,2,2],      //1
                    [2,2,2,2,2,2,2,2,2,2],      //2
                    [2,2,2,2,2,2,2,2,2,2],      //3
                    [2,2,2,2,2,2,2,2,2,2],      //4
                    [3,2,2,2,2,2,2,2,2,3],      //5
                    [0,0,0,0,0,0,0,0,0,0],      //6
                    [0,0,0,0,0,0,0,0,0,0],      //7
                    [0,0,0,0,0,0,0,0,0,0],      //8
                    [0,0,0,0,0,0,0,0,0,0],      //9
                    [0,0,0,0,0,0,0,0,0,0],      //10
                    [0,0,0,0,0,0,0,0,0,0],      //11
                    [0,0,0,0,0,0,0,0,0,0],      //12
                    [1,1,1,1,1,1,1,1,1,1],      //13
                    [1,1,1,1,1,1,1,1,1,1],      //14
                    [1,1,4,5,1,1,4,5,1,1],      //15
                    [1,1,6,7,1,1,6,7,1,1],      //16
                    [1,1,1,1,1,1,1,1,1,1],      //17
                    [1,1,1,1,1,1,1,1,1,1]       //18
                ];
        }

        scientist.onload = function(){streetLight.onload = function (){drawMap();};};
        windowBottomRight.onload = function(){addEventListener("keydown", onKeyDown, false);};

    }

    if (l2)//Sewer
    {

    }








    if (!gameOver && changedLevels)
        startGame();
}








//Use arguments (a,b,c,d,e,f...) to pass cases 0,1,2,3, etc.. respectively
//eg.. if case one is a floor object -
//replace 'a' with with the object variable 'floor' when calling the fillErasedMap function
function fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n)
//Re-draws only the section of map that was erased by the character moving over
//  it vs. redrawing the whole map.(helps with game speed)
{
    let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where

    for (let mR = p.row - 4; mR < p.row + 7; mR ++) // mC = map column
    {
        for (let mC = p.col - 4; mC < p.col + 5; mC ++)
        {
            let xPos = undefined, yPos= undefined;

            if (lMap[level][mR/4] !== undefined && lMap[level][mR/4][mC/4] !== undefined)
            {
                xPos = mC*8;
                yPos = mR*8;
                mC = mC / 4;
                mR = mR / 4;
                switch (lMap[level][mR][mC])//decide what needs drawing based on map index
                {
                    case 0:
                        thingToDraw = a;
                        break;
                    case 1:
                        thingToDraw = b;
                        break;
                    case 2:
                        thingToDraw = c;
                        break;
                    case 3:
                        thingToDraw = d;
                        break;
                    case 4:
                        thingToDraw = e;
                        break;
                    case 5:
                        thingToDraw = f;
                        break;
                    case 6:
                        thingToDraw = g;
                        break;
                    case 7:
                        thingToDraw = h;
                        break;
                    case 8:
                        thingToDraw = i;
                        break;
                    case 9:
                        thingToDraw = j;
                        break;
                    case 10:
                        thingToDraw = k;
                        break;
                    case 11:
                        thingToDraw = l;
                        break;
                    case 12:
                        thingToDraw = m;
                        break;
                    case 13:
                        thingToDraw = n;
                        break;
                }
                mC = mC *4;
                mR = mR *4;
                if (thingToDraw !== undefined)
                    ctx.drawImage(thingToDraw, (mC)*8, (mR)*8);
            }
        }
    }
}

function onKeyDown(e)
//Maybe change.. take out onKeyUp function and have all commands in onKeyDown so that
//  you can not go diagonally -- character will always hover when going diagonally
//  unless new sprite sheet is found/made with character walking diagonally
{
    p.prevCol = p.col;//Set column to clear
    p.prevRow = p.row;//Set row to clear
    if (e.keyCode === 37)//Left

    {
        if (p.col > 0)
        {
            //remove player from current column
            lPMap[level][p.row][p.col] = 0;
            //update player column
            p.col --;
            //add player to updated row
            lPMap[level][p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking right
        p.frameY = 1;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (e.keyCode === 39)//Right

    {
        if (p.col < 36)
        {
            //remove player from current column
            lPMap[level][p.row][p.col] = 0;
            //update player column
            p.col ++;
            //add player to updated column
            lPMap[level][p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking right
        p.frameY = 2;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;

    }

    if (e.keyCode === 38)//Up

    {
        if (p.row > 20)
        {
            //remove player from current row
            lPMap[level][p.row][p.col] = 0;
            //update player row
            p.row --;
            //add player to updated row
            lPMap[level][p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking up
        p.frameY = 3;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (e.keyCode === 40)//Down

    {
        if (p.row < 46)
        {
            //remove player from current row
            lPMap[level][p.row][p.col] = 0;
            //update player row
            p.row ++;
            //add player to updated row
            lPMap[level][p.row][p.col] = 1;
        }
        //Change tile sheet frame to show player walking down
        p.frameY = 0;
        //Increment in order to flip through the walking tiles for this direction
        p.frameX ++;
    }

    if (e.keyCode === 76) //L - light

    {
        lightSwitch++;
        lightsOn = function()
        {
            return lightSwitch % 2 === 0
        };
        drawTheMap();   //Drawing whole map because light/shade covers whole map
    }

    if (e.keyCode === 83) //S - swamp

    {
        sewerSwitch++;
        sewersDrained = function()
        {
            return sewerSwitch % 2 === 0
        };
        drawTheMap(); //Drawing whole map because swamp covers whole map
    }

    if (e.keyCode === 32) //Space

    {
        //Character action
    }

    ctx.clearRect(p.prevCol * 8, p.prevRow * 8, p.width, p.height);//Clear portion of canvas the player was last on
    fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
    //Fills portion of the canvas the player was just taking up
    //a,b,c,d,e... are passed from movePlayer function call
    drawPMap();//Draws the new players position
}

function changePStartPos()
{
    for (let y = 0; y < lPMap[level].length; y++)
    {
        for (let x = 0; x < lPMap[level][0].length; x++)
        {
            lPMap[level][y][x] = 0;
        }
    }
    lPMap[level][startY[level-1]][startX[level-1]] = 1;   //Set the players starting position for particular level
}

function drawPMap() //Move Streetlight to pMap function
{
    let destX = 0, destY = 0;

    for (let row = 0; row < lPMap[level].length; row++)
    {
        for (let col = 0; col < lPMap[level][0].length; col++)
        {
            switch (lPMap[level][row][col])
            {
                case 1:
                    //Sets position on tile sheet to pick from when drawing player
                    p.srcX = p.width * (p.frameX % 4);
                    p.srcY = p.height * p.frameY;
                    ctx.drawImage(scientist, p.srcX, p.srcY, p.width, p.height, destX, destY, p.width, p.height);
                    //ctx.drawImage(tree, 450, 470);
                    break;
            }

            destX += 8;
        }
        destX = 0;
        destY += 8;
    }
   /* ctx.drawImage(streetLight, 450, 510);  //Will be called for each level if function is made global*/
}

function drawMap()
{
    let destX = 0, destY = 0;

    for (let row = 0; row < lMap[level].length; row++)
    {
        for (let col = 0; col < lMap[level][0].length; col++)
        {
            thingToDraw = undefined;

            switch (lMap[level][row][col])
            {
                case 0:
                    thingToDraw = a;
                    break;
                case 1:
                    thingToDraw = b;
                    break;
                case 2:
                    thingToDraw = c;
                    break;
                case 3:
                    thingToDraw = d;
                    break;
                case 4:
                    thingToDraw = e;
                    break;
                case 5:
                    thingToDraw = f;
                    break;
                case 6:
                    thingToDraw = g;
                    break;
                case 7:
                    thingToDraw = h;
                    break;
            }

            if (thingToDraw !== undefined)
                ctx.drawImage(thingToDraw, destX, destY, 32, 32);

            destX += 32;
        }
        destX = 0;
        destY += 32;
    }
    drawPMap();
}
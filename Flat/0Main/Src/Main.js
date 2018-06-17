let gameOver = false;


//Current Level Bool
let l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11;
{
    l1 = true;
    l2 = false;
    l3 = false;
    l4 = false;
    l5 = false;
    l6 = false;
    l7 = false;
    l8 = false;
    l9 = false;
    l10 = false;
    l11 = false;
}


//Current Level Int
let level = 1;


//Global
let walkingSpeed = 15;
let dialog = false;             //For drawing dialog
let alreadySetTimeout = false;     //For drawing dialog
let dialogX = undefined, dialogY = undefined; //For storing position dialog started at


//*****Testing only*****//
let lightSwitch = 1, sewerSwitch = 1;                                //*****Testing only*****//
//*****Testing only*****//


//L2
let lightsOn = true, sewersDrained = false;                             //For sewer level
let floorSpriteX = undefined;                                           //For sewer level
let notWalking = true, canGoThisWay = false;                            //For boundaries and walking animation
let walkedUpAlready = false;                                            //For animating walking up fire escaped (l6)
let doorThreeOpen = false;                                              //For allowing walking through doorway (l2)
let alreadyBeenHere = false;
let alreadyShivering = false;
let torchesSet = false;
let torchLit = [false, false, false, false, false, false, false];


//L3
let timer_level3;                                                        //For checking time for level 3
let leftDoorOpen = false;
let rightDoorOpen = false;
let findPasscode = false;                                               //For clothing store
let findMap = false;                                                    //For clothing store
let findRollerblades = false;                                           //For clothing store
let findDisguise = false;                                               //For clothing store
let enemyAppearLevel3 = false;
let detectPlayerLevel3 = false;


//L3
let enemiesLevel3 = [];
let enemyLevel3 = function() {
    this.x = 0;
    this.y = 0;
    // add enemy property
};

//L7 & 8
let windowClosed = false;
let researchPaper = false;
let researchBurned = false;
let lighterFluid = false;
// let noEnemies = false; Eventually going to be implemented with enemies so that you have to get rid of everyone before closing the windows


//Sounds
let doorSound = new Audio();
let warningSound = new Audio();
let bgm_level3 = new Audio;
let dangerous = new Audio;
let waterRunning = new Audio;
let ratOfDeath = new Audio;
{
    doorSound.src = ('../../3Store/audio/open.mp3');
    warningSound.src = ('../../3Store/audio/warningsound.mp3');
    bgm_level3.src = ("../../3Store/audio/clothingshop.mp3");
    dangerous.src = ("../../3Store/audio/enemyappear.mp3");
    waterRunning.src = ('../../2Sewer/audio/waterRunning.mp3');
    ratOfDeath.src = ('../../2Sewer/audio/ratOfDeath.mp3');
    bgm_level3.loop = true;
    bgm_level3.volume = 0.2;
    dangerous.loop = true;
    dangerous.volume = 0.2;
    waterRunning.loop = true;
    waterRunning.volume = 0.1;
}


//level 0 is undefined as we do not have a level 0
let startX, startY;
{ // Level        0      1   2   3   4    5   6   7  8      9         10      11
    startX = [undefined, 0,  0,  1,  10,  0,  10, 0, 0, undefined, undefined, 12];
    startY = [undefined, 5,  0,  16, 17,  0,  14, 1, 0, undefined, undefined, 16];
}


//For setting direction the character is facing when entering a new level
let startFrameY = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                   undefined, undefined, undefined];


//x and y map boundaries per level

let xMax, xMin, yMax, yMin;
{// Level          0       1    2    3    4    5    6    7   8      9           10       11
    xMax =   [undefined,  9,  24,  24,  24,  24,  16,  24,  24,  undefined,  undefined,  24];
    xMin =   [undefined,  0,   0,   0,   0,   0,   0,   0,   0,  undefined,  undefined,  0];
    yMax =   [undefined, 17,  17,  17,  17,  17,  17,  17,  17,  undefined,  undefined,  17];
    yMin =   [undefined,  5,   0,   0,   0,   0,   5,   1,   0,  undefined,  undefined,  2];
}


let floorNumbers;
{// Level floor numbers - 0 , 1,     2,     3, 4, 5, 6, 7  8       9         10       11
    floorNumbers= [undefined, 0, undefined, 0, 1, 2, 0, 1, 1, undefined, undefined, undefined];
}


let lMap, lPMap, lOMap;2
{
    //level maps initialized when levels are loaded
    // Level    0          1          2          3          4          5          6         7
    lMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    //   8        9         10          11
    undefined, undefined, undefined, undefined];


    //level player maps initialized when levels are loaded
    // Level    0          1          2          3          4          5          6         7
    lPMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        //   8        9         10          11
        undefined, undefined, undefined, undefined];


    //For objects that need to be able to be "walked through" but not erased upon walkthrough (Eg. my torches)
    // (Do not appear as being walked through since players feet are 48 pixels below actualy position)
    // Level         0          1          2          3          4          5          6         7
    lOMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        //   8        9         10          11
        undefined, undefined, undefined, undefined];
}


//For finding out if level is ready to be drawn
let l2Ready, l3Ready, l4Ready, l5Ready, l6Ready, l7Ready, l8Ready, l9Ready, l10Ready, l11Ready;


let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,qq,rr,ss,tt,uu,vv,ww,
    xx,yy,zz,aaa,bbb,ccc,ddd,eee,fff,ggg,hhh,iii,jjj,kkk,lll,mmm,nnn,ooo,qqq,rrr,sss,ttt,uuu,vvv,www,xxx,yyy,zzz,
    thingToDraw;       //Used with global functions to pass case numbers to
{
    a = b = c  = d = e = f = g = h = i = j = k = l = m = n = o = q = r = s = t = u = v = w = x = y = z =
    aa = bb = cc = dd = ee = ff = gg = hh = ii = jj = kk = ll = mm = nn = oo = qq = rr = ss = tt = uu = vv = ww = xx =
    yy = zz = aaa = bbb = ccc = ddd = eee = fff = ggg = hhh = iii = jjj = kkk = lll = mmm = nnn = ooo = qqq = rrr = sss
    = ttt = uuu = vvv = www = xxx = yyy = zzz = thingToDraw = undefined;
}


let p =                                                         //PlayerObject
{
row: 0,
col: 2,
prevRow: undefined,        //Collects players previous x location to use for clearing only that section of canvas
prevCol: undefined,        //Collects players previous y location to use for clearing only that section of canvas
width: 32,               //The players width in the tile sheet
height: 48,              //The players height in the tile sheet
srcX: 0,                 //X location on tile sheet that current player image is coming from
srcY: 0,                 //Y location on tile sheet that current player image is coming from
frameX: 0,                //Counter to use for selecting section of tile sheet based on steps
frameY: 0,
};


//Universal Images
let scientist = new Image();                                //Regular player image
let sciUndWater = new Image();                              //Image fpr player while in sewer
let thotBr = new Image();                                   //Thought bubble image bottom right side of player
let thotBl = new Image();                                   //Thought bubble image bottom left side of player
let thotTl = new Image();                                   //Thought bubble image top left side of player
let thotTr = new Image();                                   //Thought bubble image top right side of player
{
    thotBl.src = "../../0Main/images/thotBl.png";
    thotTl.src = "../../0Main/images/thotTl.png";
    thotTr.src = "../../0Main/images/thotTr.png";
    thotBr.src = "../../0Main/images/thotBr.png";
    sciUndWater.src = "../../2Sewer/images/scientist2.png";
    scientist.src = "../../0Main/images/scientist2.png";
}


//Sewer
let wetPipe = new Image();
let sewerFloor = new Image();
let level3sprite = new Image();
let door3 = new Image();
let wallBesideDoor = new Image();
let floorAboveDoor = new Image();
let floorClean = new Image();
let doorBare = new Image();
let torch = new Image();
let torchSwamp = new Image();
let fireWall = [new Image(), new Image(), new Image()];
let fireCorner = [new Image(), new Image(), new Image()];
let fireWallX = [24, undefined, undefined];
let fireWallY = [8, undefined, undefined];
let fireCornerX = [18, undefined, undefined];
let fireCornerY = [8, undefined, undefined];
{
    fireWall[0].src = "../../2Sewer/images/flameWall1.png";
    fireWall[1].src = "../../2Sewer/images/flameWall2.png";
    fireWall[2].src = "../../2Sewer/images/flameWall3.png";
    fireCorner[0].src = "../../2Sewer/images/flameCorner1.png";
    fireCorner[1].src = "../../2Sewer/images/flameCorner2.png";
    fireCorner[2].src = "../../2Sewer/images/flameCorner3.png";
    wetPipe.src = "../../2Sewer/images/pipeWet.png";
    sewerFloor.src = "../../2Sewer/images/floor.png";
    level3sprite.src = "../../3Store/images/ClothingStoreSprite.png";
    door3.src = "../../2Sewer/images/door3.png";
    wallBesideDoor.src = "../../2Sewer/images/wallBesideDoor.png";
    floorAboveDoor.src = "../../2Sewer/images/floorAboveDoor.png";
    floorClean.src = "../../2Sewer/images/floorClean.png";
    doorBare.src = "../../2Sewer/images/doorBare.png";
    torch.src = "../../2Sewer/images/torch.png";
    torchSwamp.src = "../../2Sewer/images/torchSwamp.png";
}


//Roof
let gate = new Image();
let fence = new Image();
let litWindow = new Image();
let darkWindow = new Image();
let cherryTree = new Image();
let statue = new Image();
let car = new Image();
let ladder = new Image();
let helipad = new Image();
let helicopter = new Image();
let exit = new Image();
let shrub = new Image();
{
    shrub.src = "../../6Roof/images/shrub.png";
    exit.src = "../../6Roof/images/exit2.png";
    helicopter.src = "../../6Roof/images/helicopter1.png";
    helipad.src = "../../6Roof/images/helipad.png";
    ladder.src = "../../6Roof/images/ladder.png";
    car.src = "../../6Roof/images/car.png";
    statue.src = "../../6Roof/images/statue.png";
    cherryTree.src = "../../6Roof/images/cherryTree.png";
    darkWindow.src = "../../6Roof/images/darkWindow.png";
    litWindow.src = "../../6Roof/images/litWindow.png";
    fence.src = "../../6Roof/images/fence.png";
    gate.src = "../../6Roof/images/gate.png";
}



startGame();


function startGame()
{
    if (l1)//Home(roof)

    {
        canvas.style.backgroundImage = "url('../../1Home/images/city.gif')";


        let outsideWall = new Image();
        let chimney = new Image();
        let windowTopLeft = new Image();
        let windowTopRight = new Image();
        let windowBottomLeft = new Image();
        let windowBottomRight = new Image();
        let streetLight = new Image();
        let roof = new Image();


        {
            outsideWall.src = "../../1Home/images/outsideWall.png";
            chimney.src = "../../1Home/images/chimney.png";
            windowTopLeft.src = "../../1Home/images/windowTopLeft.png";
            windowTopRight.src = "../../1Home/images/windowTopRight.png";
            windowBottomLeft.src = "../../1Home/images/windowBottomLeft.png";
            windowBottomRight.src = "../../1Home/images/windowBottomRight.png";
            streetLight.src = "../../1Home/images/streetLight.png";
            roof.src = "../../1Home/images/shingles.jpg";
        }//Define SRC property of images


        {
            a = roof;
            b = outsideWall;
            c = undefined;
            d = chimney;
            e = windowTopLeft;
            f = windowTopRight;
            g = windowBottomLeft;
            h = windowBottomRight;
        }//Assign images to global letter variables


        if (lMap[level] === undefined) //Initialize this levels map if it has not been initialized
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


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 24; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 18; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][5][0] = 1; //Putting the player (scientist) into the player map for this level
        }


        changePStartPos();


        roof.onload = function (){drawMap();};
        addEventListener("keydown", onKeyDown, false);
        waterRunning.pause();
    }

    else if (l2)//Sewer

    {
        canvas.style.backgroundImage = "";


        let stepsCorner = new Image();
        let steps = new Image();
        let topSide3 = new Image();
        let leverUp = new Image();
        let topSide = new Image();
        let topCorner = new Image();
        let wallCorner = new Image();
        let wallSwamp2 = new Image();
        let topCorner2 = new Image();
        let topSide2 = new Image();
        let door2 = new Image();
        let wall = new Image();
        let wallDrain = new Image();
        let wallSwamp = new Image();
        let pipe = new Image();
        let pillar = new Image();
        let door = new Image();
        let drain = new Image();
        let stairs = new Image();


        {
            stepsCorner.src = "../../2Sewer/images/stepsCorner.png";
            steps.src = "../../2Sewer/images/steps.png";
            topSide3.src = "../../2Sewer/images/topSide3.png";
            leverUp.src = "../../2Sewer/images/leverUp.png";
            topSide.src = "../../2Sewer/images/topSide.png";
            topCorner.src = "../../2Sewer/images/topCorner.png";
            wallCorner.src = "../../2Sewer/images/wallCorner.png";
            wallSwamp2.src = "../../2Sewer/images/wallSwamp2.png";
            topCorner2.src = "../../2Sewer/images/topCorner2.png";
            topSide2.src = "../../2Sewer/images/topSide2.png";
            door2.src = "../../2Sewer/images/door2.png";
            wall.src = "../../2Sewer/images/upperWall.png";
            wallDrain.src = "../../2Sewer/images/wallDrain2.png";
            wallSwamp.src = "../../2Sewer/images/wallSwamp.png";
            pipe.src = "../../2Sewer/images/pipe.png";
            door.src = "../../2Sewer/images/door.png";
            pillar.src = "../../2Sewer/images/pillar.png";
            drain.src = "../../2Sewer/images/drain.png";
            stairs.src = "../../2Sewer/images/stairs.png";
        }//Define pictures' source files


        {
            a = wall;               //0
            b = door;               //1
            c = undefined;          //2
            d = sewerFloor;         //3
            e = sewerFloor;         //4
            f = sewerFloor;         //5
            g = wallDrain;          //6
            h = pipe;               //7
            i = stairs;             //8
            j = door2;              //9
            k = wallSwamp;          //10
            l = wallCorner;         //11
            m = topSide;            //12
            n = topCorner;          //13
            o = wallBesideDoor;     //14
            q = floorAboveDoor;     //15


            u = torch;              //19
            v = wallSwamp2;         //20
            w = topCorner2;         //21
            x = undefined;          //22

            bb = topSide2;          //26
            cc = leverUp;           //27

            ee = steps;             //29
            ff = stepsCorner;       //30
        }//Assign pictures to global letter vars


        if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
        {
            lMap[level] =                                           //Initialize this levels map
                //                                            10                                      20
                [  // 0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9,  0,  1,  2,  3,  4

                    [ 1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  7,  0,  0,  0,  0,  0,  0,  6, 13,  0,  0,  0,  0,  0,  8],       //0
                    [ 4,  3,  4,  4,  4,  3,  4,  3,  4,  4,  3,  4,  4,  3,  4,  3,  3,  3, 12,  5,  5,  5,  5,  5,  5],       //1
                    [ 4,  4,  3,  4,  3,  4,  3,  3,  3,  4,  3,  4,  3,  3,  4,  4,  4,  4, 12,  5,  5,  5,  5,  5,  5],       //2
                    [ 3,  3,  4,  3,  3,  4,  3,  4,  3,  4,  4,  4,  4,  4,  4,  3,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //3
                    [ 4,  3,  4,  4,  4,  3,  4,  3,  3,  4,  4,  4,  4,  3,  4,  3,  4,  4, 12,  5,  5,  5,  5,  5,  5],       //4
                    [ 3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  3,  4,  4,  3,  3,  4,  3,  4, 12,  5,  5,  5,  5,  5,  5],       //5
                    [ 4,  4,  4,  4,  4,  3,  4,  4,  4,  3,  3,  4,  3,  3,  4,  4,  4,  4, 12,  5,  5,  5,  5,  5,  5],       //6
                    [ 4,  3,  4,  4,  4,  4,  3,  4,  3,  4,  3,  3,  4,  4,  4,  3,  4,  4,  2, 10, 10,  9, 10, 10,  2],       //7
                    [ 4,  3,  3,  4,  4,  4,  3,  3,  4,  3,  4,  4,  3,  3,  3,  3,  3,  3,  2,  3,  4,  3,  3,  4,  2],       //8
                    [ 4,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  4,  4,  3,  4,  4,  3,  4,  3,  3,  4,  3,  3,  4,  4],       //9
                    [ 4,  3,  4,  3,  3,  4,  3,  4,  3,  3,  4,  3,  3,  4,  4,  3,  3,  4,  4,  4,  3,  3,  3,  4,  3],       //10
                    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,  4,  4,  4,  4,  3,  3,  4,  3,  4,  3,  4,  3,  3],       //11
                    [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 30,  4,  4,  4,  3,  3,  3,  4,  4,  3,  3,  4,  4],       //12
                    [ 5,  5, 10, 10, 10, 10, 10, 10, 10, 10, 10, 21,  3,  3,  3,  3,  3,  3,  3,  3,  4,  3,  3,  3,  4],       //13
                    [ 5,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  4,  4,  3,  4,  4,  3,  4,  4,  4,  4,  3,  4,  3],       //14
                    [10, 27, 10, 10, 10, 10, 10, 10, 10,  5,  5, 26,  3,  4,  4,  4,  3,  4,  3,  3,  3,  3,  3,  3,  3],       //15
                    [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  4,  3,  3,  4,  4,  4,  4,  4,  4,  4,  3,  4,  4],       //16
                    [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  4,  4,  3,  4,  3,  4,  3,  4,  4,  4,  4,  3,  4],       //17
                    [12,  5,  5,  5,  5,  5,  5,  5,  5,  5,  5, 26,  3,  3,  4,  3,  3,  3,  3,  4,  3,  4,  3,  3,  3]        //18
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 18; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 25; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

        }

        if (lOMap[level] === undefined)             //Level Objects map
        {
            lOMap[level] = [];
            for (let y = 0; y < 18; y++)
            {
                lOMap[level][y] = [];

                for (let x = 0; x < 25; x++)
                {
                    lOMap[level][y].push(0)
                }
            }
        }


        if (doorThreeOpen)
        {
            j = door3;
        }

        /*let counter = 0;      //Temp code for burning torches
        letItBurn();

        function letItBurn()
        {
            counter ++;

            if (counter % 3 === 0)
            {
                ctx.drawImage(flameCorner1, 18*32, 7*32);
                ctx.drawImage(flameWall1, 24*32, 7*32);
            }
            else if (counter % 3 === 1)
            {
                ctx.drawImage(flameCorner2, 18*32, 7*32);
                ctx.drawImage(flameWall2, 24*32, 7*32);
            }
            else if (counter % 3 === 2)
            {
                ctx.drawImage(flameCorner3, 18*32, 7*32);
                ctx.drawImage(flameWall3, 24*32, 7*32);
            }

            if (l2)
            {
                setTimeout(letItBurn, 90);
            }
        }
*/

        changePStartPos();


        //Below ensures all elements are on screen when level is drawn
        stairs.onload = function()
        {
            if (!torchesSet)
            {
                lOMap[level][8][18] = 1;    //Torches
                lOMap[level][8][24] = 1;    //Torches
                lOMap[level][7][18] = 2;     //Flame Corner 1
                lOMap[level][7][24] = 3;     //Flame Wall 1
                torchesSet = true;
            }

            l2Ready=true;
        };

        waitTillLoaded();


        function waitTillLoaded()//Loads map after everything is loaded as long as
        {
            if (!l2Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitTillLoaded, 10);
            }
            else if (!alreadyBeenHere)
            {
                drawMap();                   //Draw next map
                alreadyBeenHere=true;
            }
        }
        addEventListener("keydown", onKeyDown, false);
        startX[2] = startY[2] = 0;

    }

    else if (l3)//Clothing Store

    {

        canvas.style.backgroundImage = "";
        bgm_level3.play();


        let floor = new Image();
        let rack1 = new Image();
        let rack2 = new Image();
        let rack3 = new Image();
        let display1 = new Image();
        let display2 = new Image();
        let display3 = new Image();
        let display4 = new Image();
        let counter1 = new Image();
        let counter2 = new Image();
        let counter3 = new Image();
        let wall = new Image();
        let wallLeft = new Image();
        let wallRight = new Image();
        let cabinet = new Image();
        let stair = new Image();
        let doorOpenRight = new Image();
        let doorOpenLeft = new Image();
        let windowClose = new Image();
        let windowOpen = new Image();
        let door1 = new Image();
        let door2 = new Image();
        let chair = new Image();
        let desk = new Image();


        {
            floor.src = "../../3Store/images/floor.png";
            rack1.src = "../../3Store/images/rack_1.png";
            rack2.src = "../../3Store/images/rack_2.png";
            rack3.src = "../../3Store/images/rack_3.png";
            display1.src = "../../3Store/images/display_1.png";
            display2.src = "../../3Store/images/display_2.png";
            display3.src = "../../3Store/images/display_3.png";
            display4.src = "../../3Store/images/display_4.png";
            counter1.src = "../../3Store/images/counter_1.png";
            counter2.src = "../../3Store/images/counter_2.png";
            counter3.src = "../../3Store/images/counter_3.png";
            wall.src = "../../3Store/images/wall_1.png";
            wallLeft.src = "../../3Store/images/wall_left.png";
            wallRight.src = "../../3Store/images/wall_right.png";
            cabinet.src = "../../3Store/images/cabinet.png";
            stair.src = "../../3Store/images/downstair.png";
            doorOpenRight.src = "../../3Store/images/door_open_right.png";
            doorOpenLeft.src = "../../3Store/images/door_open_left.png";
            windowClose.src = "../../3Store/images/window_close.png";
            windowOpen.src = "../../3Store/images/window_open.png";
            door1.src = "../../3Store/images/door_1.png";
            door2.src = "../../3Store/images/door_2.png";
            chair.src = "../../3Store/images/chair.png";
            desk.src = "../../3Store/images/desk.png";
        }//Defining images src properties


        {
            a = floor;         //0
            b = rack1;         //1
            c = rack2;         //2
            d = rack3;         //3
            e = display1;      //4
            f = display2;      //5
            g = display3;      //6
            h = display4;      //7
            i = counter1;      //8
            j = counter2;      //9
            k = counter3;      //10
            l = wall;          //11
            m = wallLeft;      //12
            n = wallRight;     //13
            o = cabinet;     //14
            q = stair;       //15
            r = doorOpenRight;       //16
            s = doorOpenLeft;       //17
            t = windowClose; //18
            u = windowOpen;  //19
            v = door1;       // 20
            w = door2;       //21
            x = desk;        //22
            y = chair;       // 23
        }//Assigning images to global variables


        if (lMap[level] === undefined)
        {
            lMap[level] = [                    //10                          //20
                [18,11,11,11,18,11,11,11,18,11,20,21,11,11,18,11,11,11,18,11,11,11,18,11,11],
                [14, 0, 0,22,22,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,14,14, 0,14,14],
                [22,22, 0, 0,23,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12, 0, 0, 0, 0, 0],
                [23, 0, 0, 0, 0,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,14,14, 0,14,14],
                [ 0, 0, 0,22,22,13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12, 0, 0, 0, 0, 0],
                [22,22, 0, 0,23,13, 0, 0, 0, 0, 4, 5, 0, 0, 4, 5, 0, 0, 0,12,14,14, 0,14,14],
                [23, 0, 0, 0, 0,13, 0, 0, 0, 0, 6, 7, 0, 0, 6, 7, 0, 0, 0,12, 0, 0, 0, 0, 0],
                [11,11,11,11,20,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,11,21,11,11,11,11],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 4, 5, 0, 0, 4, 5, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 6, 7, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 4, 5, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 0, 6, 7, 0, 6, 7, 0],
                [ 0, 4, 5, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 6, 7, 0, 0, 6, 7, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1 ,2 ,3],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 8, 9,10, 8, 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 6, 7, 0, 0, 0, 1, 2, 3, 0, 1, 2, 3],
                [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0]

            ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][16][1] = 1;                    //Set the players starting position
        }


        changePStartPos();


        l3Ready = false;
        desk.onload = function(){l3Ready=true;};
        waitForLoading();


        function waitForLoading()
        {
            if (!l3Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForLoading, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }


        addEventListener("keydown", onKeyDown, false);



        let warningTime = Math.floor(Math.random() * 20 + 10); // generate time to move 5~20
        let findingTime = Math.floor(Math.random() * 10 + 5);  // generate time to wait 5~10

        timer_level3 = setInterval(appearEnemy, 1000);

        function resetTimer()
        {
            t=windowClose;
            drawMap();
            warningTime = Math.floor(Math.random() * 20 + 10);
            findingTime = Math.floor(Math.random() * 10 + 5);
            enemyAppearLevel3 = false;
            dangerous.pause();
            bgm_level3.play();
        }


        function appearEnemy() {
            console.log(warningTime);
            console.log(findingTime);
            warningTime--;
            if (warningTime <= 5 && warningTime > 0) {
                console.log(warningTime);
                bgm_level3.pause();
                dangerous.play();
                drawMap();
                ctx.font = "30px Arial";
                ctx.fillStyle = '#FF0000';
                ctx.fillText("Warning! Mobbist will open window!", 180, 120);
                ctx.fillText(warningTime + " seconds left.", 280, 150);
            }
            if (warningTime === 0) {
                t=windowOpen;
                drawMap();
                enemyAppearLevel3 = true;

            }
            if (enemyAppearLevel3 === true){
                findingTime--;
                drawMap();
                ctx.font = "30px Arial";
                ctx.fillStyle = '#FF0000';
                ctx.fillText("Mobbists are finding you!", 230, 120);
                ctx.fillText("Don't move for " + findingTime + " seconds.", 220, 150);

                if (findingTime === 0) {
                    resetTimer();
                }
            }
            if (detectPlayerLevel3 === true)
            {
                resetTimer();
                detectPlayerLevel3 = false;
            }
        }
    }

    else if (l4)//The Streetz

    {
        canvas.style.backgroundImage = "";


        let street = new Image();
        let side = new Image();
        let house1 = new Image();
        let bank1 = new Image();
        let bank2 = new Image();
        let bank3 = new Image();
        let bank4 = new Image();
        let clothingStore1 = new Image();
        let clothingStore2 = new Image();
        let clothingStore3 = new Image();
        let clothingStore4 = new Image();
        let clothingStore5 = new Image();
        let clothingStore6 = new Image();
        let coffee1 = new Image();
        let coffee2 = new Image();
        let coffee3 = new Image();
        let coffee4 = new Image();
        let house = new Image();
        let machine = new Image();
        let mall1 = new Image();
        let mall2 = new Image();
        let mall3 = new Image();
        let mall4 = new Image();
        let mall5 = new Image();
        let mall6 = new Image();
        let mall7 = new Image();
        let mall8 = new Image();
        let mall9 = new Image();
        let mall10 = new Image();
        let mall11 = new Image();
        let mall12 = new Image();
        let market1 = new Image();
        let market2 = new Image();
        let market3 = new Image();
        let market4 = new Image();
        let market5 = new Image();
        let market6 = new Image();
        let market7 = new Image();
        let market8 = new Image();
        let market9 = new Image();
        let momsHouse1 = new Image();
        let momsHouse2 = new Image();
        let momsHouse3 = new Image();
        let momsHouse4 = new Image();
        let momsHouse5 = new Image();
        let momsHouse6 = new Image();
        let momsHouse7 = new Image();
        let momsHouse8 = new Image();
        let momsHouse9 = new Image();
        let park1 = new Image();
        let park2 = new Image();
        let park3 = new Image();
        let park4 = new Image();
        let park5 = new Image();
        let park6 = new Image();
        let park7 = new Image();
        let park8 = new Image();
        let park9 = new Image();
        let school1 = new Image();
        let school2 = new Image();
        let school3 = new Image();
        let school4 = new Image();
        let school5 = new Image();
        let school6 = new Image();
        let school7 = new Image();
        let school8 = new Image();
        let school9 = new Image();
        let store1 = new Image();
        let store2 = new Image();
        let store3 = new Image();
        let store4 = new Image();


        {
            bank1.src = "../../4Streetz/images/bank1.png";
            bank2.src = "../../4Streetz/images/bank2.png";
            bank3.src = "../../4Streetz/images/bank3.png";
            bank4.src = "../../4Streetz/images/bank4.png";
            clothingStore1.src = "../../4Streetz/images/clothingStore1.png";
            clothingStore2.src = "../../4Streetz/images/clothingStore2.png";
            clothingStore3.src = "../../4Streetz/images/clothingStore3.png";
            clothingStore4.src = "../../4Streetz/images/clothingStore4.png";
            clothingStore5.src = "../../4Streetz/images/clothingStore5.png";
            clothingStore6.src = "../../4Streetz/images/clothingStore6.png";
            coffee1.src = "../../4Streetz/images/coffee1.png";
            coffee2.src = "../../4Streetz/images/coffee2.png";
            coffee3.src = "../../4Streetz/images/coffee3.png";
            coffee4.src = "../../4Streetz/images/coffee4.png";
            house.src = "../../4Streetz/images/house.png";
            machine.src = "../../4Streetz/images/machine.png";
            mall1.src = "../../4Streetz/images/mall1.png";
            mall2.src = "../../4Streetz/images/mall2.png";
            mall3.src = "../../4Streetz/images/mall3.png";
            mall4.src = "../../4Streetz/images/mall4.png";
            mall5.src = "../../4Streetz/images/mall5.png";
            mall6.src = "../../4Streetz/images/mall6.png";
            mall7.src = "../../4Streetz/images/mall7.png";
            mall8.src = "../../4Streetz/images/mall8.png";
            mall9.src = "../../4Streetz/images/mall9.png";
            mall10.src = "../../4Streetz/images/mall10.png";
            mall11.src = "../../4Streetz/images/mall11.png";
            mall12.src = "../../4Streetz/images/mall12.png";
            market1.src = "../../4Streetz/images/market1.png";
            market2.src = "../../4Streetz/images/market2.png";
            market3.src = "../../4Streetz/images/market3.png";
            market4.src = "../../4Streetz/images/market4.png";
            market5.src = "../../4Streetz/images/market5.png";
            market6.src = "../../4Streetz/images/market6.png";
            market7.src = "../../4Streetz/images/market7.png";
            market8.src = "../../4Streetz/images/market8.png";
            market9.src = "../../4Streetz/images/market9.png";
            momsHouse1.src = "../../4Streetz/images/momsHouse1.png";
            momsHouse2.src = "../../4Streetz/images/momsHouse2.png";
            momsHouse3.src = "../../4Streetz/images/momsHouse3.png";
            momsHouse4.src = "../../4Streetz/images/momsHouse4.png";
            momsHouse5.src = "../../4Streetz/images/momsHouse5.png";
            momsHouse6.src = "../../4Streetz/images/momsHouse6.png";
            momsHouse7.src = "../../4Streetz/images/momsHouse7.png";
            momsHouse8.src = "../../4Streetz/images/momsHouse8.png";
            momsHouse9.src = "../../4Streetz/images/momsHouse9.png";
            park1.src = "../../4Streetz/images/park1.png";
            park2.src = "../../4Streetz/images/park2.png";
            park3.src = "../../4Streetz/images/park3.png";
            park4.src = "../../4Streetz/images/park4.png";
            park5.src = "../../4Streetz/images/park5.png";
            park6.src = "../../4Streetz/images/park6.png";
            park7.src = "../../4Streetz/images/park7.png";
            park8.src = "../../4Streetz/images/park8.png";
            park9.src = "../../4Streetz/images/park9.png";
            school1.src = "../../4Streetz/images/school1.png";
            school2.src = "../../4Streetz/images/school2.png";
            school3.src = "../../4Streetz/images/school3.png";
            school4.src = "../../4Streetz/images/school4.png";
            school5.src = "../../4Streetz/images/school5.png";
            school6.src = "../../4Streetz/images/school6.png";
            school7.src = "../../4Streetz/images/school7.png";
            school8.src = "../../4Streetz/images/school8.png";
            school9.src = "../../4Streetz/images/school9.png";
            store1.src= "../../4Streetz/images/store1.png";
            store2.src= "../../4Streetz/images/store2.png";
            store3.src= "../../4Streetz/images/store3.png";
            store4.src= "../../4Streetz/images/store4.png";
            street.src = "../../4Streetz/images/street.png";
            house1.src= "../../4Streetz/images/house.png";
            side.src = "../../4Streetz/images/side.png";
        }//Defining images src properties

        {
            a = side;               //0
            b = street;             //1
            c = clothingStore1;     //2
            d = clothingStore2;     //3
            e = clothingStore3;     //4
            f = clothingStore4;     //5
            g = clothingStore5;     //6
            h = clothingStore6;     //7
            i = market1;            //8
            j = market2;            //9
            k = market3;            //10
            l = market4;            //11
            m = market5;            //12
            n = market6;            //13
            o = market7;            //14
            q = market8;            //15
            r = market9;            //16
            s = house1;             //17
            t = machine;            //18
            u = momsHouse1;         //19
            v = momsHouse2;         //20
            w = momsHouse3;         //21
            x = momsHouse4;         //22
            y = momsHouse5;         //23
            z = momsHouse6;         //24
            aa = momsHouse7;        //25
            bb = momsHouse8;        //26
            cc = momsHouse9;        //27
            dd = momsHouse5;        //28
            ee = mall1;         //29
            ff = mall2;         //30
            gg = mall3;         //31
            hh = mall4;         //32
            ii = mall5;         //33
            jj = mall6;         //34
            kk = mall7;         //35
            ll = mall8;         //36
            mm = mall9;         //37
            nn = mall10;        //38
            oo = mall11;        //39
            qq = mall12;        //40
            rr = store1;        //41
            ss = store2;        //42
            tt = store3;        //43
            uu = store4;        //44
            vv = bank1;         //45
            ww = bank2;         //46
            xx = bank3;         //47
            yy = bank4;         //48
            zz = coffee1;       //49
            aaa = coffee2;      //50
            bbb = coffee3;      //51
            ccc = coffee4;      //52
            ddd = school1;      //53
            eee = school2;      //54
            fff = school3;      //55
            ggg = school4;      //56
            hhh = school5;      //57
            iii = school6;      //58
            jjj = school7;      //59
            kkk = school8;      //60
            lll = school9;      //61
            mmm = park1;      //62
            nnn = park2;      //63
            ooo = park3;      //64
            qqq = park4;      //65
            rrr = park5;      //66
            sss = park6;      //67
            ttt = park7;      //68
            uuu = park8;      //69
            vvv = park9;      //70
            www = park1;      //71
        }//Assigning images to global variables



        if (lMap[level] === undefined)
        {
            lMap[level] =
                [
                    //                                  10                                          20
                    [0,	0,	0,	17,	17,	17,	17,	17,	17,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	2,	3,	4],
                    [0,	0,	0,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	8,	9,	10,	0,	5,	6,	7],
                    [0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	11,	12,	13,	1,	1,	1,	0],
                    [0,17,	0,	1,	0,	0,	0,	0,	1,	0,	29,	30,	31,	0,	0,	0,	0,	18,	14,	15,	16,	1,	0,	1,	0],
                    [0,	1,	1,	1,	0,	0,	0,	0,	1,	0,	32,	33,	34,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	1,	0],
                    [0,	0,	0,	1,	0,	49,	50,	0,	1,	0,	35,	36,	37,	0,	0,	17,	17,	17,	1,	0,	0,	1,	0,	1,	0],
                    [0,17,	0,	1,	0,	51,	52,	18,	1,	0,	38,	39,	40,	18,	0,	1,	1,	1,	1,	1,	1,	1,	0,	1,	0],
                    [0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	0,	1,	0],
                    [0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	1,	0],
                    [0,17,	0,	1,	0,	0,	0,	0,	1,	0,	45,	46,	0,	0,	0,	1,	0,	0,	0,	0,	0,	1,	0,	1,	0],
                    [0,	1,	1,	1,	0,	17,	17,	0,	1,	0,	47,	48,	18,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0],
                    [0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	19, 20, 21, 0,	0,	1,	0,	0,	0],
                    [0, 0,	0,	1,	0,	53, 54,	55,	1,	0,	0,	0,	0,	0,	0,	0,	22,	23,	24,	0,	0,	1,	1,	1,	0],
                    [0, 0,	0,	1,	0,	56,	57,	58,	1,	0,	0,	0,	41,	42, 0, 0,	25,	26,	27,	0,	0,	0,	0,	1,	0],
                    [0, 0,  0,	1,	18,	59,	60,	61,	1,	0,	0,	18,	43,	44,	0,	0,	1,	1,	1,	0,	0,	0,	0,	1,	0],
                    [0,0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0],
                    [62,63,	64,	1,	17, 17,	17,	17,	17,	17,	17,	17,	17,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0],
                    [65,66,	67,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0],
                    [68,69,	70,	0,	0,	0,	0,	0,	0,	0,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0]
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][0][0] = 1;                             //Set the players starting position
        }


        changePStartPos();


        l4Ready = false;
        side.onload = function(){l4Ready=true;};
        waitForLoad();


        function waitForLoad()
        {
            if (!l4Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForLoad, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }



        addEventListener("keydown", onKeyDown, false);
    }
    
    else if (l5)//Moms House

    {
        canvas.style.backgroundImage = "";

        let wall = new Image();
        let door = new Image();
        let floor = new Image();
        let cat = new Image();
        let w1 = new Image();
        let w2 = new Image();
        let w3 = new Image();
        let w4 = new Image();
        let w5 = new Image();
        let granny2 = new Image();
        let piano1 = new Image();
        let piano2 = new Image();
        let piano3 = new Image();
        let piano4 = new Image();
        let window1 = new Image();
        let catPro1 = new Image();
        let catPro2 = new Image();
        let catPro3 = new Image();
        let catPro4 = new Image();


        {
            wall.src = "../../5MomsPlace/images/wall.png";  //0
            door.src = "../../5MomsPlace/images/door.png"; //1
            floor.src = "../../5MomsPlace/images/floor.png";  //2
            cat.src = "../../5MomsPlace/images/cat.png";  //3
            w1.src = "../../5MomsPlace/images/w1.png"; //4
            w2.src = "../../5MomsPlace/images/w2.png"; //5
            w3.src = "../../5MomsPlace/images/w3.png"; //6
            w4.src = "../../5MomsPlace/images/w4.png"; //7
            w5.src = "../../5MomsPlace/images/w5.png"; //8
            granny2.src = "../../5MomsPlace/images/granny2.png"; //9
            piano1.src = "../../5MomsPlace/images/piano1.png"; //10
            piano2.src = "../../5MomsPlace/images/piano2.png"; //11
            piano3.src = "../../5MomsPlace/images/piano3.png"; //12
            piano4.src = "../../5MomsPlace/images/piano4.png"; //13
            window1.src = "../../5MomsPlace/images/window1.png"; //14
            catPro1.src = "../../5MomsPlace/images/catPro1.png"; //15
            catPro2.src = "../../5MomsPlace/images/catPro2.png"; //16
            catPro3.src = "../../5MomsPlace/images/catPro3.png"; //17
            catPro4.src = "../../5MomsPlace/images/catPro4.png"; //18
        }//Defining Images src properties


        {
            a = wall;
            b = door;
            c = floor;
            d = cat;
            e = w1;
            f = w2;
            g = w3;
            h = w4;
            i = w5;
            j = granny2;
            k = piano1;
            l = piano2;
            m = piano3;
            n = piano4;
            o = window1;
            q = catPro1;
            r = catPro2;
            s = catPro3;
            t = catPro4;
        }//Assigning images to globale variables


        if (lMap[level] === undefined)
        {
            lMap[level] =
                //                  10                  20
                [  //1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5
                    [1,0,0,14,0,0,0,0,14,0,0,0,0,14,0,0,0,0,14,0,0,0,0,14,0],    //0
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,5,5,6,7,8,2,2,2],    //1
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //2
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //3
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //4
                    [2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,9,2,18,2,2,2,2,2,2],    //5
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //6
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,15,2,2,2,2,2,2,2,2,2,2,2],    //7
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //8
                    [2,2,17,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //9
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //10
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,16,2,2,2,2,2,2],    //11
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //12
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //13
                    [2,2,2,2,2,16,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,15],    //14
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //15
                    [2,2,10,11,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2],    //16
                    [2,2,12,13,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //17
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]     //18
                ];
        }



        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][0][0] = 1;
        }


        changePStartPos();


        l5Ready = false;
        catPro4.onload = function(){l5Ready=true;};
        waitingForLoad();


        function waitingForLoad()
        {
            if (!l5Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitingForLoad, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }


        addEventListener("keydown", onKeyDown, false);
    }

    else if (l6)//Roof (Home)

    {
        canvas.style.backgroundImage = "url('../../6Roof/images/city.gif')";


        let roof = new Image();
        let wall = new Image();
        let shinglesEdge = new Image();
        let shinglesLeft = new Image();
        let shinglesRight = new Image();
        let shinglesBRight = new Image();


        {
            roof.src = "../../6Roof/images/shingles.jpg";
            wall.src = "../../6Roof/images/wall.png";
            shinglesEdge.src = "../../6Roof/images/shinglesEdge.jpg";
            shinglesLeft.src = "../../6Roof/images/shinglesLeft.png";
            shinglesRight.src = "../../6Roof/images/shinglesRight.png";
            shinglesBRight.src = "../../6Roof/images/shinglesBRight.png";
        }//Defining Images src properties

        {
            //Below one letter variables must be updated upon calling each level
            a = roof;           //0
            b = wall;           //1
            c = undefined;      //2
            d = undefined;      //3
            e = shinglesEdge;   //4
            f = shinglesLeft;   //5
            g = shinglesRight;  //6
            h = exit;           //7
            i = shinglesBRight;
        }//Assigning images to global variables


        if (lMap[level] === undefined) //Initialize this levels map if it has not been initialized
        {
            lMap[level] = //Map for level 1
                [//                      10                  20      24
                   //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4

                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //0
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //1
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //2
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //3
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //4
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],      //5
                    [0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2,2,2,2],      //6
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2,2,2],      //7
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2,2],      //8
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2,2],      //9
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,2,2,2,2,2,2,2,2],      //10
                    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,8,2,2,2,2,2,2,2],      //11
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //12
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //13
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //14
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //15
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //16
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2],      //17
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2]       //18
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 24; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 18; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][14][10] = 1; //Putting the player (scientist) into the player map for this level
        }


        changePStartPos();

        shinglesBRight.onload = function(){l6Ready=true;};
        addEventListener("keydown", onKeyDown, false);

    }

    else if (l7)//Lab
    {
        canvas.style.backgroundImage = "";


        let floor = new Image();
        let wall = new Image();
        let door1 = new Image();
        let stairs = new Image();
        let emptyShelvesTop = new Image();
        let emptyShelvesBottom = new Image();
        let lockerTop = new Image();
        let lockerBottom = new Image();
        let computerTop = new Image();
        let computerBottom = new Image();
        let metalCabinetTop = new Image();
        let metalCabinetBottom = new Image();
        let glassCabinetTop = new Image();
        let glassCabinetBottom = new Image();
        let fullShelvesTop = new Image();
        let fullShelvesBottom = new Image();
        let openWindow = new Image();
        let closedWindow = new Image();


        {
            openWindow.src = "../../7Lab/images/openWindow.png";
            fullShelvesBottom.src = "../../7Lab/images/fullShelves-bottom.png";
            fullShelvesTop.src = "../../7Lab/images/fullShelves-top.png";
            glassCabinetBottom.src = "../../7Lab/images/glassCabinet-bottom.png";
            glassCabinetTop.src = "../../7Lab/images/glassCabinet-top.png";
            metalCabinetBottom.src = "../../7Lab/images/metalCabinet-bottom.png";
            metalCabinetTop.src = "../../7Lab/images/metalCabinet-top.png";
            computerBottom.src = "../../7Lab/images/computer-bottom.png";
            computerTop.src = "../../7Lab/images/computer-top.png";
            lockerBottom.src = "../../7Lab/images/locker-bottom.png";
            lockerTop.src = "../../7Lab/images/locker-top.png";
            emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png";
            emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png";
            stairs.src = "../../7Lab/images/stairs.png";
            door1.src = "../../7Lab/images/door1.png";
            wall.src = "../../7Lab/images/Wall.png";
            floor.src = "../../7Lab/images/Floor.png";
            closedWindow.src = "../../7Lab/images/closedWindow.png";
        }//Defining images src property


        {
            a = wall;				// 0
            b = floor;				// 1
            c = door1;				// 2
            d = stairs;				// 3
            e = emptyShelvesTop;	// 4
            f = emptyShelvesBottom;	// 5
            g = lockerTop;			// 6
            h = lockerBottom;		// 7
            i = computerTop;		// 8
            j = computerBottom;		// 9
            k = metalCabinetTop;	// 10
            l = metalCabinetBottom;	// 11
            m = glassCabinetTop;	// 12
            n = glassCabinetBottom;	// 13
            o = fullShelvesTop;		// 14
            q = fullShelvesBottom;  // 15
			if (windowClosed == true)
			{
				r = closedWindow;	// 16
			}
			else
			{
				r = openWindow;		// 16
			}
            if (lighterFluid == false)
			{
				s = fullShelvesTop;		// 17
				t = fullShelvesBottom;	// 18
			}
			else
			{
				s = emptyShelvesTop;	// 17
				t = emptyShelvesBottom;	// 18
			}
        }//Assigning images to global variables


        if (lMap[level] === undefined) //Defining Level's Map
        {
            lMap[level] =
                //                    10                  20
                [  //0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 17, 14, 16, 14, 10, 10, 10, 10, 6, 6, 6, 4, 0],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 18, 15, 1, 15, 11, 11, 11, 11, 7, 7, 7, 5, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3]
                ];
        }

        if (lPMap[level] === undefined) //Defining Level's Player Map
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][1][0] = 1;
        }


        changePStartPos();


        closedWindow.onload = function(){l7Ready=true;};
        addEventListener("keydown", onKeyDown, false);
    }

    else if (l8)
    {
        canvas.style.backgroundImage = "";


        let floor = new Image();
        let wall = new Image();
        let door1 = new Image();
        let stairs = new Image();
        let emptyShelvesTop = new Image();
        let emptyShelvesBottom = new Image();
        let lockerTop = new Image();
        let lockerBottom = new Image();
        let computerTop = new Image();
        let computerBottom = new Image();
        let metalCabinetTop = new Image();
        let metalCabinetBottom = new Image();
        let glassCabinetTop = new Image();
        let glassCabinetBottom = new Image();
        let fullShelvesTop = new Image();
        let fullShelvesBottom = new Image();
        let openWindow = new Image();
        let closedWindow = new Image();
		let trash = new Image();


        {
            floor.src = "../../7Lab/images/Floor.png";
            wall.src = "../../7Lab/images/Wall.png";
            door1.src = "../../7Lab/images/door1.png";
            stairs.src = "../../7Lab/images/stairs.png";
            emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png";
            emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png";
            lockerTop.src = "../../7Lab/images/locker-top.png";
            lockerBottom.src = "../../7Lab/images/locker-bottom.png";
            computerTop.src = "../../7Lab/images/computer-top.png";
            computerBottom.src = "../../7Lab/images/computer-bottom.png";
            metalCabinetTop.src = "../../7Lab/images/metalCabinet-top.png";
            metalCabinetBottom.src = "../../7Lab/images/metalCabinet-bottom.png";
            glassCabinetTop.src = "../../7Lab/images/glassCabinet-top.png";
            glassCabinetBottom.src = "../../7Lab/images/glassCabinet-bottom.png";
            fullShelvesTop.src = "../../7Lab/images/fullShelves-top.png";
            fullShelvesBottom.src = "../../7Lab/images/fullShelves-bottom.png";
            openWindow.src = "../../7Lab/images/openWindow.png";
            closedWindow.src = "../../7Lab/images/closedWindow.png";
			trash.src = "../../7Lab/images/trash.png";
        }//Defined SRC Property for all level images


        {
            a = wall;				// 0
            b = floor;				// 1
            c = door1;				// 2
            d = stairs;				// 3
			e = fullShelvesTop;		// 4
			f = fullShelvesBottom;	// 5
			g = emptyShelvesTop;	// 6
			h = emptyShelvesBottom;	// 7
			if (researchPaper == true)
			{
				i = emptyShelvesTop;	// 8
				j = emptyShelvesBottom;	// 9
			}
			else
			{
				i = fullShelvesTop;		// 8
				j = fullShelvesBottom;	// 9
			}
			k = trash;				// 10
        }//Assigne images to global letter variables


        if (lMap[level] === undefined)
        {
            lMap[level]=
                //                    10                  20
                [  //0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4,	5,	6,	7,	8,	9,	0,	1,	2,	3,	4
                    [3,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	8,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	9,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [10,1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1],
                    [0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0]
                ];
        }


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 18; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 24; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
            lPMap[level][1][0] = 1;
        }


        changePStartPos();


        closedWindow.onload = function(){l8Ready=true;};
        addEventListener("keydown", onKeyDown, false);
    }

    else if (l11)//SewerPipe Map
    {
        canvas.style.backgroundImage = "";


        let valveTl = new Image();
        let valveTm = new Image();
        let valveTr = new Image();
        let valveMl = new Image();
        let valveMm = new Image();
        let valveMr = new Image();
        let valveBl = new Image();
        let valveBm = new Image();
        let valveBr = new Image();
        let wall = new Image();
        let upperWall = new Image();
        let pipeTopView = new Image();


        {
            valveTm.src = "../../2Sewer/images/valveTm.png";
            valveTl.src = "../../2Sewer/images/valveTl.png";
            valveTr.src = "../../2Sewer/images/valveTr.png";
            valveMl.src = "../../2Sewer/images/valveMl.png";
            valveMm.src = "../../2Sewer/images/valveMm.png";
            valveMr.src = "../../2Sewer/images/valveMr.png";
            valveBl.src = "../../2Sewer/images/valveBl.png";
            valveBm.src = "../../2Sewer/images/valveBm.png";
            valveBr.src = "../../2Sewer/images/valveBr.png";
            wall.src = "../../2Sewer/images/unusedWallTiles/wall.png";
            upperWall.src = "../../2Sewer/images/upperWall.png";
            pipeTopView.src = "../../2Sewer/images/pipe3.png";
        }//Defining images src properties


        {
            a = undefined;           //0
            b = wall;                //1
            c = upperWall;           //2
            d = sewerFloor;          //3
            e = sewerFloor;          //4
            f = valveTl;             //5
            g = valveTm;             //6
            h = valveTr;             //7
            i = valveMl;             //8
            j = valveMm;             //9
            k = valveMr;             //10
            l = valveBl;             //11
            m = valveBm;             //12
            n = valveBr;             //13
            o = pipeTopView;           //14
        }//Assigning images to global variables


        if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
        {
            lMap[level] =                                           //Initialize this levels map
                //                                 10                            20
                [  //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4

                    [ 2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  5,  6,  7,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2],        //0
                    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  8,  9, 10,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],        //1
                    [ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 11, 12, 13,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1],                        //2
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //3
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //4
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //5
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //6
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //7
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //8
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //9
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //10
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //11
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //12
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //13
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //14
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //15
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //16
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],        //17
                    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0, 14,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]         //18
                ];
        }

    for (let y = 3; y < lMap[level].length; y++)                        //Randomize floor pattern
    {
        for (let x = 0; x < lMap[level][0].length; x++)
        {
            lMap[level][y][x] = (Math.floor(Math.random() * 2) + 3);
        }
    }


        lMap[level][18][12] = 14;


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 25; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 18; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
        }

        changePStartPos();
        pipeTopView.onload = function(){l11Ready = true;};

        addEventListener("keydown", onKeyDown, false);
    }

}















function fillErasedMap()
//Re-draws only the section of map that was erased by the character moving over
//  it vs. redrawing the whole map.(helps with game speed)
{
    ctx.clearRect(p.prevCol * 32, p.prevRow * 32, 32, 48);

    let thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where

    for (let mR = p.row - 2; mR < p.row + 4; mR ++) //Run through all rows in the levels map (mR = map row)
    {
        for (let mC = p.col - 2; mC < p.col + 3; mC ++)//Run through all the columns in the levels map (mC = map Column)
        {
            let xPos = undefined, yPos= undefined; //Defined vars that will be used for positioning images to be drawn

            if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
            {
                xPos = mC*32;
                yPos = mR*32;

                switch (lMap[level][mR][mC])//check what needs drawing based on map index
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
                        floorSpriteX = 32;
                        thingToDraw = d;
                        break;
                    case 4:
                        floorSpriteX = 64;
                        thingToDraw = e;
                        break;
                    case 5:
                        floorSpriteX = 96;
                        thingToDraw = f;
                        break;
                    case 6:
                        thingToDraw = g;
                        break;
                    case 7:
                        if (l2 && !sewersDrained)
                            thingToDraw = wetPipe;
                        else
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
                    case 14:
                        thingToDraw = o;
                        break;
                    case 15:
                        thingToDraw = q;
                        break;
                    case 16:
                        thingToDraw = r;
                        break;
                    case 17:
                        thingToDraw = s;
                        break;
                    case 18:
                        thingToDraw = t;
                        break;
                    case 19:
                        thingToDraw = u;
                        break;
                    case 20:
                        thingToDraw = v;
                        break;
                    case 21:
                        thingToDraw = w;
                        break;
                    case 22:
                        thingToDraw = x;
                        break;
                    case 23:
                        thingToDraw = y;
                        break;
                    case 24:
                        thingToDraw = z;
                        break;
                    case 25:
                        thingToDraw = aa;
                        break;
                    case 26:
                        thingToDraw = bb;
                        break;
                    case 27:
                        thingToDraw = cc;
                        break;
                    case 28:
                        thingToDraw = dd;
                        break;
                    case 29:
                        thingToDraw = ee;
                        break;
                    case 30:
                        thingToDraw = ff;
                        break;
                    case 31:
                        thingToDraw = gg;
                        break;
                    case 32:
                        thingToDraw = hh;
                        break;
                    case 33:
                        thingToDraw = ii;
                        break;
                    case 34:
                        thingToDraw = jj;
                        break;
                    case 35:
                        thingToDraw = kk;
                        break;
                    case 36:
                        thingToDraw = ll;
                        break;
                    case 37:
                        thingToDraw = mm;
                        break;
                    case 38:
                        thingToDraw = nn;
                        break;
                    case 39:
                        thingToDraw = oo;
                        break;
                    case 40:
                        thingToDraw = qq;
                        break;
                    case 41:
                        thingToDraw = rr;
                        break;
                    case 42:
                        thingToDraw = ss;
                        break;
                    case 43:
                        thingToDraw = tt;
                        break;
                    case 44:
                        thingToDraw = uu;
                        break;
                    case 45:
                        thingToDraw = vv;
                        break;
                    case 46:
                        thingToDraw = ww;
                        break;
                    case 47:
                        thingToDraw = xx;
                        break;
                    case 48:
                        thingToDraw = yy;
                        break;
                    case 49:
                        thingToDraw = zz;
                        break;
                    case 50:
                        thingToDraw = aaa;
                        break;
                    case 51:
                        thingToDraw = bbb;
                        break;
                    case 52:
                        thingToDraw = ccc;
                        break;
                    case 53:
                        thingToDraw = ddd;
                        break;
                    case 54:
                        thingToDraw = eee;
                        break;
                    case 55:
                        thingToDraw = fff;
                        break;
                    case 56:
                        thingToDraw = ggg;
                        break;
                    case 57:
                        thingToDraw = hhh;
                        break;
                    case 58:
                        thingToDraw = iii;
                        break;
                    case 59:
                        thingToDraw = jjj;
                        break;
                    case 60:
                        thingToDraw = kkk;
                        break;
                    case 61:
                        thingToDraw = lll;
                        break;
                    case 62:
                        thingToDraw = mmm;
                        break;
                    case 63:
                        thingToDraw = nnn;
                        break;
                    case 64:
                        thingToDraw = ooo;
                        break;
                    case 65:
                        thingToDraw = qqq;
                        break;
                    case 66:
                        thingToDraw = rrr;
                        break;
                    case 67:
                        thingToDraw = sss;
                        break;
                    case 68:
                        thingToDraw = ttt;
                        break;
                    case 69:
                        thingToDraw = uuu;
                        break;
                    case 70:
                        thingToDraw = vvv;
                        break;
                    case 71:
                        thingToDraw = www;
                        break;
                    case 72:
                        thingToDraw = xxx;
                        break;
                    case 73:
                        thingToDraw = yyy;
                        break;
                    case 74:
                        thingToDraw = zzz;
                        break;
                }


                //Below is exclusively for sewer level
                if (thingToDraw !== undefined)      //If there is something to be drawn in area being examined
                {
                    if (thingToDraw === sewerFloor  && (l2 || l11))
                        // If drawing the floor on level 2
                        // then draw based on floorSpriteX var positioning
                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                    else
                        //Otherwise draw regularly
                        ctx.drawImage(thingToDraw, (mC * 32), (mR * 32));
                }

                if (xPos !== undefined && yPos !== undefined)
                {
                    if (!sewersDrained && l2)//Draw the section of sewage that was just erased
                    {
                        ctx.fillStyle = "rgba(47, 141, 91, 0.41)";          //Change to swamp colour green
                        if ((yPos === 0 && xPos !== 320) && xPos < 576)
                            ctx.fillRect(xPos, yPos + 24, 32, 24);//Draw over the bottom quarter of the tiles on row 0 (to make water look knee level)
                        else if (yPos === 352 && xPos < 384)
                            ctx.fillRect(xPos, yPos, 32, 2);
                        else if (yPos === 352 && xPos === 384)//Steps
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                        {
                            ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                            ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                            ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step


                            ctx.fillRect(xPos + 15, yPos, 17, 32);
                        }
                        else if (yPos >= 416 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos >= 352 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)    //For drawing only where the water should be
                            ctx.fillRect(xPos, yPos, 32, 32);               //^^^^^
                        else if (yPos > 0 && yPos < 352 && xPos === 320)                  //      ^^^^^
                            ctx.fillRect(xPos, yPos, 32, 32);               //            ^^^^^^
                        else if (yPos === 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos + 28, 32, 4);           //Draw over the bottom eighth of the tiles// of the secondary rooms outer wall// (to make water look knee level)
                        else if (yPos > 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos, 32, 32);

                        ctx.fillStyle = "rgba(98, 79, 18, 0.51)";           //Change to swamp colour brown and do above

                        if ((yPos === 0 && xPos !== 320) && xPos < 576)
                            ctx.fillRect(xPos, yPos + 24, 32, 24);
                        else if (yPos === 352 && xPos < 384)
                            ctx.fillRect(xPos, yPos, 32, 2);
                        else if (yPos === 352 && xPos === 384)//Steps
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                        {
                            ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                            ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                            ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step

                            ctx.fillRect(xPos + 15, yPos, 17, 32);
                        }
                        else if (yPos >= 416 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos >= 352 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos === 320)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos + 28, 32, 4);
                        else if (yPos > 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                    }
                }
            }
        }
    }
    if (!lightsOn && l2)                //If 'the lights are off' on level two
    {
        let xPos = (p.col + 1) * 32, yPos = p.row * 32;

        ctx.fillStyle = "rgba(0, 0, 0, 1)";     //Draw a black block over areas not 'lit by torch'
        ctx.fillRect(xPos + 48, 0, 800, 600);
        ctx.fillRect(0, yPos + 96, 800, 600);
        ctx.fillRect(0, 0, xPos - 80, 600);
        ctx.fillRect(0, 0, 800, yPos - 32);
    }



    if (dialog)
        displayTextBubble();
    if (lOMap[level] !== undefined)
        drawOMap();
}

function changePStartPos()
{
    for (let y = 0; y < lPMap[level].length; y++) //Run through all Rows
    {
        for (let x = 0; x < lPMap[level][0].length; x++) // and columns
        {
            lPMap[level][y][x] = 0;                           // and set their value to 0 (0 is nothing - 1 is player)
        }
    }

    lPMap[level][startY[level]][startX[level]] = 1;   //Set players map position in the levels player map
    p.row = startY[level];                              // then set player objects row
    p.col = startX[level];                                // and column to match
    p.prevRow = p.row;
    p.prevCol = p.col;
}

function drawPMap()//Player Map
{
    let destX = 0, destY = 0;       //Used to decide which area of map to draw

    //Sets position on tile sheet to
    // pick from when drawing player
    p.srcX = p.width * (p.frameX % 4);
    p.srcY = p.height * p.frameY;

    for (let row = 0; row < lPMap[level].length; row++)         //Run through rows
    {
        for (let col = 0; col < lPMap[level][0].length; col++)      // and columns, checking each element for the player
        {
            switch (lPMap[level][row][col])
            {
                case 1:                                                 //If the element check contains the player
                    if (!sewersDrained && l2 && (p.row < 11 || p.col > 11))                           //and the sewer is filled with water
                                                                            //draw the players standing in water image
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, destX, destY, p.width, p.height);
                    else                                                 //and the sewer is  not filled with water//draw the players regular image
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, destX, destY, p.width, p.height);
                    break;
                case 2:
                    if (l2)
                    {
                        if (!sewersDrained)
                        {
                            ctx.drawImage(torchSwamp, 0, 0, 32, 32, destX, destY, 32, 32);
                        }
                        else
                        {
                            ctx.drawImage(torch, 0, 0, 32, 32, destX, destY, 32, 32);
                        }
                    }
                    break;
            }
            destX += 32;         //Increment column by 1 (8 is column width in ratio to the canvas width)
        }
        destX = 0;              //Start over at beginning position of array as we are at a new row
        destY += 32;             //Increment row by 1 (8 is rows height in ratio to the canvas height)
    }

    notWalking = true;
    let alreadyDoinIt = false;

    if (!alreadyDoinIt)
        if (l6 && !walkedUpAlready)
        {
            removeEventListener("keydown", onKeyDown, false);
            alreadyDoinIt = true;
            let steps = 0;
            upTheFireEscape();
            function upTheFireEscape()
            {
                steps++;
                p.srcX++;
                p.srcY = 2;

                let row = ((448 - (8 * (steps - 4))) / 32);
                let col = (309 + 11 + (8 * steps)) / 32;

                if (steps !== 12 && steps !== 16 && steps !== 20)
                {
                    if (Number.isInteger(col))
                    {
                        lPMap[level][p.row][p.col] = 0;
                        p.col++;
                        lPMap[level][p.row][p.col] = 1;
                    }
                    if (Number.isInteger(row) && steps !== 20)
                    {
                        lPMap[level][p.row][p.col] = 0;
                        p.row--;
                        lPMap[level][p.row][p.col] = 1;
                    }
                }
                if (steps < 4)
                {
                    fillErasedMap();
                    drawL6Full();
                    ctx.drawImage(scientist, (p.srcX%4) * 32, 96, 32, 48, 309 + (8 * steps), 448, 32, 48);
                    setTimeout(upTheFireEscape, walkingSpeed * 3); //Multiplying by two makes walk player slower
                }
                /*else if (steps === 12)
                {
                    /!*drawL6Full();*!/
                    setTimeout(upTheFireEscape, walkingSpeed * 3); //Multiplying by two makes walk player slower
                }*/
                else if (steps < 21)
                {
                    fillErasedMap();
                    drawL6Full();
                    ctx.drawImage(scientist, (p.srcX % 4) * 32, 96, 32, 48, 309 + (8 * (steps)), 448 - (8 * (steps - 3)), 32, 48);
                    setTimeout(upTheFireEscape, walkingSpeed * 3);//Multiplying by two makes walk player slower
                }
                else
                {
                    fillErasedMap();
                    drawL6Full();
                    p.col = 15;
                    p.row = 10;
                    lPMap[level][12][12] = 0;
                    ctx.clearRect((p.col - 0.25) *32, (p.row - 0.25)*32, 32, 48);
                    drawMap();
                    ctx.drawImage(scientist, (p.srcX % 4) * 32, p.srcY * 48, 32, 48, p.col*32, p.row*32, 32, 48);
                    walkedUpAlready = true;
                    addEventListener("keydown", onKeyDown, false);
                    alreadyDoinIt = true;
                }
            }

        }

    if (p.col === 10 && p.row === 0)//If in front of sewer pipe
    {
        waterRunning.volume = 0.5;
    }
    else
    {
        waterRunning.volume = 0.1;
    }
    if (j === door3 && p.row !== 7)
    {
        ctx.drawImage(doorBare, 21*32, 7*32);

    }
    if (j === door3 && p.row !== 7)
    {
        ctx.drawImage(doorBare, 21*32, 7*32);

    }
}

function drawOMap()//Object Map
{
    let destX = 0, destY = 0;       //Used to decide which area of map to draw

    //Sets position on tile sheet to
    // pick from when drawing player
    p.srcX = p.width * (p.frameX % 4);
    p.srcY = p.height * p.frameY;

    for (let row = 0; row < lOMap[level].length; row++)         //Run through rows
    {
        for (let col = 0; col < lOMap[level][0].length; col++)      // and columns, checking each element for the player
        {
            switch (lOMap[level][row][col])
            {
                case 1:
                    if (l2)
                    {
                        if (!sewersDrained)
                        {
                            ctx.drawImage(torchSwamp, 0, 0, 32, 32, destX, destY, 32, 32);
                        }
                        else
                        {
                            ctx.drawImage(torch, 0, 0, 32, 32, destX, destY, 32, 32);
                        }
                    }
                    break;
                case 2:
                    break;
                case 3:
                    break;

            }
            destX += 32;         //Increment column by 1 (8 is column width in ratio to the canvas width)
        }
        destX = 0;              //Start over at beginning position of array as we are at a new row
        destY += 32;             //Increment row by 1 (8 is rows height in ratio to the canvas height)
    }

    if (l2)
    {
        let flame = (Math.floor(Math.random()*3)+1);
        console.log(flame);
        for (let t = 0; t < 8; t++)
        {
            if (torchLit[t] === true)
            {
                /*ctx.drawImage(flame, 0, 0, 0, 0, 0, 0, 0, 0);*/
            }
        }
    }
}

function drawMap(dontDrawP)//Leave the "don't draw player" argument in (Filling it is not neccessary) it allows
                            // for you to draw the map without it calling the draw player map function if given a value
{
    let destX = 0, destY = 0;       //Used to decide which area of map to draw

    for (let row = 0; row < lMap[level].length; row++)         //Run through rows
    {
        for (let col = 0; col < lMap[level][0].length; col++)      // and columns, checking each elements contents
        {
            thingToDraw = undefined;       //Reset the thing that will be drawn to nothing
            
            
            switch (lMap[level][row][col])                //set the thing that will be drawn based on level settings
            {
                case 0:                   //letters (a through n) are reassigned to an image upon loading each level
                                            // in order to correspond with this drawing scheme
                    thingToDraw = a;            // set the thing that will be drawn as an image based on level
                    break;
                case 1:
                    thingToDraw = b;
                    break;
                case 2:
                    thingToDraw = c;
                    break;
                case 3:
                    floorSpriteX = 32;
                    thingToDraw = d;
                    break;
                case 4:
                    floorSpriteX = 64;
                    thingToDraw = e;
                    break;
                case 5:
                    floorSpriteX = 96;
                    thingToDraw = f;
                    break;
                case 6:
                    thingToDraw = g;
                    break;
                case 7:
                    if (l2 && !sewersDrained)               //If on level 2 and the sewer is not drained (filled)
                        thingToDraw = wetPipe;                  //draw pipe spewing liquid
                    else                                    //Otherwise
                        thingToDraw = h;                        //draw pipe not spewing liquid
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
                case 14:
                    thingToDraw = o;
                    break;
                case 15:
                    thingToDraw = q;
                    break;
                case 16:
                    thingToDraw = r;
                    break;
                case 17:
                    thingToDraw = s;
                    break;
                case 18:
                    thingToDraw = t;
                    break;
                case 19:
                    thingToDraw = u;
                    break;
                case 20:
                    thingToDraw = v;
                    break;
                case 21:
                    thingToDraw = w;
                    break;
                case 22:
                    thingToDraw = x;
                    break;
                case 23:
                    thingToDraw = y;
                    break;
                case 24:
                    thingToDraw = z;
                    break;
                case 25:
                    thingToDraw = aa;
                    break;
                case 26:
                    thingToDraw = bb;
                    break;
                case 27:
                    thingToDraw = cc;
                    break;
                case 28:
                    thingToDraw = dd;
                    break;
                case 29:
                    thingToDraw = ee;
                    break;
                case 30:
                    thingToDraw = ff;
                    break;
                case 31:
                    thingToDraw = gg;
                    break;
                case 32:
                    thingToDraw = hh;
                    break;
                case 33:
                    thingToDraw = ii;
                    break;
                case 34:
                    thingToDraw = jj;
                    break;
                case 35:
                    thingToDraw = kk;
                    break;
                case 36:
                    thingToDraw = ll;
                    break;
                case 37:
                    thingToDraw = mm;
                    break;
                case 38:
                    thingToDraw = nn;
                    break;
                case 39:
                    thingToDraw = oo;
                    break;
                case 40:
                    thingToDraw = qq;
                    break;
                case 41:
                    thingToDraw = rr;
                    break;
                case 42:
                    thingToDraw = ss;
                    break;
                case 43:
                    thingToDraw = tt;
                    break;
                case 44:
                    thingToDraw = uu;
                    break;
                case 45:
                    thingToDraw = vv;
                    break;
                case 46:
                    thingToDraw = ww;
                    break;
                case 47:
                    thingToDraw = xx;
                    break;
                case 48:
                    thingToDraw = yy;
                    break;
                case 49:
                    thingToDraw = zz;
                    break;
                case 50:
                    thingToDraw = aaa;
                    break;
                case 51:
                    thingToDraw = bbb;
                    break;
                case 52:
                    thingToDraw = ccc;
                    break;
                case 53:
                    thingToDraw = ddd;
                    break;
                case 54:
                    thingToDraw = eee;
                    break;
                case 55:
                    thingToDraw = fff;
                    break;
                case 56:
                    thingToDraw = ggg;
                    break;
                case 57:
                    thingToDraw = hhh;
                    break;
                case 58:
                    thingToDraw = iii;
                    break;
                case 59:
                    thingToDraw = jjj;
                    break;
                case 60:
                    thingToDraw = kkk;
                    break;
                case 61:
                    thingToDraw = lll;
                    break;
                case 62:
                    thingToDraw = mmm;
                    break;
                case 63:
                    thingToDraw = nnn;
                    break;
                case 64:
                    thingToDraw = ooo;
                    break;
                case 65:
                    thingToDraw = qqq;
                    break;
                case 66:
                    thingToDraw = rrr;
                    break;
                case 67:
                    thingToDraw = sss;
                    break;
                case 68:
                    thingToDraw = ttt;
                    break;
                case 69:
                    thingToDraw = uuu;
                    break;
                case 70:
                    thingToDraw = vvv;
                    break;
                case 71:
                    thingToDraw = www;
                    break;
                case 72:
                    thingToDraw = xxx;
                    break;
                case 73:
                    thingToDraw = yyy;
                    break;
                case 74:
                    thingToDraw = zzz;
                    break;
            }

            if (thingToDraw !== undefined) //If this space has something to draw in it
            {
                if (thingToDraw === sewerFloor  && (l2 || l11)) // and that thing is flooring
                    ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (col * 32), (row * 32), 32, 32);// then draw it
                                                                                                    // based on sprite
                                                                                                    // sheet positions
                                                                                                    // defined earlier
                else                              //If its anything else
                    ctx.drawImage(thingToDraw, (col * 32), (row * 32)); //Draw whatever it is
            }
            destX += 32;            //increment variable based on width ratio of map array elements to canvas width
        }
        destX = 0;              //start from the beginning of array since we are on a new row
        destY += 32;            //increment variable based on height ratio of map array elements to canvas height
    }

    if (l2)//If on level 2
    {
        if (!sewersDrained) // and the sewer is turned on
        {//Draw a simulated sewer water color
            ctx.fillStyle = "rgba(47, 141, 91, 0.41)";    //Draw a green haze over portion of canvas to simulate sewer water
            ctx.fillRect(0, 24, 320, 330);//Left
            ctx.fillRect(320, 32, 32, 322);//Middle
            ctx.fillRect(352, 24, 32, 330);//After Pipe
            ctx.fillRect(384, 24, 16, 360);//AboveSteps
            ctx.fillRect(400, 24, 16, 800);//Right of Steps
            ctx.fillRect(384, 416, 16, 800);//Below Steps
            ctx.fillRect(416, 24, 160, 800);//Right
            ctx.fillRect(576, 252, 224, 376);//RightBottom


            ctx.fillRect(384, 384, 5, 1);       //These two statements draw 3 pixels in total
            ctx.fillRect(389, 384, 5, 2);       //      for the steps  (I'm !insane)
            ctx.fillRect(394, 384, 5, 32);      //Bottom step submerged

            ctx.fillStyle = "rgba(98, 79, 18, 0.51)";     //Draw a brown haze over portion of canvas to simulate sewer water
            ctx.fillRect(0, 24, 320, 330);//Left
            ctx.fillRect(320, 32, 32, 322);//Middle
            ctx.fillRect(352, 24, 32, 330);//After Pipe
            ctx.fillRect(384, 24, 16, 360);//AboveSteps
            ctx.fillRect(400, 24, 16, 800);//Right of Steps
            ctx.fillRect(384, 416, 16, 800);//Below Steps
            ctx.fillRect(416, 24, 160, 800);//Right
            ctx.fillRect(576, 252, 224, 376);//RightBottom


            ctx.fillRect(384, 384, 5, 1);       //These two statements draw 3 pixels in total
            ctx.fillRect(389, 384, 5, 2);       //      for the steps  (I'm !insane)
            ctx.fillRect(394, 384, 5, 32);      //Bottom step submerged

            waterRunning.play();                            //Play the water running mp3 file to simulate running water
        }
        if (!lightsOn)      // and lights are on
        {   //Draw a solid black block over entire canvas
            // (fillErasedMap function will allow for small area around player to be 'lit' still)
            ctx.fillStyle = "rgba(0, 0, 0, 1)";
            ctx.fillRect(0, 0, 800, 600);
        }
    }

    drawL6Full();
    if (lOMap[level] !== undefined)
        drawOMap();
    if (dontDrawP === undefined)
        setTimeout(drawPMap, 10);
}

function checkLevelSwitch(e /* pass e.keyCode through this argument */)
{
    //    37 - left , 38 - up , 39 - right , 40 - down
    if (l1)//If it's Lvl 1
    {

    }

    if (l2)//If it's Lvl 2
    {
        if (e === 38 && p.col === 0 && p.row === 0) //If going UP & character is right under door 1
        {
            removeEventListener("keydown", onKeyDown, false);
            ctx.clearRect(0, 0, 32, 48);
            let sizer = 0;
            shrink();

            function shrink()
            {
                if (sizer < 2)//If is not small enough to fit through the door..
                {
                    ctx.clearRect(0, 0, 32, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, 0, 144, 32, 48, sizer*4, sizer*6, 28-(4*sizer), 42-(6*sizer));
                    sizer++;
                    setTimeout(shrink, 120);
                }       //Shrink
                else        //Otherwise, go through door and load level 1
                {
                    level = 1;
                    l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;
                    l1 = true;
                    ctx.clearRect(0,0,800,600);
                    p.frameY = 0;
                    startGame();
                    setTimeout(drawMap, 40);
                }
            }
        }   //Go through the door to level 1

        if (e === 38 && p.col === 24 && p.row === 0) //If going UP & character is right under door 2
        {
            p.frameY = 3; //Change player tile sheet frame being drawn so that character is facing stairs if not already


            let stairs = new Image();   //Define stairs so they can be re-drawn each 'step' taken
            stairs.src = "../../2Sewer/images/stairs.png";  //Set stairs src property


            stairs.onload = function()//When the stairs image loads
            {
                removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot
                                                                  // cannot be changed while animating stair climbing
                let staysClimbed = 0;                               //Define variable to use to count stairs climbed

                goUpDaStays();                                      //Start climbing stairs

                function goUpDaStays()                  //Climbing stairs animation function
                {
                    staysClimbed ++;                //Count each step taken

                    ctx.clearRect(96*8, 0, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared

                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, 0, 144 + (10 * staysClimbed), 32, 38 - (10 * staysClimbed),96*8, 0, 32, 38 - (10 * staysClimbed));


                    if (staysClimbed !== 4)         //If player has not climbed all stairs
                        setTimeout(goUpDaStays, 120);     //Keep climbing them - Call the stair climbing function again
                    else                            //Otherwise
                    {
                        level = 3;                              //Change level identifier appropriately
                        l1 = l2 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
                        l3 = true;                              //Set the one that is being travelled to to true

                        ctx.clearRect(0,0,800,600);             //Clear entire canvas
                        p.frameY = 2;                           //Change tile sheet frame to match direction being faced

                        startGame();                            //Load new levels assets and settings
                    }
                }
            };
        }  //Go through the door to level 3

        if (e === 38 && p.col === 10 && p.row === 0) //If going UP & character is under pipe
        {
            if (sewersDrained)//Go through the door to level 1
            {

                removeEventListener("keydown", onKeyDown, false);
                ctx.clearRect(320, 0, 32, 48);
                let sizer = 0;
                getInTheTube();

                function getInTheTube()
                {
                    if (sizer < 10)//If is not small enough to fit through the tube..
                    {
                        ctx.clearRect(320, 0, 32, 48);
                        fillErasedMap();
                        ctx.drawImage(scientist, (p.srcX % 4)*32, 144, 32, 48, 320 + sizer, 5 + sizer, 32 - 2 * sizer, 48 - 4 * sizer);
                        sizer++;
                        setTimeout(getInTheTube, 120);
                    }       //Shrink
                    else        //Otherwise, go through door and load level 1
                    {
                        level = 11;
                        l1 = l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = false;
                        l11 = true;
                        p.frameY = 3;
                        ctx.clearRect(0,0,800,600);
                        l11Ready = false;
                        startGame(0);
                        changePStartPos();
                        removeEventListener("keydown", onKeyDown, false);
                        waitForLoad();

                        function waitForLoad()
                        {
                            if (!l11Ready)
                            {
                                ctx.fillStyle = '#ffffff';
                                ctx.font="20px Arial";
                                ctx.fillText("Loading...", 350, 290);
                                setTimeout(waitForLoad, 10);
                            }
                            else
                            {
                                setTimeout(emerge, 120);
                                drawMap();
                            }
                        }


                    }

                    function emerge()
                    {
                        p.frameX++;
                        p.srcX = p.width * (p.frameX%4);
                        p.srcY = p.height * p.frameY;

                        if (sizer > 5)
                        {
                            fillErasedMap();
                            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48 - (2 * sizer), 389, 542 + (2 * sizer), 20, 33 - (2 * sizer));
                            sizer--;
                            setTimeout(emerge, 80);
                        }
                        else if (sizer > 0)//If is not small enough to fit through the tube..
                        {
                            fillErasedMap();
                            sizer--;
                            ctx.drawImage(scientist, (p.srcX % 4) * 32, p.srcY, 32, 48, 384 + sizer, 512 + (8 * sizer), 32 - 2 * sizer, 48 - 4 * sizer);
                            setTimeout(emerge, 60);
                        }       //Shrink
                        else
                        {
                            addEventListener("keydown", onKeyDown, false);
                        }
                    }
                }

            }
            else
            {
                dialog = true;
            }
        }



        if (e === 37 && !lightsOn && p.row === 11 && p.col === 9) //Not level switch condition
        {   //To check if character is in area where he isn't supposed to be when the light is off
            dialog = true;
        }
    }

    if (l3)//If it's Lvl 3
    {
        if (e === 37 && p.col === 1 && (p.row === 16))//If going LEFT at the staircase
        {//go back to sewer (from store)
            removeEventListener("keydown", onKeyDown, false);       //Turn controls off so columns and rows don't mess up

            startX[2] = 24;                     //Set location for character to appear on map that is being travelled to
            startY[2] = 0;                      //Set location for character to appear on map that is being travelled to

            let allTheStays = 0;                //Create variable to be used for counting stairs

            setTimeout(goDownStays, 120);       //Start animation of going down stairs

            function goDownStays()              //Animates player going down stairs and appearing in previous levels map
            {
                allTheStays++;                  //Increment stairs descended each time a stair is descended
                clearLevel3();
                ctx.clearRect(p.col * 32, p.row * 32, p.width, p.height);//Clear portion of canvas the player was last on
                fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                ctx.drawImage(scientist, (p.srcX + allTheStays)% 4 * 32, 48, 32, 48, p.col* (20 - 6*allTheStays) , p.row*32 + (allTheStays * 12), 32- (allTheStays * 5), 48 - (allTheStays * 10));

                if (allTheStays !== 4)            //If there are stairs to go down
                    setTimeout(goDownStays, 180); //...Go down them
                else                              //Otherwise, load level 2.
                {
                    level = 2;                              //Change level identifier to appropriate level
                    changePStartPos();
                    l1 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;         //Set all levels false aside from new level
                    l2 = true;                              //Set new level to true
                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 0;                           //Change the frame of the players tilesheet to the direction
                                                            // the player will be facing
                    l2Ready = false;
                    startGame();                            //Load assets and settings of the level being travelled to

                    waitTillReady();
                    function waitTillReady()
                    {
                        if (!l2Ready)
                            setTimeout(waitTillReady, 10);
                        else
                        {
                            setTimeout(drawMap, 40);                //Draw its map
                            clearLevel3();
                        }
                    }
                }
            }
        }

        if (e === 38 && p.row === 0 && (p.col === 10 || p.col === 11)) //If going UP & character is right under door 2
        {
            p.frameY = 3; //Change player tile sheet frame being drawn so that character is facing stairs if not already

            setTimeout(goToStreet, 40);

            function goToStreet()//When the stairs image loads
            {
                removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot
                clearLevel3();
                clearInterval(timer_level3);
                /*bgm_level3.pause();
                dangerous.pause();*/
                // cannot be changed while animating stair climbing
                let staysClimbed = 0;                               //Define variable to use to count stairs climbed

                walkToStreet();                                      //Start climbing stairs

                function walkToStreet()                  //Climbing stairs animation function
                {
                    p.frameX ++;
                    p.srcX = p.width * (p.frameX%4);
                    p.srcY = p.height * p.frameY;
                    //Count each step taken
                    staysClimbed++;

                    ctx.clearRect(320, 0, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared

                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY + (5 * staysClimbed), 32, 48 - (5 * staysClimbed), p.col * 32, p.row * 32 - (5 * staysClimbed), 32, 48 - (5 * staysClimbed));

                    if (staysClimbed !== 5)         //If player has not climbed all stairs
                        setTimeout(walkToStreet , 120);     //Keep climbing them - Call the stair climbing function again
                    else                            //Otherwise
                    {
                        level = 4;                              //Change level identifier appropriately
                        l1 = l2 = l3 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;        //Set all levels not being travelled to as false
                        l4 = true;                              //Set the one that is being travelled to to true

                        ctx.clearRect(0,0,800,600);             //Clear entire canvas
                        p.frameY = 2;                           //Change tile sheet frame to match direction being faced
                        l4Ready = false;
                        startGame();                            //Load new levels assets and settings
                        waitForEverythingToLoad();

                        function waitForEverythingToLoad()
                        {
                            if (!l4Ready)
                                setTimeout(waitForEverythingToLoad, 10);
                            else
                            {
                                drawMap();
                                clearLevel3();
                            }
                        }

                    }
                }
            }
        }  //Go through the door to level 3
    }

    if (l4)//If it's Lvl 4
    {

    }

    if (l5)//If it's Lvl 5
    {

    }

    if (l6)//If it's Lvl 6
    {
        if (e = 38 && p.row === 6 && p.col === 0)
        {
            removeEventListener("keydown", onKeyDown, false);
            let stepsUp = 0;
            let stepsOver = 0;
            let steps = 0;

            getInTheChopper();

            function getInTheChopper()
            {
                steps = stepsOver + stepsUp;

                if (steps < 21)
                {
                    p.srcX++;

                    if (steps === 0)
                    {
                        ctx.clearRect(p.col * 32, p.row * 32, p.width, p.height);
                        fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                        drawL6();
                        ctx.drawImage(scientist, ((p.srcX % 4) * 32), p.srcY, 32, 48, p.col * 32, (p.row * 32) - (8 * (stepsUp)), 32, 48);
                        stepsUp++;
                    }
                    else if (stepsUp < 8)
                    {
                        stepsUp++;
                        ctx.clearRect(p.col * 32, (p.row * 32) - (8 * (stepsUp - 1)), p.width, p.height);//Clear portion of canvas the player was last on
                        fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                        drawL6();
                        ctx.drawImage(scientist, ((p.srcX % 4) * 32), p.srcY, 32, 48, p.col * 32, (p.row * 32) - (8 * (stepsUp)), 32, 48);
                    }
                    else
                    {
                        p.srcY = 96;
                        stepsOver++;
                        ctx.clearRect((p.col * 32) + (8 * (stepsOver - 1)), (p.row * 32) - (8 * (stepsUp)), p.width, p.height);//Clear portion of canvas the player was last on
                        fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                        drawL6();
                        ctx.drawImage(scientist, (p.srcX % 4) * 32, p.srcY, 32, 48, (p.col * 32) + (8 * stepsOver), (p.row * 32) - (8 * stepsUp), 32, 48);
                    }
                    setTimeout(getInTheChopper, walkingSpeed * 3);
                }

                else
                {
                    level = 7;                  //Change level identifier appropriately
                    l1 = l2 = l3 = l4 = l5 = l6 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
                    l7 = true;                                  //Set level being travelled to as true
                    ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
                    startGame();                                //Load settings and assets for next map
                    setTimeout(drawMap, 40);                    //Draw next map
               }
            }


        }
    }

    if (l7)//If it's Lvl 7
    {
        if (e === 40 && p.col === 24 && p.row === 16) //If going down and above staircase
        {


            p.frameY = 0; //Change player tile sheet frame being drawn so that character is facing stairs if not already

            removeEventListener("keydown", onKeyDown, false); //Turn of key input so that p.row and p.col cannot
            // cannot be changed while animating stair climbing
            let staysClimbed = 0;                               //Define variable to use to count stairs climbed

            goUpALvl();                                      //Start climbing stairs

            function goUpALvl()                  //Climbing stairs animation function
            {
                staysClimbed ++;
                p.frameX++;
                p.srcX = p.width * (p.frameX % 4);
                p.srcY = p.height * p.frameY;

                if (staysClimbed < 3)
                {
                    ctx.clearRect(768, 512, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, 768, 512 + (4 * staysClimbed), 32, 48);
                    setTimeout(goUpALvl, 80);
                }
                else if (staysClimbed !== 20)
                {
                    //Count each step taken
                    ctx.clearRect(768, 512, 32, 48);  //Clear tile player is on so new animation image can take its place
                    fillErasedMap();        //Draw the map image that was cleared
                    //Draw scientist incrementally smaller each 'step' taken
                    // and move player slightly up to portray movement
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, 768, 512 + (5 * staysClimbed), 32 + (staysClimbed - 3) * 3/2, 48);
                    setTimeout(goUpALvl, 80);
                }
                else                            //Otherwise
                {
                    level = 8;                              //Change level identifier appropriately
                    l1 = l2 = l3 = l4 = l5 = l6 = l7 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
                    l8 = true;                              //Set the one that is being travelled to to true

                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 2;                           //Change tile sheet frame to match direction being faced

                    startGame();                            //Load new levels assets and settings
                    setTimeout(drawMap, 40);                //Draw its entire map
                }
            }
        }  //Go up stairs to level 8
    }
	
	if (l8)//If it's Lvl 8
    {
        if (e === 38 && p.col === 0 && p.row === 0) //If going down and above Exit
        {

            level = 7;                              //Change level identifier appropriately
            l1 = l2 = l3 = l4 = l5 = l6 = l8 = l9 = l10 = l11 = false;         //Set all levels not being travelled to as false
            l7 = true;                              //Set the one that is being travelled to to true

            ctx.clearRect(0,0,800,600);             //Clear entire canvas
            p.frameY = 2;                           //Change tile sheet frame to match direction being faced

            startGame();                            //Load new levels assets and settings
            setTimeout(drawMap, 40);                //Draw its entire map
            
        }  //Go up stairs to level 8
    }
 
    if (l11)//Sewer map 2
    {
        if (e === 40 && p.col === 12 && p.row === 16) //If going down & character is over pipe/tube
        {
            p.frameX++;
            p.srcX = p.width * (p.frameX % 4);
            removeEventListener("keydown", onKeyDown, false);
            ctx.clearRect(384, 512, 32, 48);
            let sizer = 0;
            goBackOut();

            function goBackOut()
            {
                if (sizer < 5)//If is not small enough to fit through the tube..
                {
                    sizer++;
                    ctx.clearRect(384, 512, 96, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, (p.srcX % 4) * 32, sizer, 32, 48, 384 + sizer, 512 + (8 * sizer), 32 - 2 * sizer, 48 - 4 * sizer);
                    setTimeout(goBackOut, 60);
                }       //Shrink
                else if (sizer < 15)
                {
                    ctx.clearRect(384, 512, 32, 96);
                    fillErasedMap();
                    ctx.drawImage(scientist, p.srcX, 0, 32, 48 - (2 * sizer), 389, 542 + (2 * sizer), 20, 33 - (2 * sizer));
                    sizer++;
                    setTimeout(goBackOut, 80);
                }
                else        //Otherwise, go through door and load level 1
                {
                    level = 2;
                    l1 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;
                    l2 = true;
                    startX[level] = 10;
                    startY[level] = 0;
                    p.frameY = 0;
                    changePStartPos();
                    ctx.clearRect(0,0,800,600);
                    l2Ready=false;
                    startGame(0);
                    sizer = 10;
                    removeEventListener("keydown", onKeyDown, false);
                    waitToLoad();
                    function waitToLoad()
                    {
                        if (!l2Ready)
                        {
                            ctx.fillStyle = '#ffffff';
                            ctx.font="20px Arial";
                            ctx.fillText("Loading...", 350, 290);
                            setTimeout(waitToLoad, 10);
                        }
                        else
                        {
                            setTimeout(crawlOut, 80);
                            drawMap(0);
                        }
                    }

                }

                function crawlOut()//crawl out the other side
                {
                    if (sizer > 0)
                    {
                        ctx.drawImage(scientist, (p.srcX % 4)*32, p.frameY, 32, 48, 320 + sizer, 5 + sizer, 32 - 2 * sizer, 48 - 4 * sizer);
                        sizer--;
                        setTimeout(crawlOut, 80);
                    }
                    else
                    {
                        addEventListener("keydown", onKeyDown, false);
                    }
                }
            }
        }
    }

    function drawL6()
    {
        if (l6)
        {
            ctx.drawImage(darkWindow, 10, 427);
            ctx.drawImage(darkWindow, 60, 427);
            ctx.drawImage(darkWindow, 210, 427);
            ctx.drawImage(darkWindow, 260, 427);
            ctx.drawImage(darkWindow, 310, 427);
            ctx.drawImage(darkWindow, 460, 427);
            ctx.drawImage(litWindow, 110, 427);
            ctx.drawImage(litWindow, 160, 427);
            ctx.drawImage(litWindow, 360, 427);
            ctx.drawImage(litWindow, 410, 427);
            ctx.drawImage(litWindow, 510, 427);
            ctx.drawImage(ladder, 5, 160);
            ctx.drawImage(helipad, 5, 150);
            ctx.drawImage(helicopter, 5, 85);
            ctx.drawImage(exit, 309, 335);
            ctx.drawImage(cherryTree, 385, 490);
            ctx.drawImage(fence, 390, 545);
            ctx.drawImage(fence, 455, 545);
        }
    }

}

function onKeyDown(e)
{
    if (!l3)
        clearInterval(timer_level3);

    if (l6)
    {
        if (p.col >= 6)
            yMin[6] = 5;
        else
            yMin[6] = 6;
        if (p.row === 5)
            xMin[6] = 6;
        else
            xMin[6] = 0;
    }

    p.prevCol = p.col;      //Set column to be cleared
    p.prevRow = p.row;      //Set row to be cleared

     checkLevelSwitch(e.keyCode);//Check if conditions for switching levels have been met and switch if true
     checkBoundaries(e.keyCode);//Check if player can move in the direction they're going

    if (l2 && p.row === 6 && p.col === 22)//Draw Bare floor so that player can appear over it but under ridge
        // (Ridge is drawn after player -- end of this function)
    {
        ctx.drawImage(floorClean, 22*32, 7*32);
    }

     if (e.keyCode === 37)//Left

     {
         if (p.col > xMin[level] && notWalking && canGoThisWay)    //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 1;
             p.srcY = p.height * p.frameY;
             let walk = 0;
             let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

             walkLeft();

             function walkLeft()
             {
                 if (walk < 4)
                 {
                     notWalking = false;
                     //Increment in order to flip through the walking tiles for this direction
                     p.frameX ++;
                     walk++;
                     p.srcX = p.width * (p.frameX % 4);
                     //Fills portion of the canvas the player was just taking up
                     //a,b,c,d,e... are passed from movePlayer function call
                     ctx.clearRect((p.col * 32 - (8 * walk)), p.row * 32, 32, 48);
                     fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                     drawL6();
                     if (l2 && underWater)
                     {
                         ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 - (8 * walk)), p.row * 32, 32, 48);
                     }
                     else
                         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32 - (8 * walk)), p.row * 32, 32, 48);
                     setTimeout(walkLeft, walkingSpeed);
                 }
                 else
                 {
                     //remove player from current column
                     lPMap[level][p.row][p.col] = 0;
                     //update player column
                     p.col --;
                     //add player to updated row
                     lPMap[level][p.row][p.col] = 1;
                     walk = 0;
                     drawPMap();//Draws the new players position
                 }
             }
         }

         else if (notWalking)
         {
             p.frameY = 1;
             p.frameX ++;

             ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
             fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
             drawL6();
             p.srcX = p.width * (p.frameX % 4);
             p.srcY = p.height * (p.frameY);

             if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
         detectMovementLevel3();
     }

     if (e.keyCode === 39)//Right

     {
         if (p.col < xMax[level] && notWalking && canGoThisWay)    //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 2;
             p.srcY = p.height * p.frameY;
             let walk = 0;
             let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

             walkRight();

             function walkRight()
             {
                 if (walk < 4)
                 {
                     notWalking = false;
                     //Increment in order to flip through the walking tiles for this direction
                     p.frameX ++;
                     walk++;
                     p.srcX = p.width * (p.frameX % 4);
                     //Fills portion of the canvas the player was just taking up
                     //a,b,c,d,e... are passed from movePlayer function call
                     ctx.clearRect((p.col * 32 + (8 * walk)), p.row * 32, 32, 48);
                     fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                     drawL6();

                     if (l2 && underWater)
                     {
                         ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 + (8 * walk)), p.row * 32, 32, 48);
                     }
                     else
                         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32 + (8 * walk)), p.row * 32, 32, 48);
                     setTimeout(walkRight, walkingSpeed);
                 }
                 else
                 {
                     //remove player from current column
                     lPMap[level][p.row][p.col] = 0;
                     //update player column
                     p.col ++;
                     //add player to updated column
                     lPMap[level][p.row][p.col] = 1;
                     walk = 0;
                     drawPMap();//Draws the new players position
                 }
             }
         }
         else if (notWalking)
         {
             p.frameY = 2;
             p.frameX ++;

             ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
             fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
             drawL6();
             p.srcX = p.width * (p.frameX % 4);
             p.srcY = p.height * (p.frameY);

             if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
         detectMovementLevel3();
     }

     if (e.keyCode === 38)//Up

     {
         if (p.row > yMin[level] && notWalking && canGoThisWay)        //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 3;
             p.srcY = p.height * p.frameY;
             let walk = 0;
             let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

             animateWalking();

             function animateWalking()
             {
                 if (walk < 4)
                 {
                     notWalking = false;
                     //Increment in order to flip through the walking tiles for this direction
                     p.frameX ++;
                     walk++;
                     p.srcX = p.width * (p.frameX % 4);
                     //Fills portion of the canvas the player was just taking up
                     //a,b,c,d,e... are passed from movePlayer function call
                     ctx.clearRect(p.col * 32, ((p.row*32) - (8 * walk)), 32, 48);
                     fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                     drawL6();

                     if (l2)
                     {
                         if (p.row === 7 && p.col === 21 && j === door3)//Draw scientist under ledge
                         {
                             ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col*32, (p.row * 32 - (8 * walk)), 32, 48);
                             ctx.drawImage(doorBare, 21*32, 7*32);
                         }
                         else if (underWater)
                            ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);
                         else
                             ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);
                     }
                     else
                     {
                         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);
                     }
                     setTimeout(animateWalking, walkingSpeed);
                 }
                 else
                 {
                     //remove player from current row
                     lPMap[level][p.row][p.col] = 0;
                     //update player row
                     p.row --;
                     //add player to updated row
                     lPMap[level][p.row][p.col] = 1;
                     walk = 0;
                     drawPMap();//Draws the new players position
                 }
             }
         }
         else if (notWalking)
         {
             p.frameY = 3;
             p.frameX ++;

             ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
             fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
             drawL6();
             p.srcX = p.width * (p.frameX % 4);
             p.srcY = p.height * (p.frameY);
             if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
         detectMovementLevel3();
     }

     if (e.keyCode === 40)//Down

     {
         if (p.row < yMax[level] && notWalking && canGoThisWay)        //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 0;
             p.srcY = p.height * p.frameY;
             let walk = 0;
             let underWater = (!sewersDrained && (p.row < 11 || p.col > 11));

             walkDown();

             function walkDown()
             {
                 if (walk < 4)
                 {
                     notWalking = false;
                     //Increment in order to flip through the walking tiles for this direction
                     p.frameX ++;
                     walk++;
                     p.srcX = p.width * (p.frameX % 4);
                     //Fills portion of the canvas the player was just taking up
                     //a,b,c,d,e... are passed from movePlayer function call
                     ctx.clearRect(p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                     fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                     drawL6();
                     if (l2)
                     {
                         if (p.row === 7 && p.col === 21 && j === door3)//Draw scientist under ledge
                         {
                             ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                             ctx.drawImage(doorBare, 21 * 32, 7 * 32);
                         }
                         else if (underWater)
                             ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                         else
                             ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                     }
                     else
                     {
                         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                     }
                     setTimeout(walkDown, walkingSpeed);

                 }
                 else
                 {
                     //remove player from current row
                     lPMap[level][p.row][p.col] = 0;
                     //update player row
                     p.row ++;
                     //add player to updated row
                     lPMap[level][p.row][p.col] = 1;
                     walk = 0;
                     drawPMap();//Draws the new players position
                 }
             }
         }

         else if (notWalking)
         {
             p.frameY = 0;
             p.frameX ++;

             ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
             fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
             drawL6();
             p.srcX = p.width * (p.frameX % 4);
             p.srcY = p.height * (p.frameY);
             if (l2 && !sewersDrained && (p.row < 11 || p.col > 11))
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
         detectMovementLevel3();
     }

     if (e.keyCode === 32) //Space

     {
         checkActions();

     }

     /* TEMP - for testing - TEMP */

     if (e.keyCode === 76) //L - light

     {
         lightSwitch++;
         lightsOn = (lightSwitch % 2 === 0);
         drawMap();   //Drawing whole map because light/shade covers whole map
         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
     }

     if (e.keyCode === 83) //S - swamp

     {
         sewerSwitch++;
         sewersDrained = (sewerSwitch % 2 === 0);
         drawMap(); //Drawing whole map because swamp covers whole map
         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
     }

     if (e.keyCode === 49) //1
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 1;              //Change level identifier appropriately
         l2 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
         l1 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 50) //2
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 2;              //Change level identifier appropriately
         l1 = l3 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;            //Set all levels to false but the one being travelled to
         l2 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 51) //3
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 3;              //Change level identifier appropriately
         l1 = l2 = l4 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
         l3 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 52) //4
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 4;              //Change level identifier appropriately
         l1 = l2 = l3 = l5 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
         l4 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 53) //5
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 5;              //Change level identifier appropriately
         l1 = l2 = l3 = l4 = l6 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
         l5 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 54) //6
     {
         removeEventListener("keydown", onKeyDown, false);
         walkedUpAlready = false;
         changePStartPos();
         level = 6;                  //Change level identifier appropriately
         l1 = l2 = l3 = l4 = l5 = l7 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
         l6 = true;                                  //Set level being travelled to as true
         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         l6Ready=false;
         startGame();                                //Load settings and assets for next map
         waitForLoading();
         function waitForLoading()
         {
             if (!l6Ready)
             {
                 ctx.fillStyle = '#ffffff';
                 ctx.font="20px Arial";
                 ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForLoading, 10);
             }
             else
             {
                 drawMap();                   //Draw next map
             }
         }

     }
    if (e.keyCode === 55) //7
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 7;                  //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l5 = l6 = l8 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
        l7 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        l7Ready=false;
        startGame();                                //Load settings and assets for next map
        waitForItToLoad();

        function waitForItToLoad()
        {
            if (!l7Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForItToLoad, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }
    }
    if (e.keyCode === 56) //8
    {
    removeEventListener("keydown", onKeyDown, false);
    level = 8;                  //Change level identifier appropriately
    l1 = l2 = l3 = l4 = l5 = l6 = l7 = l9 = l10 = l11 = false;             //Set all levels to false but the one being travelled to
    l8 = true;                                  //Set level being travelled to as true
    ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
    l8Ready=false;
    startGame();                                //Load settings and assets for next map
    waitForTheLoading();

        function waitForTheLoading()
        {
            if (!l8Ready)
            {
                ctx.fillStyle = '#ffffff';
                ctx.font="20px Arial";
                ctx.fillText("Loading...", 350, 290);
                setTimeout(waitForTheLoading, 10);
            }
            else
            {
                drawMap();                   //Draw next map
            }
        }
    }


     if (sewersDrained) //If the water has been shut off
             waterRunning.pause();           //Stop playing the noise of running water

    function drawL6()
    {
        if (l6)
        {
            ctx.drawImage(darkWindow, 10, 427);
            ctx.drawImage(darkWindow, 60, 427);
            ctx.drawImage(darkWindow, 210, 427);
            ctx.drawImage(darkWindow, 260, 427);
            ctx.drawImage(darkWindow, 310, 427);
            ctx.drawImage(darkWindow, 460, 427);
            ctx.drawImage(litWindow, 110, 427);
            ctx.drawImage(litWindow, 160, 427);
            ctx.drawImage(litWindow, 360, 427);
            ctx.drawImage(litWindow, 410, 427);
            ctx.drawImage(litWindow, 510, 427);
            ctx.drawImage(ladder, 5, 160);
            ctx.drawImage(helipad, 5, 150);
            ctx.drawImage(helicopter, 5, 85);
            ctx.drawImage(exit, 309, 335);
            ctx.drawImage(cherryTree, 385, 490);
            ctx.drawImage(fence, 390, 545);
            ctx.drawImage(fence, 455, 545);
        }
    }

    if (l2 && p.row === 6 && p.col === 22)//PNG image with only ridge to draw over player
    {
        if (!sewersDrained && (p.row < 11 || p.col > 11))
        {
            ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col*32, p.row*32, 32, 48);
        }
        else
        {
            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col*32, p.row*32, 32, 48);
        }
    }


    if (dialog)
        setTimeout(checkIfMoved, walkingSpeed * 10);
}

function checkBoundaries(e)
{
    if (e === 37 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)//Left
    {
           if (l1 || l4 || l5 || l7 || l8)
               canGoThisWay = (lMap[level][p.row + 1][p.col - 1] === floorNumbers[level]);
           else if (l2)
            {
                if (!lightsOn && p.row === 11 && p.col === 9)
                {
                    canGoThisWay = false;
                }
                else
                {
                    canGoThisWay =
                    (
                        lMap[level][p.row + 1][p.col - 1] === 3 ||
                        lMap[level][p.row + 1][p.col - 1] === 4 ||
                        lMap[level][p.row + 1][p.col - 1] === 5 ||
                        lMap[level][p.row + 1][p.col - 1] === 29 ||
                        lMap[level][p.row + 1][p.col - 1] === 30 ||
                        (
                            lMap[level][p.row + 1][p.col - 1] === 15 ||
                            lMap[level][p.row + 1][p.col - 1] === 9
                            &&
                            doorThreeOpen
                        )

                    );
                }

            }
           else if (l11)
           {
               canGoThisWay =
                   (
                       lMap[level][p.row + 1][p.col - 1] === 3 ||
                       lMap[level][p.row + 1][p.col - 1] === 4 ||
                       lMap[level][p.row + 1][p.col - 1] === 0
                   );
           }
           else if (l6)
           {
               canGoThisWay =
                   (
                       lMap[level][p.row + 1][p.col - 1] === 0 ||
                       lMap[level][p.row + 1][p.col - 1] === 4
                   );
           }
           else if (l3)
           {
               canGoThisWay =
                   (
                       lMap[level][p.row + 1][p.col - 1] === 16 ||
                       lMap[level][p.row + 1][p.col - 1] === 17 ||
                       lMap[level][p.row + 1][p.col - 1] === 0
                   );
           }
    }
    if (e === 39 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col + 1] !== undefined)//Right
    {
        if (l1 || l4 || l5 || l7 || l8)
            canGoThisWay = (lMap[level][p.row + 1][p.col + 1] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 3 ||
                    lMap[level][p.row + 1][p.col + 1] === 4 ||
                    lMap[level][p.row + 1][p.col + 1] === 5 ||
                    lMap[level][p.row + 1][p.col + 1] === 29 ||
                    lMap[level][p.row + 1][p.col + 1] === 30 ||
                    (
                        lMap[level][p.row + 1][p.col + 1] === 15 ||
                        lMap[level][p.row + 1][p.col + 1] === 9
                        &&
                        doorThreeOpen
                    )
                );
        }
        else if (l11)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 3 ||
                    lMap[level][p.row + 1][p.col + 1] === 4 ||
                    lMap[level][p.row + 1][p.col + 1] === 0
                );
        }
        else if (l6)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 0 ||
                    lMap[level][p.row + 1][p.col + 1] === 4
                );
        }
        else if (l3)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 16 ||
                    lMap[level][p.row + 1][p.col + 1] === 17 ||
                    lMap[level][p.row + 1][p.col + 1] === 0
                );
        }
    }
    if (e === 38 && lMap[level][p.row] !== undefined && lMap[level][p.row][p.col] !== undefined)//Up
    {
        if (l1 || l4 || l5 || l7 || l8)
            canGoThisWay = (lMap[level][p.row][p.col] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 3 ||
                    lMap[level][p.row][p.col] === 4 ||
                    lMap[level][p.row][p.col] === 5 ||
                    lMap[level][p.row][p.col] === 29 ||
                    lMap[level][p.row][p.col] === 30 ||
                    (
                        lMap[level][p.row][p.col] === 15 ||
                        lMap[level][p.row][p.col] === 9
                        &&
                        doorThreeOpen
                    )
                );
        }
        else if (l11)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 3 ||
                    lMap[level][p.row][p.col] === 4 ||
                    lMap[level][p.row][p.col] === 0
                );
        }
        else if (l6)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 0 ||
                    lMap[level][p.row][p.col] === 4
                );
        }
        else if (l3)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 16 ||
                    lMap[level][p.row][p.col] === 17 ||
                    lMap[level][p.row][p.col] === 0
                );
        }
    }
    if (e === 40 && lMap[level][p.row + 2] !== undefined && lMap[level][p.row + 2][p.col] !== undefined)//Down
    {
        if (l1 || l4 || l5 || l7 || l8)
            canGoThisWay = (lMap[level][p.row + 2][p.col] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 3 ||
                    lMap[level][p.row + 2][p.col] === 4 ||
                    lMap[level][p.row + 2][p.col] === 5 ||
                    lMap[level][p.row + 2][p.col] === 29 ||
                    lMap[level][p.row + 2][p.col] === 30 ||
                    (
                        lMap[level][p.row + 2][p.col]  === 15 ||
                        lMap[level][p.row + 2][p.col] === 9
                        &&
                        doorThreeOpen
                    )
                );
        }
        else if (l11)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 3 ||
                    lMap[level][p.row + 2][p.col] === 4 ||
                    lMap[level][p.row + 2][p.col] === 0
                );
        }
        else if (l6)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 0 ||
                    lMap[level][p.row + 2][p.col] === 4
                );
        }
        else if (l3)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 16 ||
                    lMap[level][p.row + 2][p.col] === 17 ||
                    lMap[level][p.row + 2][p.col] === 0
                );
        }
    }
}

function drawL6Full()
{
    if (l6)
    {

        ctx.drawImage(ladder, 5, 160);
        ctx.drawImage(helipad, 5, 150);
        ctx.drawImage(helicopter, 5, 85);


        ctx.drawImage(darkWindow, 10, 427);
        ctx.drawImage(darkWindow, 60, 500);
        ctx.drawImage(darkWindow, 60, 427);
        ctx.drawImage(darkWindow, 160, 500);
        ctx.drawImage(darkWindow, 210, 427);
        ctx.drawImage(darkWindow, 210, 500);
        ctx.drawImage(darkWindow, 260, 427);
        ctx.drawImage(darkWindow, 260, 500);
        ctx.drawImage(darkWindow, 310, 427);
        ctx.drawImage(darkWindow, 360, 500);

        ctx.drawImage(darkWindow, 410, 500);
        ctx.drawImage(darkWindow, 460, 427);
        ctx.drawImage(darkWindow, 510, 500);
        ctx.drawImage(litWindow, 10, 500);
        ctx.drawImage(litWindow, 110, 427);
        ctx.drawImage(litWindow, 110, 500);
        ctx.drawImage(litWindow, 160, 427);
        ctx.drawImage(litWindow, 310, 500);
        ctx.drawImage(litWindow, 360, 427);
        ctx.drawImage(litWindow, 410, 427);
        ctx.drawImage(litWindow, 460, 500);
        ctx.drawImage(litWindow, 510, 427);


        ctx.drawImage(car, 500, 555);


        for (let x = 20; x < 400; x += 40)
        {
            ctx.drawImage(shrub, x, 545);
        }


        ctx.drawImage(exit, 309, 335);
        ctx.drawImage(cherryTree, 385, 490);


        for (let x = 0; x < 715; x += 65)
        {
            ctx.drawImage(fence, x, 545);
        }


        ctx.drawImage(gate, 700, 520);
        ctx.drawImage(statue, 710, 560);
        ctx.drawImage(statue, 790, 560);

    }
}

function checkActions()
{
    if (l2)
    {
        if (p.row === 7 && p.col === 21 && p.frameY === 3)  //Open Locked Door
        {
            doorThreeOpen = true;
            j = door3;
            lMap[level][7][22] = 14;
            lMap[level][6][22] = 15;
            drawMap(0);
            doorSound.play();
            ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);

        }

        //For torches
        if (p.frameY === 3)//Looking up                                                                     Needs to be finished
        {
            checkForTorches();
        }
        if (p.frameY === 2)//Looking Right
        {

        }
        if (p.frameY === 1)//Looking Left
        {

        }
        if (p.frameY === 0)//Looking Down
        {

        }
        function checkForTorches()
        {

        }

        if (p.row === 15 && p.col === 1 && p.frameY === 3)
        {
            let leverDown = new Image();
            leverDown.src = "../../2Sewer/images/leverDown.png";
            cc = leverDown;


            leverDown.onload = function()           //Draw the sewer drained
            {
                sewersDrained = true;
                waterRunning.pause();
                ctx.clearRect(0,0,800,600);
                drawMap(0);
                ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
            };

        }
    }

    if (l3)
    {

        if (leftDoorOpen === false && p.row === 7 && p.col === 4)
        {
            doorSound.play();
            leftDoorOpen = true;
            lMap[level][7][4] = 0;
            lMap[level][6][5] = 16;
        }
        if (findPasscode === false && p.row ===2 && p.col ===1)
        {
            findPasscode = true;
            alert("you found the passcode(temp msg)");
        }
        if (rightDoorOpen === false && findPasscode && p.row === 7 && p.col === 20)
        {
            doorSound.play();
            rightDoorOpen = true;
            lMap[level][7][20] = 0;
            lMap[level][6][19] = 17;
        }
        if (findMap === false && p.row === 15 && p.col === 5)
        {
            findMap = true;
            alert("you found the map(temp msg)");
        }
        if (findRollerblades === false && p.row === 5 && p.col === 20)
        {
            findRollerblades = true;
            alert("you found the rollerblades(temp msg)");
        }
        if (findDisguise === false && p.row === 13 && p.col === 23)
        {
            findDisguise = true;
            alert("you found the disguise(temp msg)");
        }
        if (findDisguise && findRollerblades && findMap && ((p.row === 0 && p.col === 10) || (p.row === 0 && p.col === 11)))
        {
            alert("you go to street(temp msg)");
        }
    }

    if (l7 && p.row === 1 && p.col === 14)
    {
		if (windowClosed == false)
		{
			let closedWindow = new Image();
			closedWindow.src = "../../7Lab/images/closedWindow.png";
			r = closedWindow;
			windowClosed = true
			drawMap();
		}
		else
		{
			// Speach bubble saying "The windows are closed" "I can now look for the research paper"
		}
    }
	
	if (l7 && p.row == 2 && p.col == 12)
	{
		if (lighterFluid == false)
		{
			let emptyShelvesTop = new Image();
			let emptyShelvesBottom = new Image();
			emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png"
			emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png"
			s = emptyShelvesTop;
			t = emptyShelvesBottom;
			lighterFluid = true;
			drawMap();
			
			dialog = true;
		}
	}
	
	if (l8 && p.row === 1 && p.col === 20)
	{
		if (researchPaper == false)
		{
			let emptyShelvesTop = new Image();
			let emptyShelvesBottom = new Image();
			emptyShelvesTop.src = "../../7Lab/images/emptyShelves-top.png"
			emptyShelvesBottom.src = "../../7Lab/images/emptyShelves-bottom.png"
			i = emptyShelvesTop;
			j = emptyShelvesBottom;
			researchPaper = true
			drawMap();
		}
		else if (lighterFluid == false)
		{
			// Thought bubble saying "I need to find my lighter fluid"
		}
	}
	
	if (l7 && p.row == 16 && p.col == 1 || l7 && p.row == 15 && p.col == 0)
	{
		if (lighterFluid == true && researchPaper == true)
		{
			// thought bubble saying "It's done"
			
			researchBurned == true;
		}
		else if (lighterFluid == false && researchPaper == true)
		{
			// thought bubble saying "I need my lighterFluid"
		}
	}

}

function displayTextBubble()
{
    if (l2) //If going UP & character is under pipe but the sewer is running
    {
        if (dialog && !lightsOn && p.row === 11 && p.col === 9)//Shiver
        {
            let shivers = 0;
            removeEventListener("keydown", onKeyDown, false);
            dialogX = 9;
            dialogY = 11;
            ctx.font="10px Arial Bold";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("Ahh! ..better light", (p.col + 2) * 32 + 10, (p.row + 3) * 32 - 4);
            ctx.fillText("this place up first.", (p.col + 2) * 32 + 10, (p.row + 3) * 32 + 7);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
            if (!alreadyShivering)
            {
                shiver();
                ratOfDeath.play();
            }

            function shiver()
            {
                shivers++;
                alreadyShivering = true;
                if (shivers !== 22)
                {
                    setTimeout(shiverLeft, 15);
                }
                else
                {
                    dialog = false;
                    alreadyShivering = false;
                    addEventListener("keydown", onKeyDown, false);

                }
                function shiverLeft()
                {
                    ctx.clearRect(p.col*32, p.row*32, 32, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32) - 1, (p.row * 32) + 0.25, 32, 48);
                    setTimeout(shiverRight, 15);
                }
                function shiverRight()
                {
                    ctx.clearRect(p.col*32, p.row*32, 32, 48);
                    fillErasedMap();
                    ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, (p.col * 32) + 1, (p.row * 32) - 0.25, 32, 48);
                    setTimeout(shiver, 10);
                }

            }
        }

        if (dialog && p.col === 10 && p.row === 0)//No go in pipe yet
        {
            dialogX = 10;
            dialogY = 0;
            ctx.font="10px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("The water is too powerful..", (p.col + 2) * 32 - 10, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
        }

    }
	
	if (l7)
	{
		if (dialog && p.row === 2 && p.col === 12)
		{
            dialogX = 12;
            dialogY = 2;
            ctx.font="10px Arial";
            ctx.drawImage(thotBr, (p.col + 1) * 32, (p.row + 1) * 32);
            ctx.fillStyle = "rgba(0, 0, 0)";
            ctx.fillText("The water is too powerful..", (p.col + 2) * 32 - 10, (p.row + 3) * 32 - 5);

            if (!alreadySetTimeout)
            {
                setTimeout(turnOffDialog, 2000);//Disappear it after 2 seconds
                alreadySetTimeout = true;
            }
		}
	}



/*                                      //This is where you put your levels thought bubble conditions
                                        //There are 4 thought bubble images (1 for each side of the player...
                                        //     top left, bottom left, top right, bottom right
    if (l3 && dialog &&....)
    if (l4 && dialog &&....)
    if (l5 && dialog &&....)
    if (l6 && dialog &&....)
    ...
*/



    function turnOffDialog()    //If dialog msg times out -- disappear it and redraw stuff
    {
        let destX = 0, destY = 0;       //define spacing for drawing empty map
        let xPos = 0, yPos = 0;

        ctx.clearRect((dialogX + 1) * 32, (dialogY + 1) * 32, 160, 96);     //clear portion of map taken up by bubble
        for (let row = (dialogY + 1); row < ((dialogY + 1) + 3); row++)     //Draw the map that was cleared
        {
            for (let col = (dialogX + 1); col < ((dialogX + 1) + 5); col++)
            {
                switch (lMap[level][row][col])                //set the thing that will be drawn based on level settings
                {
                    case 0:                   //letters (a through n) are reassigned to an image upon loading each level
                        // in order to correspond with this drawing scheme
                        thingToDraw = a;            // set the thing that will be drawn as an image based on level
                        break;
                    case 1:
                        thingToDraw = b;
                        break;
                    case 2:
                        thingToDraw = c;
                        break;
                    case 3:
                        floorSpriteX = 32;
                        thingToDraw = d;
                        break;
                    case 4:
                        floorSpriteX = 64;
                        thingToDraw = e;
                        break;
                    case 5:
                        floorSpriteX = 96;
                        thingToDraw = f;
                        break;
                    case 6:
                        thingToDraw = g;
                        break;
                    case 7:
                        if (l2 && !sewersDrained)               //If on level 2 and the sewer is not drained (filled)
                            thingToDraw = wetPipe;                  //draw pipe spewing liquid
                        else                                    //Otherwise
                            thingToDraw = h;                        //draw pipe not spewing liquid
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
                    case 14:
                        thingToDraw = o;
                        break;
                    case 15:
                        thingToDraw = q;
                        break;
                    case 16:
                        thingToDraw = r;
                        break;
                    case 17:
                        thingToDraw = s;
                        break;
                    case 18:
                        thingToDraw = t;
                        break;
                    case 19:
                        thingToDraw = u;
                        break;
                    case 20:
                        thingToDraw = v;
                        break;
                    case 21:
                        thingToDraw = w;
                        break;
                    case 22:
                        thingToDraw = x;
                        break;
                    case 23:
                        thingToDraw = y;
                        break;
                    case 24:
                        thingToDraw = z;
                        break;
                    case 25:
                        thingToDraw = aa;
                        break;
                    case 26:
                        thingToDraw = bb;
                        break;
                    case 27:
                        thingToDraw = cc;
                        break;
                    case 28:
                        thingToDraw = dd;
                        break;
                    case 29:
                        thingToDraw = ee;
                        break;
                    case 30:
                        thingToDraw = ff;
                        break;
                    case 31:
                        thingToDraw = gg;
                        break;
                    case 32:
                        thingToDraw = hh;
                        break;
                    case 33:
                        thingToDraw = ii;
                        break;
                    case 34:
                        thingToDraw = jj;
                        break;
                    case 35:
                        thingToDraw = kk;
                        break;
                    case 36:
                        thingToDraw = ll;
                        break;
                    case 37:
                        thingToDraw = mm;
                        break;
                    case 38:
                        thingToDraw = nn;
                        break;
                    case 39:
                        thingToDraw = oo;
                        break;
                    case 40:
                        thingToDraw = qq;
                        break;
                    case 41:
                        thingToDraw = rr;
                        break;
                    case 42:
                        thingToDraw = ss;
                        break;
                    case 43:
                        thingToDraw = tt;
                        break;
                    case 44:
                        thingToDraw = uu;
                        break;
                    case 45:
                        thingToDraw = vv;
                        break;
                    case 46:
                        thingToDraw = ww;
                        break;
                    case 47:
                        thingToDraw = xx;
                        break;
                    case 48:
                        thingToDraw = yy;
                        break;
                    case 49:
                        thingToDraw = zz;
                        break;
                    case 50:
                        thingToDraw = aaa;
                        break;
                    case 51:
                        thingToDraw = bbb;
                        break;
                    case 52:
                        thingToDraw = ccc;
                        break;
                    case 53:
                        thingToDraw = ddd;
                        break;
                    case 54:
                        thingToDraw = eee;
                        break;
                    case 55:
                        thingToDraw = fff;
                        break;
                    case 56:
                        thingToDraw = ggg;
                        break;
                    case 57:
                        thingToDraw = hhh;
                        break;
                    case 58:
                        thingToDraw = iii;
                        break;
                    case 59:
                        thingToDraw = jjj;
                        break;
                    case 60:
                        thingToDraw = kkk;
                        break;
                    case 61:
                        thingToDraw = lll;
                        break;
                    case 62:
                        thingToDraw = mmm;
                        break;
                    case 63:
                        thingToDraw = nnn;
                        break;
                    case 64:
                        thingToDraw = ooo;
                        break;
                    case 65:
                        thingToDraw = qqq;
                        break;
                    case 66:
                        thingToDraw = rrr;
                        break;
                    case 67:
                        thingToDraw = sss;
                        break;
                    case 68:
                        thingToDraw = ttt;
                        break;
                    case 69:
                        thingToDraw = uuu;
                        break;
                    case 70:
                        thingToDraw = vvv;
                        break;
                    case 71:
                        thingToDraw = www;
                        break;
                    case 72:
                        thingToDraw = xxx;
                        break;
                    case 73:
                        thingToDraw = yyy;
                        break;
                    case 74:
                        thingToDraw = zzz;
                        break;
                }
                if (thingToDraw !== undefined) //If this space has something to draw in it
                {
                    if (thingToDraw === sewerFloor  && (l2 || l11)) // and that thing is flooring
                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (col * 32), (row * 32), 32, 32);// then draw it
                    // based on sprite
                    // sheet positions
                    // defined earlier
                    else                              //If its anything else
                        ctx.drawImage(thingToDraw, (col * 32), (row * 32)); //Draw whatever it is
                }
                xPos = col*32;
                yPos = row*32;
                if (xPos !== undefined && yPos !== undefined)
                {
                    if (!sewersDrained && l2)//Draw the section of sewage that was erased if within the area it exists
                    {
                        ctx.fillStyle = "rgba(47, 141, 91, 0.41)";          //Change to swamp colour green
                        if ((yPos === 0 && xPos !== 320) && xPos < 576)
                            ctx.fillRect(xPos, yPos + 24, 32, 24);//Draw over the bottom quarter of the tiles on row 0 (to make water look knee level)
                        else if (yPos === 352 && xPos < 384)
                            ctx.fillRect(xPos, yPos, 32, 2);
                        else if (yPos === 352 && xPos === 384)//Steps
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                        {
                            ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                            ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                            ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step


                            ctx.fillRect(xPos + 15, yPos, 17, 32);
                        }
                        else if (yPos >= 416 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos >= 352 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)    //For drawing only where the water should be
                            ctx.fillRect(xPos, yPos, 32, 32);               //^^^^^
                        else if (yPos > 0 && yPos < 352 && xPos === 320)                  //      ^^^^^
                            ctx.fillRect(xPos, yPos, 32, 32);               //            ^^^^^^
                        else if (yPos === 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos + 28, 32, 4);           //Draw over the bottom eighth of the tiles// of the secondary rooms outer wall// (to make water look knee level)
                        else if (yPos > 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos, 32, 32);

                        ctx.fillStyle = "rgba(98, 79, 18, 0.51)";           //Change to swamp colour brown and do above

                        if ((yPos === 0 && xPos !== 320) && xPos < 576)
                            ctx.fillRect(xPos, yPos + 24, 32, 24);
                        else if (yPos === 352 && xPos < 384)
                            ctx.fillRect(xPos, yPos, 32, 2);
                        else if (yPos === 352 && xPos === 384)//Steps
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                        {
                            ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                            ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                            ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step

                            ctx.fillRect(xPos + 15, yPos, 17, 32);
                        }
                        else if (yPos >= 416 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos >= 352 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos === 320)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos + 28, 32, 4);
                        else if (yPos > 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                    }

                    if (!lightsOn && l2)                //If 'the lights are off' on level two
                    {
                        let xPos = (p.col + 1) * 32, yPos = p.row * 32;

                        ctx.fillStyle = "rgba(0, 0, 0, 1)";     //Draw a black block over areas not 'lit by torch'
                        ctx.fillRect(xPos + 48, 0, 800, 600);
                        ctx.fillRect(0, yPos + 96, 800, 600);
                        ctx.fillRect(0, 0, xPos - 80, 600);
                        ctx.fillRect(0, 0, 800, yPos - 32);
                    }

                }

                destX += 32;
            }
            destY += 32;
        }
        drawPMap();
        dialogX = undefined;
        dialogY = undefined;
        dialog = false;
        alreadySetTimeout = false;

    }
}

function checkIfMoved()//If player has moved - erase section of map dialog was covering and redraw whatever was there
{
    if ((p.row !== dialogY || p.col !== dialogX) && dialog) //If player walks away from the item that gave dialog msg
    {
        let destX = 0, destY = 0;       //define spacing for drawing empty map
        let xPos = 0, yPos = 0;

        ctx.clearRect((dialogX + 1) * 32, (dialogY + 1) * 32, 160, 96);     //clear portion of map taken up by bubble
        for (let row = (dialogY + 1); row < ((dialogY + 1) + 3); row++)     //Draw the map that was cleared
        {
            for (let col = (dialogX + 1); col < ((dialogX + 1) + 5); col++)
            {
                switch (lMap[level][row][col])                //set the thing that will be drawn based on level settings
                {
                    case 0:                   //letters (a through n) are reassigned to an image upon loading each level
                        // in order to correspond with this drawing scheme
                        thingToDraw = a;            // set the thing that will be drawn as an image based on level
                        break;
                    case 1:
                        thingToDraw = b;
                        break;
                    case 2:
                        thingToDraw = c;
                        break;
                    case 3:
                        floorSpriteX = 32;
                        thingToDraw = d;
                        break;
                    case 4:
                        floorSpriteX = 64;
                        thingToDraw = e;
                        break;
                    case 5:
                        floorSpriteX = 96;
                        thingToDraw = f;
                        break;
                    case 6:
                        thingToDraw = g;
                        break;
                    case 7:
                        if (l2 && !sewersDrained)               //If on level 2 and the sewer is not drained (filled)
                            thingToDraw = wetPipe;                  //draw pipe spewing liquid
                        else                                    //Otherwise
                            thingToDraw = h;                        //draw pipe not spewing liquid
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
                    case 14:
                        thingToDraw = o;
                        break;
                    case 15:
                        thingToDraw = q;
                        break;
                    case 16:
                        thingToDraw = r;
                        break;
                    case 17:
                        thingToDraw = s;
                        break;
                    case 18:
                        thingToDraw = t;
                        break;
                    case 19:
                        thingToDraw = u;
                        break;
                    case 20:
                        thingToDraw = v;
                        break;
                    case 21:
                        thingToDraw = w;
                        break;
                    case 22:
                        thingToDraw = x;
                        break;
                    case 23:
                        thingToDraw = y;
                        break;
                    case 24:
                        thingToDraw = z;
                        break;
                    case 25:
                        thingToDraw = aa;
                        break;
                    case 26:
                        thingToDraw = bb;
                        break;
                    case 27:
                        thingToDraw = cc;
                        break;
                    case 28:
                        thingToDraw = dd;
                        break;
                    case 29:
                        thingToDraw = ee;
                        break;
                    case 30:
                        thingToDraw = ff;
                        break;
                    case 31:
                        thingToDraw = gg;
                        break;
                    case 32:
                        thingToDraw = hh;
                        break;
                    case 33:
                        thingToDraw = ii;
                        break;
                    case 34:
                        thingToDraw = jj;
                        break;
                    case 35:
                        thingToDraw = kk;
                        break;
                    case 36:
                        thingToDraw = ll;
                        break;
                    case 37:
                        thingToDraw = mm;
                        break;
                    case 38:
                        thingToDraw = nn;
                        break;
                    case 39:
                        thingToDraw = oo;
                        break;
                    case 40:
                        thingToDraw = qq;
                        break;
                    case 41:
                        thingToDraw = rr;
                        break;
                    case 42:
                        thingToDraw = ss;
                        break;
                    case 43:
                        thingToDraw = tt;
                        break;
                    case 44:
                        thingToDraw = uu;
                        break;
                    case 45:
                        thingToDraw = vv;
                        break;
                    case 46:
                        thingToDraw = ww;
                        break;
                    case 47:
                        thingToDraw = xx;
                        break;
                    case 48:
                        thingToDraw = yy;
                        break;
                    case 49:
                        thingToDraw = zz;
                        break;
                    case 50:
                        thingToDraw = aaa;
                        break;
                    case 51:
                        thingToDraw = bbb;
                        break;
                    case 52:
                        thingToDraw = ccc;
                        break;
                    case 53:
                        thingToDraw = ddd;
                        break;
                    case 54:
                        thingToDraw = eee;
                        break;
                    case 55:
                        thingToDraw = fff;
                        break;
                    case 56:
                        thingToDraw = ggg;
                        break;
                    case 57:
                        thingToDraw = hhh;
                        break;
                    case 58:
                        thingToDraw = iii;
                        break;
                    case 59:
                        thingToDraw = jjj;
                        break;
                    case 60:
                        thingToDraw = kkk;
                        break;
                    case 61:
                        thingToDraw = lll;
                        break;
                    case 62:
                        thingToDraw = mmm;
                        break;
                    case 63:
                        thingToDraw = nnn;
                        break;
                    case 64:
                        thingToDraw = ooo;
                        break;
                    case 65:
                        thingToDraw = qqq;
                        break;
                    case 66:
                        thingToDraw = rrr;
                        break;
                    case 67:
                        thingToDraw = sss;
                        break;
                    case 68:
                        thingToDraw = ttt;
                        break;
                    case 69:
                        thingToDraw = uuu;
                        break;
                    case 70:
                        thingToDraw = vvv;
                        break;
                    case 71:
                        thingToDraw = www;
                        break;
                    case 72:
                        thingToDraw = xxx;
                        break;
                    case 73:
                        thingToDraw = yyy;
                        break;
                    case 74:
                        thingToDraw = zzz;
                        break;
                }
                if (thingToDraw !== undefined) //If this space has something to draw in it
                {
                    if (thingToDraw === sewerFloor  && (l2 || l11)) // and that thing is flooring
                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (col * 32), (row * 32), 32, 32);// then draw it
                    // based on sprite
                    // sheet positions
                    // defined earlier
                    else                              //If its anything else
                        ctx.drawImage(thingToDraw, (col * 32), (row * 32)); //Draw whatever it is
                }
                xPos = col*32;
                yPos = row*32;
                if (xPos !== undefined && yPos !== undefined)
                {
                    if (!sewersDrained && l2)//Draw the section of sewage that was erased if within the area it exists
                    {
                        ctx.fillStyle = "rgba(47, 141, 91, 0.41)";          //Change to swamp colour green
                        if ((yPos === 0 && xPos !== 320) && xPos < 576)
                            ctx.fillRect(xPos, yPos + 24, 32, 24);//Draw over the bottom quarter of the tiles on row 0 (to make water look knee level)
                        else if (yPos === 352 && xPos < 384)
                            ctx.fillRect(xPos, yPos, 32, 2);
                        else if (yPos === 352 && xPos === 384)//Steps
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                        {
                            ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                            ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                            ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step


                            ctx.fillRect(xPos + 15, yPos, 17, 32);
                        }
                        else if (yPos >= 416 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos >= 352 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)    //For drawing only where the water should be
                            ctx.fillRect(xPos, yPos, 32, 32);               //^^^^^
                        else if (yPos > 0 && yPos < 352 && xPos === 320)                  //      ^^^^^
                            ctx.fillRect(xPos, yPos, 32, 32);               //            ^^^^^^
                        else if (yPos === 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos + 28, 32, 4);           //Draw over the bottom eighth of the tiles// of the secondary rooms outer wall// (to make water look knee level)
                        else if (yPos > 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos, 32, 32);

                        ctx.fillStyle = "rgba(98, 79, 18, 0.51)";           //Change to swamp colour brown and do above

                        if ((yPos === 0 && xPos !== 320) && xPos < 576)
                            ctx.fillRect(xPos, yPos + 24, 32, 24);
                        else if (yPos === 352 && xPos < 384)
                            ctx.fillRect(xPos, yPos, 32, 2);
                        else if (yPos === 352 && xPos === 384)//Steps
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 384 && xPos === 384)//Step1, 2 & 3
                        {
                            ctx.fillRect(xPos, yPos, 5, 1);        //These draw 3 pixels in total for the steps
                            ctx.fillRect(xPos + 5, yPos, 5, 2);    //       (I'm !insane.. I swear)
                            ctx.fillRect(xPos + 10, yPos, 5, 32);  //Submerged last step

                            ctx.fillRect(xPos + 15, yPos, 17, 32);
                        }
                        else if (yPos >= 416 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos >= 352 && xPos > 352 && xPos < 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos < 576 && xPos !== 320)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && yPos < 352 && xPos === 320)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos === 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos + 28, 32, 4);
                        else if (yPos > 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos, 32, 32);
                    }
                    if (!lightsOn && l2)                //If 'the lights are off' on level two
                    {
                        let xPos = (p.col + 1) * 32, yPos = p.row * 32;

                        ctx.fillStyle = "rgba(0, 0, 0, 1)";     //Draw a black block over areas not 'lit by torch'
                        ctx.fillRect(xPos + 48, 0, 800, 600);
                        ctx.fillRect(0, yPos + 96, 800, 600);
                        ctx.fillRect(0, 0, xPos - 80, 600);
                        ctx.fillRect(0, 0, 800, yPos - 32);
                    }

                }

                destX += 32;
            }
            destY += 32;
        }





        drawPMap();

        //Turn off the dialog stuffs
        dialogX = undefined;
        dialogY = undefined;
        dialog = false;
        alreadySetTimeout = false;
    }
}

//function for level3
function clearLevel3()
{
    bgm_level3.pause();
    dangerous.pause();
    clearInterval(timer_level3);
}

function detectMovementLevel3()
{
    if (l3 && enemyAppearLevel3 === true)
    {

        warningSound.play();
        enemiesLevel3.push(enemyLevel3);
        setTimeout(alert("you detected by mobbists - temp msg(" + enemiesLevel3.length + "enemies in this area.)"), 1000);
        enemyAppearLevel3 = false;
        detectPlayerLevel3 = true;
        // add mob, start timer again.
    }
}

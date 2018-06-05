let gameOver = false;


let l1 = false, l2 = true, l3 = false, l4 = false, l5 = false, l6 = false, l7 = false, l11 = false;
let level = 2;


let walkingSpeed = 15;


let lightSwitch = 1, sewerSwitch = 1;                                 //For sewer level
let lightsOn = true, sewersDrained = true;                          //For sewer level
let floorSpriteX = undefined, floorSet = false;                       //For sewer level
let notWalking = true, canGoThisWay = false;                          //For boundaries and walking animation
let walkedUpAlready = false;                                            //For animating walking up fire escaped (l6)

//level 0 is undefined as we do not have a level 0
   // Level       0      1   2   3   4    5   6   7      8          9         10      11
let startX = [undefined, 0,  0,  1,  10,  0,  10, 1, undefined, undefined, undefined, 12],
    startY = [undefined, 5,  0,  16, 17,  0,  14, 1, undefined, undefined, undefined, 17];


//For setting direction the character is facing when entering a new level
let startFrameY = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
                   undefined, undefined, undefined];


//x and y map boundaries per level
// Level          0       1    2    3    4    5    6    7       8           9           10       11
let xMax =   [undefined,  9,  24,  24,  24,  24,  16,  24,  undefined,  undefined,  undefined,  24],
    xMin =   [undefined,  0,   0,   0,   0,   0,   0,   0,  undefined,  undefined,  undefined,  0],
    yMax =   [undefined, 17,  17,  17,  17,  17,  17,  17,  undefined,  undefined,  undefined,  17],
    yMin =   [undefined,  5,   0,   0,   0,   0,   5,   1,  undefined,  undefined,  undefined,  2];


// Level floor numbers -   0 , 1,     2,     3, 4, 5, 6, 7      8          9         10       11
let floorNumbers = [undefined, 0, undefined, 0, 1, 2, 0, 1, undefined, undefined, undefined, undefined];


//level maps initialized when levels are loaded
    // Level    0          1          2          3          4          5          6         7
let lMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    //   8        9         10          11
    undefined, undefined, undefined, undefined];


//level player maps initialized when levels are loaded
let lPMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
    //   8        9         10          11
    undefined, undefined, undefined, undefined];


let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,q,r,s,t,u,v,w,x,y,z,aa,bb,cc,dd,ee,ff,gg,hh,ii,jj,kk,ll,mm,nn,oo,qq,rr,ss,tt,uu,vv,ww,
    xx,yy,zz,aaa,bbb,ccc,ddd,eee,fff,ggg,hhh,iii,jjj,kkk,lll,mmm,nnn,ooo,qqq,rrr,sss,ttt,uuu,vvv,www,xxx,yyy,zzz,
    thingToDraw;       //Used with global functions to pass case numbers to

    a = b = c  = d = e = f = g = h = i = j = k = l = m = n = o = q = r = s = t = u = v = w = x = y = z =
    aa = bb = cc = dd = ee = ff = gg = hh = ii = jj = kk = ll = mm = nn = oo = qq = rr = ss = tt = uu = vv = ww = xx =
    yy = zz = aaa = bbb = ccc = ddd = eee = fff = ggg = hhh = iii = jjj = kkk = lll = mmm = nnn = ooo = qqq = rrr = sss
    = ttt = uuu = vvv = www = xxx = yyy = zzz = thingToDraw = undefined;


let p =                                                         //PlayerObject
{
row: 10,
col: 10,
prevRow: undefined,        //Collects players previous x location to use for clearing only that section of canvas
prevCol: undefined,        //Collects players previous y location to use for clearing only that section of canvas
width: 32,               //The players width in the tile sheet
height: 48,              //The players height in the tile sheet
srcX: 0,                 //X location on tile sheet that current player image is coming from
srcY: 0,                 //Y location on tile sheet that current player image is coming from
frameX: 0,                //Counter to use for selecting section of tile sheet based on steps
frameY: 0,
};


//Global Images
let scientist = new Image();                                    //Regular player image
scientist.src = "../../0Main/images/scientist2.png";
let sciUndWater = new Image();                                  //Image fpr player while in sewer
sciUndWater.src = "../../2Sewer/images/scientist2.png";
let wetPipe = new Image();
wetPipe.src = "../../2Sewer/images/pipeWet.png";
let sewerFloor = new Image();
sewerFloor.src = "../../2Sewer/images/floor.png";
let level3sprite = new Image();
level3sprite.src = "../../3Store/images/ClothingStoreSprite.png";


//Level6 Roof
let gate = new Image();
gate.src = "../../6Roof/images/gate.png";
let fence = new Image();
fence.src = "../../6Roof/images/fence.png";
let litWindow = new Image();
litWindow.src = "../../6Roof/images/litWindow.png";
let darkWindow = new Image();
darkWindow.src = "../../6Roof/images/darkWindow.png";
let cherryTree = new Image();
cherryTree.src = "../../6Roof/images/cherryTree.png";
let statue = new Image();
statue.src = "../../6Roof/images/statue.png";
let car = new Image();
car.src = "../../6Roof/images/car.png";
let ladder = new Image();
ladder.src = "../../6Roof/images/ladder.png";
let helipad = new Image();
helipad.src = "../../6Roof/images/helipad.png";
let helicopter = new Image();
helicopter.src = "../../6Roof/images/helicopter1.png";
let exit = new Image();
exit.src = "../../6Roof/images/exit2.png";
let shrub = new Image();
shrub.src = "../../6Roof/images/shrub.png";
//Level6 Roof


//Global Audio
let waterRunning = new Audio('../../2Sewer/audio/waterRunning.mp3');
waterRunning.loop = true;
waterRunning.volume = 0.3;

startGame();


function startGame()
{
    if (l1)//Home(roof)

    {
        canvas.style.backgroundImage = "url('../../1Home/images/city.gif')";
        /*You could change fill style to brown or some other colour and fill a rectangle behind the house so that the
        * background picture doesn't show through the house*/



        let outsideWall = new Image();
        outsideWall.src = "../../1Home/images/outsideWall.png";
        let chimney = new Image();
        chimney.src = "../../1Home/images/chimney.png";
        let windowTopLeft = new Image();
        windowTopLeft.src = "../../1Home/images/windowTopLeft.png";
        let windowTopRight = new Image();
        windowTopRight.src = "../../1Home/images/windowTopRight.png";
        let windowBottomLeft = new Image();
        windowBottomLeft.src = "../../1Home/images/windowBottomLeft.png";
        let windowBottomRight = new Image();
        windowBottomRight.src = "../../1Home/images/windowBottomRight.png";
        let streetLight = new Image();
        streetLight.src = "../../1Home/images/streetLight.png";
        let roof = new Image();
        roof.src = "../../1Home/images/shingles.jpg";


        //Below one letter variables must be updated upon calling each level
        a = roof;
        b = outsideWall;
        c = undefined;
        d = chimney;
        e = windowTopLeft;
        f = windowTopRight;
        g = windowBottomLeft;
        h = windowBottomRight;


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

    if (l2)//Sewer

    {
        canvas.style.backgroundImage = "";


        let wallSwamp = new Image();
        wallSwamp.src = "../../2Sewer/images/wallSwamp.png";
        let pipe = new Image();
        pipe.src = "../../2Sewer/images/pipe.png";
        let pillar = new Image();
        pillar.src = "../../2Sewer/images/pillar.png";
        let wall = new Image();
        wall.src = "../../2Sewer/images/upperWall.png";
        let door = new Image();
        door.src = "../../2Sewer/images/door.png";
        let drain = new Image();
        drain.src = "../../2Sewer/images/drain.png";
        let topSide = new Image();
        topSide.src = "../../2Sewer/images/topSide.png";
        let topCorner = new Image();
        topCorner.src = "../../2Sewer/images/topCorner.png";
        let wallCorner = new Image();
        wallCorner.src = "../../2Sewer/images/wallCorner.png";
        let door2 = new Image();
        door2.src = "../../2Sewer/images/door2.png";
        let stairs = new Image();
        stairs.src = "../../2Sewer/images/stairs.png";



        a = wall;           //0
        b = door;           //1
        c = undefined;      //2
        d = sewerFloor;          //3
        e = sewerFloor;          //4
        f = sewerFloor;          //5
        g = drain;          //6
        h = pipe;           //7
        i = stairs;         //8
        j = door2;          //9
        k = wallSwamp;      //10
        l = wallCorner;     //11
        m = topSide;        //12
        n = topCorner;      //13


        if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
        {
            lMap[level] =                                           //Initialize this levels map
                //                                 10                            20
                [  //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4

                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 8],        //0
                    [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2],        //1
                    [4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4],        //2
                    [5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5],        //3
                    [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2],        //4
                    [3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3],        //5
                    [5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5],        //6
                    [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 6],        //7
                    [3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3],        //8
                    [3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3],        //9
                    [4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4],        //10
                    [4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4],        //11
                    [5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5],        //12
                    [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2],        //13
                    [3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3],        //14
                    [4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4],        //15
                    [5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5],        //16
                    [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2],        //17
                    [3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3]         //18
                ];
        }

        if (!floorSet)
        {
            for (let y = 1; y < lMap[level].length; y++)                        //Randomize floor pattern
            {
                for (let x = 0; x < lMap[level][0].length; x++)
                {
                    lMap[level][y][x] = (Math.floor(Math.random() * 2) + 3);
                }
            }

            lMap[level][11][24] = 6;                                    //Set the drains position (Needs to be done
                                                                        // manually like this in order to allow
                                                                        // for randomized floor pattern
        }


        for (let wall = 1; wall < 7; wall++)                        //Setup locked room
        {
            lMap[level][wall][18] = 12;
            lMap[level][7][wall + 17] = 10;
            for (let tiles = 19; tiles < 25; tiles++)
            {
                lMap[level][wall][tiles] = 5;
            }
        }
        lMap[level][7][22] = 9;
        lMap[level][7][24] = 10;
        lMap[level][7][18] = 11;

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


        //Below ensures all elements are on screen when level is drawn
        stairs.onload = function(){drawMap();};
        addEventListener("keydown", onKeyDown, false);
        startX[2] = startY[2] = 0;
    /*    startX[7] = 36; startY[7] = 21;*/
    }

    if (l3)//Clothing Store

    {
        canvas.style.backgroundImage = "";


        let floor = new Image();
        floor.src = "../../3Store/images/floor.png";
        let rack1 = new Image();
        rack1.src = "../../3Store/images/rack_1.png";
        let rack2 = new Image();
        rack2.src = "../../3Store/images/rack_2.png";
        let rack3 = new Image();
        rack3.src = "../../3Store/images/rack_3.png";
        let display1 = new Image();
        display1.src = "../../3Store/images/display_1.png";
        let display2 = new Image();
        display2.src = "../../3Store/images/display_2.png";
        let display3 = new Image();
        display3.src = "../../3Store/images/display_3.png";
        let display4 = new Image();
        display4.src = "../../3Store/images/display_4.png";
        let counter1 = new Image();
        counter1.src = "../../3Store/images/counter_1.png";
        let counter2 = new Image();
        counter2.src = "../../3Store/images/counter_2.png";
        let counter3 = new Image();
        counter3.src = "../../3Store/images/counter_3.png";
        let wall = new Image();
        wall.src = "../../3Store/images/wall_1.png";
        let wallLeft = new Image();
        wallLeft.src = "../../3Store/images/wall_left.png";
        let wallRight = new Image();
        wallRight.src = "../../3Store/images/wall_right.png";
        let cabinet = new Image();
        cabinet.src = "../../3Store/images/cabinet.png";
        let stair = new Image();
        stair.src = "../../3Store/images/downstair.png";
        let exit1 = new Image();
        exit1.src = "../../3Store/images/welcome_1.png";
        let exit2 = new Image();
        exit2.src = "../../3Store/images/welcome_2.png";
        let windowClose = new Image();
        windowClose.src = "../../3Store/images/window_close.png";
        let windowOpen = new Image();
        windowOpen.src = "../../3Store/images/window_open.png";
        let door1 = new Image();
        door1.src = "../../3Store/images/door_1.png";
        let door2 = new Image();
        door2.src = "../../3Store/images/door_2.png";
        let chair = new Image();
        chair.src = "../../3Store/images/chair.png";
        let desk = new Image();
        desk.src = "../../3Store/images/desk.png";


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
        r = exit1;       //16
        s = exit2;       //17
        t = windowClose; //18
        u = windowOpen;  //19
        v = door1;       // 20
        w = door2;       //21
        x = desk;        //22
        y = chair;       // 23


        if (lMap[level] === undefined)
        {
            lMap[level] = [                    //10                          //20
                [18,11,11,11,18,11,11,11,18,11,20,21,11,11,18,11,11,11,18,11,11,11,18,11,11],
                [14, 0, 0,22,22,13, 0, 0, 0, 0,16,17, 0, 0, 0, 0, 0, 0, 0,12,14,14, 0,14,14],
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


        desk.onload = function(){drawMap();};

        addEventListener("keydown", onKeyDown, false);
        waterRunning.pause();
    }

    if (l4)//The Streetz

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




        if (lMap[level] === undefined)
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


        side.onload = function(){drawMap()};


        addEventListener("keydown", onKeyDown, false);
    }
    
    if (l5)//Moms House

    {
        canvas.style.backgroundImage = "";

        let wall = new Image();
        wall.src = "../../5MomsPlace/images/wall.png";
        let door = new Image();
        door.src = "../../5MomsPlace/images/door.png";
        let floor = new Image();
        floor.src = "../../5MomsPlace/images/floor.png";
        let cat = new Image();
        cat.src = "../../5MomsPlace/images/cat.png";


        if (lMap[level] === undefined)
            lMap[level] =
                //                  10                  20
                [  //1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],    //0
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //1
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //2
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //3
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //4
                    [2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2],    //5
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //6
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2],    //7
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //8
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //9
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //10
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2],    //11
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //12
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //13
                    [2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],    //14
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //15
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,3,2,2,2,2,2,2,2,2,2,2,2],    //16
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],    //17
                    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]     //18
                ];


        a = wall;
        b = door;
        c = floor;
        d = cat;
        e = undefined;
        f = undefined;
        g = undefined;
        h = undefined;


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
        }

        changePStartPos();

        cat.onload = function(){drawMap();};
        floor.onload = function(){addEventListener("keydown", onKeyDown, false);};
    }

    if (l6)//Roof (Home)

    {
        canvas.style.backgroundImage = "url('../../6Roof/images/city.gif')";


        let roof = new Image();
        roof.src = "../../6Roof/images/shingles.jpg";
        let wall = new Image();
        wall.src = "../../6Roof/images/wall.png";
        let shinglesEdge = new Image();
        shinglesEdge.src = "../../6Roof/images/shinglesEdge.jpg";
        let shinglesLeft = new Image();
        shinglesLeft.src = "../../6Roof/images/shinglesLeft.png";
        let shinglesRight = new Image();
        shinglesRight.src = "../../6Roof/images/shinglesRight.png";
        let shinglesBRight = new Image();
        shinglesBRight.src = "../../6Roof/images/shinglesBRight.png";



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


        /*shinglesBRight.onload = function(){drawMap();};*/

        addEventListener("keydown", onKeyDown, false);

    }

    if (l7)//Lab

    {
        canvas.style.backgroundImage = "";

        let floor = new Image();
        floor.src = "../../7Lab/images/Floor.png";
        let wall = new Image();
        wall.src = "../../7Lab/images/Wall.png";
        let door1 = new Image();
        door1.src = "../../7Lab/images/door1.png";
        let stairs = new Image();
        stairs.src = "../../7Lab/images/stairs.png";


        if (lMap[level] === undefined)
            lMap[level]=
                //                    10                  20
                [  //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3]
                ];


        a = wall;
        b = floor;
        c = door1;
        d = stairs;
        e = undefined;
        f = undefined;
        g = undefined;
        h = undefined;


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
        }


        changePStartPos();


        floor.onload = function(){addEventListener("keydown", onKeyDown, false);};
        wall.onload = function(){drawMap();};
    }




    if (l11)//SewerPipe Map
    {
        canvas.style.backgroundImage = "";

        let wall = new Image();
        wall.src = "../../2Sewer/images/unusedWallTiles/wall.png";
        let upperWall = new Image();
        upperWall.src = "../../2Sewer/images/upperWall.png";
        let pipeTopView = new Image();
        pipeTopView.src = "../../2Sewer/images/pipe3.png";
        let valveTl = new Image();
        valveTl.src = "../../2Sewer/images/valveTl.png";
        let valveTm = new Image();
        valveTm.src = "../../2Sewer/images/valveTm.png";
        let valveTr = new Image();
        valveTr.src = "../../2Sewer/images/valveTr.png";
        let valveMl = new Image();
        valveMl.src = "../../2Sewer/images/valveMl.png";
        let valveMm = new Image();
        valveMm.src = "../../2Sewer/images/valveMm.png";
        let valveMr = new Image();
        valveMr.src = "../../2Sewer/images/valveMr.png";
        let valveBl = new Image();
        valveBl.src = "../../2Sewer/images/valveBl.png";
        let valveBm = new Image();
        valveBm.src = "../../2Sewer/images/valveBm.png";
        let valveBr = new Image();
        valveBr.src = "../../2Sewer/images/valveBr.png";

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

        if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
        {
            lMap[level] =                                           //Initialize this levels map
                //                                 10                            20
                [  //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4

                    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 6, 7, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],        //0
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],        //1
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 11, 12, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],        //2
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //3
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //4
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //5
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //6
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //7
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //8
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //9
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //10
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //11
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //12
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //13
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //14
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //15
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //16
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //17
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]         //18
                ];
        }

        if (!floorSet)
        {
            for (let y = 3; y < lMap[level].length; y++)                        //Randomize floor pattern
            {
                for (let x = 0; x < lMap[level][0].length; x++)
                {
                    lMap[level][y][x] = (Math.floor(Math.random() * 2) + 3);
                }
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
                            ctx.fillRect(xPos, yPos + 24, 32, 24);          //Draw over the bottom quarter of the tiles
                                                                            // on row 0 (to make water look knee level)

                        else if (yPos > 0 && xPos < 576 && xPos !== 320)    //For drawing only where the water should be
                            ctx.fillRect(xPos, yPos, 32, 32);               //^^^^^
                        else if (yPos > 0 && xPos === 320)                  //      ^^^^^
                            ctx.fillRect(xPos, yPos, 32, 32);               //            ^^^^^^

                        else if (yPos === 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos + 28, 32, 4);           //Draw over the bottom eighth of the tiles
                                                                            // of the secondary rooms outer wall
                                                                            // (to make water look knee level)
                        else if (yPos > 224 && xPos >= 576)
                            ctx.fillRect(xPos, yPos, 32, 32);

                        ctx.fillStyle = "rgba(98, 79, 18, 0.51)";           //Change to swamp colour brown and do above
                        if ((yPos === 0 && xPos !== 320) && xPos < 576)
                            ctx.fillRect(xPos, yPos + 24, 32, 24);
                        else if (yPos > 0 && xPos < 576 && xPos !== 320)
                            ctx.fillRect(xPos, yPos, 32, 32);
                        else if (yPos > 0 && xPos === 320)
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
}

function drawPMap()
{
    let destX = 0, destY = 0;       //Used to decide which area of map to draw

    for (let row = 0; row < lPMap[level].length; row++)         //Run through rows
    {
        for (let col = 0; col < lPMap[level][0].length; col++)      // and columns, checking each element for the player
        {
            switch (lPMap[level][row][col])
            {
                case 1:                                                 //If the element check contains the player
                    //Sets position on tile sheet to
                    // pick from when drawing player
                    p.srcX = p.width * (p.frameX % 4);
                    p.srcY = p.height * p.frameY;

                    if (!sewersDrained && l2)                           //and the sewer is filled with water
                                                                            //draw the players standing in water image
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, destX, destY, p.width, p.height);
                    else                                                 //and the sewer is  not filled with water
                                                                            //draw the players regular image
                        ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, destX, destY, p.width, p.height);

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

            if (steps < 4)
            {
                ctx.clearRect(309 + (8 * (steps - 1)), 448, 32, 48);
                fillErasedMap();
                drawL6Full();
                ctx.drawImage(scientist, (p.srcX%4) * 32, 96, 32, 48, 309 + (8 * steps), 448, 32, 48);
                setTimeout(upTheFireEscape, walkingSpeed * 3); //Multiplying by two makes walk player slower
            }
            else if (steps < 21)
            {

                ctx.clearRect(309 + (8 * (steps - 1)), 448 - (8 * (steps - 4)), 32, 48);
                fillErasedMap();
                drawL6Full();
                ctx.drawImage(scientist, (p.srcX % 4) * 32, 96, 32, 48, 309 + (8 * (steps)), 448 - (8 * (steps - 3)), 32, 48);
                setTimeout(upTheFireEscape, walkingSpeed * 3);//Multiplying by two makes walk player slower
            }
            else
            {
                ctx.clearRect(p.col * 32, p.row * 32, 32, 48);
                fillErasedMap();
                drawL6Full();
                ctx.drawImage(scientist, (p.srcX % 4) * 32, p.srcY * 48, 32, 48, p.col*32, p.row*32, 32, 48);
                walkedUpAlready = true;
                addEventListener("keydown", onKeyDown, false);
                alreadyDoinIt = true;
            }
        }

    }
}

function drawMap()
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
            ctx.fillRect(0, 24, 320, 576);//Left
            ctx.fillRect(320, 32, 32, 600);//Middle
            ctx.fillRect(352, 24, 224, 576);//Right
            ctx.fillRect(576, 252, 224, 376);//RightBottom

            ctx.fillStyle = "rgba(98, 79, 18, 0.51)";     //Draw a brown haze over portion of canvas to simulate sewer water
            ctx.fillRect(0, 24, 320, 576);//Left
            ctx.fillRect(320, 32, 32, 600);//Middle
            ctx.fillRect(352, 24, 224, 576);//Right
            ctx.fillRect(576, 252, 224, 376);//RightBottom

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
                    l2 = l3 = l4 = l5 = l6 = l7 = false;
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
                        l1 = l2 = l4 = l5 = l6 = l7 = false;         //Set all levels not being travelled to as false
                        l3 = true;                              //Set the one that is being travelled to to true

                        ctx.clearRect(0,0,800,600);             //Clear entire canvas
                        p.frameY = 2;                           //Change tile sheet frame to match direction being faced

                        startGame();                            //Load new levels assets and settings
                        setTimeout(drawMap, 40);                //Draw its entire map
                    }
                }
            };
        }  //Go through the door to level 3

        if (e === 38 && p.col === 10 && p.row === 0 && sewersDrained) //If going UP & character is under pipe
        {
            removeEventListener("keydown", onKeyDown, false);
            ctx.clearRect(320, 0, 32, 48);
            let sizer = 0;
            getInTheTube();

            function getInTheTube()
            {
                if (sizer < 10)//If is not small enough to fit through the door..
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
                    l1 = l2 = l3 = l4 = l5 = l6 = l7 = false;
                    l11 = true;
                    ctx.clearRect(0,0,800,600);
                    p.frameY = 0;
                    startGame();
                    setTimeout(drawMap, 40);
                }
            }
        }   //Go through the door to level 1
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

                ctx.clearRect(p.col * 32, p.row * 32, p.width, p.height);//Clear portion of canvas the player was last on
                fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                ctx.drawImage(scientist, (p.srcX + allTheStays)% 4 * 32, 48, 32, 48, p.col* (20 - 6*allTheStays) , p.row*32 + (allTheStays * 12), 32- (allTheStays * 5), 48 - (allTheStays * 10));

                if (allTheStays !== 4)            //If there are stairs to go down
                    setTimeout(goDownStays, 180); //...Go down them
                else                              //Otherwise, load level 2.
                {
                    level = 2;                              //Change level identifier to appropriate level
           /*         changePStartPos();*/
                    l1 = l3 = l4 = l5 = l6 = l7 =false;         //Set all levels false aside from new level
                    l2 = true;                              //Set new level to true
                    ctx.clearRect(0,0,800,600);             //Clear entire canvas
                    p.frameY = 0;                           //Change the frame of the players tilesheet to the direction
                                                            // the player will be facing
                    startGame();                            //Load assets and settings of the level being travelled to
                    setTimeout(drawMap, 40);                //Draw its map
                }
            }
        }
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
                        console.log(p.srcY);
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
                    l1 = l2 = l3 = l4 = l5 = l6 = l11 = false;             //Set all levels to false but the one being travelled to
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

     if (e.keyCode === 37)//Left

     {
         if (p.col > xMin[level] && notWalking && canGoThisWay)    //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 1;
             p.srcY = p.height * p.frameY;
             let walk = 0;

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
                     if (l2 && !sewersDrained)
                         ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 - (8 * walk)), p.row * 32, 32, 48);
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

             if (l2 && !sewersDrained)
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
     }

     if (e.keyCode === 39)//Right

     {
         if (p.col < xMax[level] && notWalking && canGoThisWay)    //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 2;
             p.srcY = p.height * p.frameY;
             let walk = 0;

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
                     if (l2 && !sewersDrained)
                         ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, (p.col * 32 + (8 * walk)), p.row * 32, 32, 48);
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

             if (l2 && !sewersDrained)
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
     }

     if (e.keyCode === 38)//Up

     {
         if (p.row > yMin[level] && notWalking && canGoThisWay)        //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 3;
             p.srcY = p.height * p.frameY;
             let walk = 0;

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
                     if (l2 && !sewersDrained)
                         ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);
                     else
                         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 - (8 * walk)), 32, 48);
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

             if (l2 && !sewersDrained)
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
     }

     if (e.keyCode === 40)//Down

     {
         if (p.row < yMax[level] && notWalking && canGoThisWay)        //Levels boundaries
         {
             //Change tile sheet frame to show player walking up
             p.frameY = 0;
             p.srcY = p.height * p.frameY;
             let walk = 0;

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
                     if (l2 && !sewersDrained)
                         ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
                     else
                         ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, (p.row * 32 + (8 * walk)), 32, 48);
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

             if (l2 && !sewersDrained)
                 ctx.drawImage(sciUndWater, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
             else
                 ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, p.row * 32, 32, 48);
         }
     }

     if (e.keyCode === 32) //Space

     {
         //Character action
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
         l2 = l3 = l4 = l5 = l6 = l7 = l11 = false;             //Set all levels to false but the one being travelled to
         l1 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 50) //2
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 2;              //Change level identifier appropriately
         l1 = l3 = l4 = l5 = l6 = l7 = l11 = false;             //Set all levels to false but the one being travelled to
         l2 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 51) //3
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 3;              //Change level identifier appropriately
         l1 = l2 = l4 = l5 = l6 = l7 = l11 = false;             //Set all levels to false but the one being travelled to
         l3 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 52) //4
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 4;              //Change level identifier appropriately
         l1 = l2 = l3 = l5 = l6 = l7 = l11 = false;             //Set all levels to false but the one being travelled to
         l4 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 53) //5
     {
         removeEventListener("keydown", onKeyDown, false);
         level = 5;              //Change level identifier appropriately
         l1 = l2 = l3 = l4 = l6 = l7 = l11 = false;             //Set all levels to false but the one being travelled to
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
         l1 = l2 = l3 = l4 = l5 = l7 = l11 = false;             //Set all levels to false but the one being travelled to
         l6 = true;                                  //Set level being travelled to as true
         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
    if (e.keyCode === 55) //7
    {
        removeEventListener("keydown", onKeyDown, false);
        level = 7;                  //Change level identifier appropriately
        l1 = l2 = l3 = l4 = l5 = l6 = l11 = false;             //Set all levels to false but the one being travelled to
        l7 = true;                                  //Set level being travelled to as true
        ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
        startGame();                                //Load settings and assets for next map
        setTimeout(drawMap, 40);                    //Draw next map
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
}

function checkBoundaries(e)

{
    if (e === 37 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)//Left
    {
           if (l1 || l4 || l5 || l7)
               canGoThisWay = (lMap[level][p.row + 1][p.col - 1] === floorNumbers[level]);
           else if (l2)
            {
                canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col - 1] === 3 ||
                    lMap[level][p.row + 1][p.col - 1] === 4 ||
                    lMap[level][p.row + 1][p.col - 1] === 5
                );
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
        if (l1 || l4 || l5 || l7)
            canGoThisWay = (lMap[level][p.row + 1][p.col + 1] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 3 ||
                    lMap[level][p.row + 1][p.col + 1] === 4 ||
                    lMap[level][p.row + 1][p.col + 1] === 5
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
        if (l1 || l4 || l5 || l7)
            canGoThisWay = (lMap[level][p.row][p.col] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 3 ||
                    lMap[level][p.row][p.col] === 4 ||
                    lMap[level][p.row][p.col] === 5
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
        if (l1 || l4 || l5 || l7)
            canGoThisWay = (lMap[level][p.row + 2][p.col] === floorNumbers[level]);
        else if (l2)
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 3 ||
                    lMap[level][p.row + 2][p.col] === 4 ||
                    lMap[level][p.row + 2][p.col] === 5
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
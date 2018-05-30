let gameOver = false;


let l1 = false, l2 = true, l3 = false, l4 = false, l5 = false, l6 = false, l7 = false;
let level = 2;


let walkingSpeed = 15;


let lightSwitch = 2, sewerSwitch = 2;               //For sewer level
let lightsOn = false, sewersDrained = false;         //For sewer level
let floorSpriteX = undefined, floorSet = false;                       //For sewer level
let notWalking = true, canGoThisWay = false;

//level 0 is undefined as we do not have a level 0
   // Level       0      1   2   3   4   5   6
let startX = [undefined, 0,  0,  1,  0,  0,  0],
    startY = [undefined, 5,  0,  16, 4,  0,  1];


//x and y map boundaries per level
// Level          0      1   2   3   4   5   6
let xMax =   [undefined, 24, 24, 24, 24, 24, 24],
    xMin =   [undefined, 0,  0,  0,  0,  0,  0],
    yMax =   [undefined, 17, 17, 17, 17, 17, 17],
    yMin =   [undefined, 10, 0,  0,  4,  0,  4];


// Level floor numbers -   0 , 1,     2,     3, 4, 5, 6
let floorNumbers = [undefined, 0, undefined, undefined, undefined, undefined, undefined];


//level maps initialized when levels are loaded
    // Level    0          1          2          3          4          5          6
let lMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
let lPMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];


let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


let a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,q,r,s,t,u,v,w,x,y,thingToDraw; //Used with global functions to pass case numbers to
    a = b = c  = d = e = f = g = h = i = j = k = l = m = n =
        o = q = r = s = t = u = v = w = x = y = thingToDraw = undefined;


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
let floor = new Image();
floor.src = "../../2Sewer/images/floor.png";
let level3sprite = new Image();
level3sprite.src = "../../3Store/images/ClothingStoreSprite.png";

//test

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


        let roof = new Image();
        roof.src = "../../1Home/images/shingles.jpg";
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
        //let tree = new Image();
        //tree.src = "../images/tree.png";
        let streetLight = new Image();
        streetLight.src = "../../1Home/images/streetLight.png";


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


        streetLight.onload = function (){drawMap();};
        addEventListener("keydown", onKeyDown, false);
        waterRunning.pause();
    }

    if (l2)//Sewer

    {
        canvas.style.backgroundImage = "";

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
        let wallSwamp = new Image();
        wallSwamp.src = "../../2Sewer/images/wallSwamp.png";
        let door2 = new Image();
        door2.src = "../../2Sewer/images/door2.png";
        let stairs = new Image();
        stairs.src = "../../2Sewer/images/stairs.png";



        a = wall;       //0
        b = door;       //1
        c = floor;      //2
        d = floor;      //3
        e = floor;      //4
        f = floor;      //5
        g = drain;      //6
        h = pipe;       //7
        i = stairs;     //8
        j = door2;      //9
        k = wallSwamp;  //10
        l = wallCorner; //11
        m = topSide;    //12
        n = topCorner;  //13

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
        scientist.onload = function () {stairs.onload = function(){drawMap();};};
        addEventListener("keydown", onKeyDown, false);
        startX[2] = startY[2] = 0;
    /*    startX[1] = 36; startY[1] = 21;*/
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
        let desk = new Image();
        desk.src = "../../3Store/images/desk.png";
        let chair = new Image();
        chair.src = "../../3Store/images/chair.png";



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

        level3sprite.onload = function(){drawMap();};

        addEventListener("keydown", onKeyDown, false);
        waterRunning.pause();
    }

    if (l4)//The Streetz

    {
        let street = new Image();
        let side = new Image();
        let house = new Image();
        let mall = new Image();
        let clothingstore = new Image();
        let park = new Image();
        let bank = new Image();
        let market = new Image();
        let school = new Image();
        let machine = new Image();
        let coffee = new Image();
        let momhouse = new Image();
        let store = new Image();
        let player = new Image();

        street.src = "../../4Streetz/images/street.png";
        side.src = "../../4Streetz/images/side.png";
        house.src = "../../4Streetz/images/house.png";
        mall.src = "../../4Streetz/images/mall.png";
        clothingstore.src = "../../4Streetz/images/clothingstore.png";
        park.src = "../../4Streetz/images/park.png";
        market.src = "../../4Streetz/images/market.png";
        bank.src = "../../4Streetz/images/bank.png";
        school.src = "../../4Streetz/images/school.png";
        machine.src = "../../4Streetz/images/machine.png";
        coffee.src = "../../4Streetz/images/coffee.png";
        momhouse.src = "../../4Streetz/images/momhouse.png";
        store.src= "../../4Streetz/images/store.png";
        player.src= "../../4Streetz/images/player.png";


        a = street;
        b = side;
        c = house;
        d = mall;
        e = clothingstore;
        f = park;
        g = market;
        h = bank;
        i = school;
        j = machine;
        k = coffee;
        l = momhouse;
        m = store;
        n = player;
        o = undefined;
        q = undefined;
        r = undefined;
        s = undefined;
        t = undefined;
        u = undefined;
        v = undefined;
        w = undefined;
        x = undefined;
        y = undefined;


        if (lMap[level] === undefined)
            lMap[level] =
                [
                //                    10                  20
                [0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0],
                [0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	21,	2,	2],
                [0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	62,	6,	6,	1,	2,	2,	2],
                [0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	1,	0,	0,	0,	0,	0,	0,	6,	6,	6,	1,	1,	1,	0],
                [0,	0,	5,	1,	0,	0,	0,	0,	1,	0,	81,	8,	8,	0,	0,	0,	0,	0,	6,	6,	6,	1,	0,	0,	0],
                [0,	0,	5,	1,	0,	0,	0,	0,	1,	0,	8,	8,	8,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	0],
                [0,	0,	5,	1,	0,	0,	70,	7,	1,	0,	8,	8,	8,	0,	0,	5,	5,	5,	5,	5,	5,	1,	0,	0,	0],
                [0,	0,	5,	1,	0,	0,	7,	7,	1,	0,	8,	8,	8,	0,	0,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0],
                [0,	0,	5,	1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0],
                [0,	0,	5,	1,	0,	0,	0,	0,	1,	41,	4,	0,	0,	0,	0,	1,	0,	0,	0,	90,	9,	1,	0,	0,	0],
                [0,	0,	0,	1,	0,	0,	0,	0,	1,	4,	4,	0,	0,	0,	0,	1,	0,	0,	0,	9,	9,	1,	0,	0,	0],
                [0,	0,	0,	1,	0,	0,	0,	0,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	0,	0,	0],
                [0,	0,	0,	1,	0,	0,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	141,	14,	14,	0,	0,	1,	0,	0,	0],
                [0,	0,	0,	1,	1,	130,13,	13,	1,	0,	0,	0,	0,	0,	0,	0,	14,	14,	14,	1,	1,	1,	1,	1,	0],
                [0, 0,	0,	1,	0,	13,	13,	13,	1,	0,	0,	0,	0,	120,	12,	0,	14,	14,	14,	0,	0,	0,	0,	1,	0],
                [101,10,10,	1,	0,	13,	13,	13,	1,	0,	0,	0,	0,	12,	12,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0],
                [10,10,	10,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0],
                [10,10,	10,	1,	5,	5,	5,	5,	5,	5,	5,	5,	5,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0],
                [10,10,	10,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0]
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

        player.onload = function(){addEventListener("keydown", onKeyDown, false);};
        store.onload = function(){drawMap()};

    }
    
    if (l5)//Moms House

    {
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
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],    //1
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

    if (l6)//Lab

    {
        let floor = new Image();
        floor.src = "../../6Lab/images/Floor.png";
        let wall = new Image();
        wall.src = "../../6Lab/images/Wall.png";
        let door1 = new Image();
        door1.src = "../../6Lab/images/door1.png";
        let stairs = new Image();
        stairs.src = "../../6Lab/images/stairs.png";


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

    if (l7)//Not decided

    {

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
                        floorSpriteX = 0;
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
                }


                //Below is exclusively for sewer level
                if (thingToDraw !== undefined)      //If there is something to be drawn in area being examined
                {
                    if (thingToDraw === floor  && l2)
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

                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, p.width, p.height, destX, destY, p.width, p.height);
                    else                                                 //and the sewer is  not filled with water
                                                                            //draw the players regular image

                        ctx.drawImage(scientist, p.srcX, p.srcY, p.width, p.height, destX, destY, p.width, p.height);
                    break;
            }

            destX += 32;         //Increment column by 1 (8 is column width in ratio to the canvas width)
        }
        destX = 0;              //Start over at beginning position of array as we are at a new row
        destY += 32;             //Increment row by 1 (8 is rows height in ratio to the canvas height)
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
                    floorSpriteX = 0;
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
            }

            if (thingToDraw !== undefined) //If this space has something to draw in it
            {
                if (thingToDraw === floor  && l2) // and that thing is flooring
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
    drawPMap();
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
                    l2 = l3 = l4 = l5 = l6 = false;
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
                        l1 = l2 = l4 = l5 = l6 = false;         //Set all levels not being travelled to as false
                        l3 = true;                              //Set the one that is being travelled to to true

                        ctx.clearRect(0,0,800,600);             //Clear entire canvas
                        p.frameY = 2;                           //Change tile sheet frame to match direction being faced

                        startGame();                            //Load new levels assets and settings
                        setTimeout(drawMap, 40);                //Draw its entire map
                    }
                }
            };
        }  //Go through the door to level 3
    }

    if (l3)//If it's Lvl 3
    {
        if (e === 37 && p.col === 3 && (p.row === 65 || p.row === 64))//If going LEFT at the staircase
        {//go back to sewer (from store)
            removeEventListener("keydown", onKeyDown, false);       //Turn controls off so columns and rows don't mess up

            startX[2] = 96;                     //Set location for character to appear on map that is being travelled to
            startY[2] = 0;                      //Set location for character to appear on map that is being travelled to

            let allTheStays = 0;                //Create variable to be used for counting stairs

            setTimeout(goDownStays, 120);       //Start animation of going down stairs

            function goDownStays()              //Animates player going down stairs and appearing in previous levels map
            {
                allTheStays++;                  //Increment stairs descended each time a stair is descended


                lPMap[level][p.row][p.col] = 0;    //Clear players previous position on in the levels player map (lPMap)
                p.col --;                           //Set character column member one to the left
                lPMap[level][p.row][p.col] = 1;     //Use players column member to set its new map position


                ctx.clearRect(p.prevCol * 8, p.prevRow * 8, p.width, p.height);//Clear portion of canvas the player was last on
                fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
                ctx.drawImage(scientist, 0, 48, 32, 48, p.col* (8 - 2*allTheStays) , p.row*8 + (allTheStays * 15), 32- (allTheStays * 5), 48 - (allTheStays * 15));


                if (allTheStays !== 3)            //If there are stairs to go down
                    setTimeout(goDownStays, 300); //...Go down them
                else                              //Otherwise, load level 2.
                {
                    level = 2;                              //Change level identifier to appropriate level
                    l1 = l3 = l4 = l5 = l6 = false;         //Set all levels false aside from new level
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

    }

    if (l7)//If it's Lvl 7
    {

    }

}

function onKeyDown(e)

{
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
                     notWalking = true;
                 }
             }
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
                     notWalking = true;
                 }
             }
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
                     ctx.drawImage(scientist, p.srcX, p.srcY, 32, 48, p.col * 32, ((p.row*32) - (8 * walk)), 32, 48);
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
                     notWalking = true;
                 }
             }
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
                     notWalking = true;
                 }
             }
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
     }

     if (e.keyCode === 83) //S - swamp

     {
         sewerSwitch++;
         sewersDrained = (sewerSwitch % 2 === 0);
         drawMap(); //Drawing whole map because swamp covers whole map
     }

     if (e.keyCode === 49) //1
     {
         level = 1;              //Change level identifier appropriately
         l2 = l3 = l4 = l5 = l6 = false;             //Set all levels to false but the one being travelled to
         l1 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 50) //2
     {
         level = 2;              //Change level identifier appropriately
         l1 = l3 = l4 = l5 = l6 = false;             //Set all levels to false but the one being travelled to
         l2 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 51) //3
     {
         level = 3;              //Change level identifier appropriately
         l1 = l2 = l4 = l5 = l6 = false;             //Set all levels to false but the one being travelled to
         l3 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 52) //4
     {
         level = 4;              //Change level identifier appropriately
         l1 = l2 = l3 = l5 = l6 = false;             //Set all levels to false but the one being travelled to
         l4 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 53) //5
     {
         level = 5;              //Change level identifier appropriately
         l1 = l2 = l3 = l4 = l6 = false;             //Set all levels to false but the one being travelled to
         l5 = true;                                  //Set level being travelled to as true

         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }
     if (e.keyCode === 54) //6
     {
         level = 6;                  //Change level identifier appropriately
         l1 = l2 = l3 = l4 = l5 = false;             //Set all levels to false but the one being travelled to
         l6 = true;                                  //Set level being travelled to as true
         ctx.clearRect(0,0,800,600);                 //Clear map to make way for new one
         startGame();                                //Load settings and assets for next map
         setTimeout(drawMap, 40);                    //Draw next map
     }




     if (sewersDrained) //If the water has been shut off
             waterRunning.pause();           //Stop playing the noise of running water
}

function checkBoundaries(e)

{
    if (e === 37 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col - 1] !== undefined)//Left
    {
           if (!l2)
               canGoThisWay = (lMap[level][p.row + 1][p.col - 1] === floorNumbers[level]);
           else
            {
                canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col - 1] === 2 ||
                    lMap[level][p.row + 1][p.col - 1] === 3 ||
                    lMap[level][p.row + 1][p.col - 1] === 4 ||
                    lMap[level][p.row + 1][p.col - 1] === 5
                );
            }
    }
    if (e === 39 && lMap[level][p.row + 1] !== undefined && lMap[level][p.row + 1][p.col + 1] !== undefined)//Right
    {
        if (!l2)
            canGoThisWay = (lMap[level][p.row + 1][p.col + 1] === floorNumbers[level]);
        else
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 1][p.col + 1] === 2 ||
                    lMap[level][p.row + 1][p.col + 1] === 3 ||
                    lMap[level][p.row + 1][p.col + 1] === 4 ||
                    lMap[level][p.row + 1][p.col + 1] === 5
                );
        }
    }
    if (e === 38 && lMap[level][p.row] !== undefined && lMap[level][p.row][p.col] !== undefined)//Up
    {
        if (!l2)
            canGoThisWay = (lMap[level][p.row][p.col] === floorNumbers[level]);
        else
        {
            canGoThisWay =
                (
                    lMap[level][p.row][p.col] === 2 ||
                    lMap[level][p.row][p.col] === 3 ||
                    lMap[level][p.row][p.col] === 4 ||
                    lMap[level][p.row][p.col] === 5
                );
        }
    }
    if (e === 40 && lMap[level][p.row + 2] !== undefined && lMap[level][p.row + 2][p.col] !== undefined)//Down
    {
        if (!l2)
            canGoThisWay = (lMap[level][p.row + 2][p.col] === floorNumbers[level]);
        else
        {
            canGoThisWay =
                (
                    lMap[level][p.row + 2][p.col] === 2 ||
                    lMap[level][p.row + 2][p.col] === 3 ||
                    lMap[level][p.row + 2][p.col] === 4 ||
                    lMap[level][p.row + 2][p.col] === 5
                );
        }
    }
}


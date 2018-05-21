let gameOver = false;


let l1 = true, l2 = false, l3 = false, l4 = false, l5 = false, l6 = false, l7 = false;


let level = 1;


let lightSwitch = 1, sewerSwitch = 1;               //For sewer level
let lightsOn = false, sewersDrained = false;         //For sewer level
let floorSpriteX = undefined, floorSet = false;                       //For sewer level


//level 0 is undefined as we do not have a level 0
   // Level       0      1   2   3   4   5   6
let startX = [undefined, 0,  0,  4,  0,  0,  0],
    startY = [undefined, 20, 0,  66, 4,  0,  4];


//x and y map boundaries per level
// Level          0      1   2   3   4   5   6
let xMax =   [undefined, 36, 96, 96, 96, 96, 96],
    xMin =   [undefined, 0,  0,  0,  0,  0,  0],
    yMax =   [undefined, 46, 69, 69, 69, 69, 69],
    yMin =   [undefined, 20, 0,  3,  4,  0,  4];


//level maps initialized when levels are loaded
    // Level    0          1          2          3          4          5          6
let lMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
let lPMap = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];


let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");


let a,b,c,d,e,f,g,h,i,j,k,l,m,n,thingToDraw; //Used with global functions to pass case numbers to
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


//Global Audio
let waterRunning = new Audio('../../2Sewer/audio/waterRunning.mp3');
waterRunning.loop = true;
waterRunning.volume = 0.3;


startGame();


function startGame()              //      **** = floor
{
    if (l1)//Home(roof)                   **** 0

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


        if (lPMap[level] === undefined) //Initialize this levels player map if it has not been initialized
        {
            lPMap[level] = [];                                                  //Declare a player map

            for (let y = 0; y < 70; y++)                                        //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 97; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][20][0] = 1; //Putting the player (scientist) into the player map for this level
        }


        changePStartPos();


        scientist.onload = function(){streetLight.onload = function (){drawMap();};};
        windowBottomRight.onload = function(){addEventListener("keydown", onKeyDown, false);};
    }

    if (l2)//Sewer                        **** 2345

    {
        canvas.style.backgroundImage = "";
        let pipe = new Image();
        pipe.src = "../../2Sewer/images/pipe.png";
        let pillar = new Image();
        pillar.src = "../../2Sewer/images/pillar.png";
        let wall = new Image();
        wall.src = "../../2Sewer/images/wall.png";
        let door = new Image();
        door.src = "../../2Sewer/images/door.png";
        let drain = new Image();
        drain.src = "../../2Sewer/images/drain.png";


        a = wall;
        b = door;
        c = floor;
        d = floor;
        e = floor;
        f = floor;
        g = drain;
        h = pipe;

        if (lMap[level] === undefined)                              //Stops map from recreating itself on second visit
            lMap[level] =                                           //Initialize this levels map
                //                                 10                            20
                [  //0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4

                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],        //0
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

        if (!floorSet)
        {
            for (let y = 1; y < lMap[level].length; y++)                        //Randomize floor pattern
            {
                for (let x = 0; x < lMap[level][0].length; x++)
                {
                    lMap[level][y][x] = (Math.floor(Math.random() * 4) + 2);
                }
            }

            lMap[level][13][24] = 6;                                    //Set the drains position (Needs to be done
                                                                        // manually like this in order to allow
                                                                        // for randomized floor pattern
        }

        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                                          //Declare a player map for this level
            for (let y = 0; y < 70; y++)                                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 97; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
        }


        changePStartPos();


        //Below ensures all elements are on screen when level is drawn
        scientist.onload = function () {drawMap();};
        floor.onload = function () {addEventListener("keydown", onKeyDown, false);};
    }

    if (l3)//Clothing Store               **** 0

    {
        if (lMap[level] === undefined)
        {
            lMap[level] = [                    //10                          //20                          // 1F center - main floor
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
        }

        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 70; y++)                //Initialize all indices with 0
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 97; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][66][4] = 1;                    //Set the players starting position
        }

        changePStartPos();

        level3sprite.onload = function(){drawMap();addEventListener("keydown", onKeyDown, false);};
    }

    if (l4)//The Streetz                  **** 1

    {
        let grass = new Image();
        grass.src = "../../4Streetz/images/grass.png";

        let sidewalk = new Image();
        sidewalk.src = "../../4Streetz/images/sidewalk.png";
        
        let house = new Image();
        house.src = "../../4Streetz/images/house.png";
        
        let bank = new Image();
        bank.src = "../../4Streetz/images/bank.png";
        
        let store = new Image();
        store.src = "../../4Streetz/images/store.png";


        a = sidewalk;
        b = grass;
        c = house;
        d = bank;
        e = store;
        f = undefined;
        g = undefined;
        h = undefined;


        if (lMap[level] === undefined) 
            lMap[level] =
            //                    10                  20
            [  //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,4,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];                           
            for (let y = 0; y < 70; y++)                
            {
                lPMap[level][y] = [];
        
                for (let x = 0; x < 97; x++)
                {
                    lPMap[level][y].push(0)
                }
            }

            lPMap[level][0][0] = 1;                             //Set the players starting position
        }

        changePStartPos();

        bank.onload = function(){addEventListener("keydown", onKeyDown, false);};
        store.onload = function(){drawMap()};

    }

    if (l5)//Moms House                   **** 2

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

            for (let y = 0; y < 70; y++)
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 97; x++)
                {
                    lPMap[level][y].push(0)
                }
            }
        }

        changePStartPos();

        cat.onload = function(){drawMap();};
        floor.onload = function(){addEventListener("keydown", onKeyDown, false);};
    }

    if (l6)//Lab                          **** 1

    {
        let floor = new Image();
        floor.src = "../../6Lab/images/Floor.png";
        let wall = new Image();
        wall.src = "../../6Lab/images/Wall.png";


        if (lMap[level] === undefined)
            lMap[level]=
            //                    10                  20
            [  //0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
                [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
            ];


        a = wall;
        b = floor;
        c = undefined;
        d = undefined;
        e = undefined;
        f = undefined;
        g = undefined;
        h = undefined;


        if (lPMap[level] === undefined)
        {
            lPMap[level] = [];

            for (let y = 0; y < 70; y++)
            {
                lPMap[level][y] = [];

                for (let x = 0; x < 97; x++)
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
    let thingToDraw = new Image(); //Setup an image letiable to use for choosing what image to draw where

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

                if (!l3)//Uniform image placement switch statement
                {
                    switch (lMap[level][mR][mC])//decide what needs drawing based on map index
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
                    }
                }

                if (l3)//Image placement switch statement for l3 only
                {
                    switch (lMap[level][mR][mC]) //decide what needs drawing based on map index
                    {
                        case 0: //floor
                            ctx.drawImage(level3sprite, 96, 0, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 1: //rack1
                            ctx.drawImage(level3sprite, 128, 0, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 2: //rack2
                            ctx.drawImage(level3sprite, 160, 0, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 3: //rack3
                            ctx.drawImage(level3sprite, 192, 0, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 4: //stand1
                            ctx.drawImage(level3sprite, 32, 0, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 5: //stand2
                            ctx.drawImage(level3sprite, 64, 0, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 6: //stand3
                            ctx.drawImage(level3sprite, 32, 32, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 7: //stand4
                            ctx.drawImage(level3sprite, 64, 32, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 8: //counter1
                            ctx.drawImage(level3sprite, 96, 32, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 9: //counter2
                            ctx.drawImage(level3sprite, 128, 32, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 10: //counter3
                            ctx.drawImage(level3sprite, 160, 32, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 11: //wall1
                            ctx.drawImage(level3sprite, 0, 0, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 12: //wall2
                            ctx.drawImage(level3sprite, 0, 32, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 14: // cabinet1
                            ctx.drawImage(level3sprite, 0, 64, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 15: //cabinet2
                            ctx.drawImage(level3sprite, 0, 96, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 16: //stair1
                            ctx.drawImage(level3sprite, 192, 32, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 18: //doormat1:exit
                            ctx.drawImage(level3sprite, 32, 64, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 19: //doormat2:exit
                            ctx.drawImage(level3sprite, 64, 64, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 20: // window
                            ctx.drawImage(level3sprite, 33, 96, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 22: // door1
                            ctx.drawImage(level3sprite, 96, 64, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 23: // door2
                            ctx.drawImage(level3sprite, 128, 64, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 24: // door3
                            ctx.drawImage(level3sprite, 96, 96, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                        case 25: // door4
                            ctx.drawImage(level3sprite, 128, 96, 32, 32, mC*32, mR*32, 32, 32);
                            break;
                    }
                }

                mC = mC * 4;
                mR = mR * 4;

                //Below is exclusively for sewer level
                if (thingToDraw !== undefined)
                {
                    if (thingToDraw === floor  && l2) // If drawing the floor on level 2
                        ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (mC * 8), (mR * 8), 32, 32);
                    else
                        ctx.drawImage(thingToDraw, (mC * 8), (mR * 8));
                }

                if (xPos !== undefined && yPos !== undefined)
                {
                    if (!sewersDrained && l2)
                    {
                        ctx.fillStyle = "rgba(47, 141, 91, 0.41)";//Change to swamp colour
                        if (yPos === 0 && xPos !== 320)
                            ctx.fillRect(xPos, yPos + 24, 32, 16); //Draw over the bottom eighth of the tiles (to make water look knee level)
                        else if (yPos === 0 && xPos === 320)
                            continue;
                        else
                            ctx.fillRect(xPos, yPos, 32, 32);
                        waterRunning.play();
                    }
                    if (!lightsOn && l2)
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

function onKeyDown(e)
//Has event listeners for numbers 1 & 2 buttons
// and S & L keys for switching levels and turning
// the sewer and lights on and off respectively
{
    p.prevCol = p.col;//Set column to clear
    p.prevRow = p.row;//Set row to clear
    if (e.keyCode === 37)//Left

    {
        if (p.col > xMin[level])
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
        if (p.col < xMax[level])
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
        if (p.row > yMin[level])
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
        if (p.row < yMax[level])
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
        lightsOn = (lightSwitch % 2 === 0);
        drawMap();   //Drawing whole map because light/shade covers whole map
    }

    if (e.keyCode === 83) //S - swamp

    {
        sewerSwitch++;
        sewersDrained = (sewerSwitch % 2 === 0);
        drawMap(); //Drawing whole map because swamp covers whole map
    }

    if (e.keyCode === 32) //Space

    {
        //Character action
    }


    /* TEMP - for switching levels during testing - TEMP */
    if (e.keyCode === 49) //1
    {
        level = 1;
        l2 = l3 = l4 = l5 = l6 = false;
        l1 = true;
        ctx.clearRect(0,0,800,600);
        startGame();
        setTimeout(drawMap, 40);
    }
    if (e.keyCode === 50) //2
    {
        level = 2;
        l1 = l3 = l4 = l5 = l6 = false;
        l2 = true;
        ctx.clearRect(0,0,800,600);
        startGame();
        setTimeout(drawMap, 40);
    }
    if (e.keyCode === 51) //3
    {
        level = 3;
        l1 = l2 = l4 = l5 = l6 = false;
        l3 = true;
        ctx.clearRect(0,0,800,600);
        startGame();
        setTimeout(drawMap, 40);
    }
    if (e.keyCode === 52) //4
    {
        level = 4;
        l1 = l2 = l3 = l5 = l6 = false;
        l4 = true;
        ctx.clearRect(0,0,800,600);
        startGame();
        setTimeout(drawMap, 40);
    }
    if (e.keyCode === 53) //5
    {
        level = 5;
        l1 = l2 = l3 = l4 = l6 = false;
        l5 = true;
        ctx.clearRect(0,0,800,600);
        startGame();
        setTimeout(drawMap, 40);
    }
    if (e.keyCode === 54) //6
    {
        level = 6;
        l1 = l2 = l3 = l4 = l5 = false;
        l6 = true;
        ctx.clearRect(0,0,800,600);
        startGame();
        setTimeout(drawMap, 40);
    }
    /* TEMP - for switching levels during testing - TEMP */


    ctx.clearRect(p.prevCol * 8, p.prevRow * 8, p.width, p.height);//Clear portion of canvas the player was last on
    fillErasedMap(a, b, c, d, e, f, g, h, i, j, k, l, m, n);
    //Fills portion of the canvas the player was just taking up
    //a,b,c,d,e... are passed from movePlayer function call
    drawPMap();//Draws the new players position
    if (sewersDrained || !l2)
        waterRunning.pause();
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
    lPMap[level][startY[level]][startX[level]] = 1;   //Set the players starting position for particular level
    p.row = startY[level];
    p.col = startX[level];
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
                    if (!sewersDrained && l2)
                        ctx.drawImage(sciUndWater, p.srcX, p.srcY, p.width, p.height, destX, destY, p.width, p.height);
                    else
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

            if (!l3)//Uniform image placement switch statement
            {
                switch (lMap[level][row][col])
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
                }
            }

            if (l3)//Image placement switch statement for l3 only
            {
                switch (lMap[level][row][col])
                {
                    case 0: //floor
                        ctx.drawImage(level3sprite, 96, 0, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 1: //rack1
                        ctx.drawImage(level3sprite, 128, 0, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 2: //rack2
                        ctx.drawImage(level3sprite, 160, 0, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 3: //rack3
                        ctx.drawImage(level3sprite, 192, 0, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 4: //stand1
                        ctx.drawImage(level3sprite, 32, 0, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 5: //stand2
                        ctx.drawImage(level3sprite, 64, 0, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 6: //stand3
                        ctx.drawImage(level3sprite, 32, 32, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 7: //stand4
                        ctx.drawImage(level3sprite, 64, 32, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 8: //counter1
                        ctx.drawImage(level3sprite, 96, 32, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 9: //counter2
                        ctx.drawImage(level3sprite, 128, 32, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 10: //counter3
                        ctx.drawImage(level3sprite, 160, 32, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 11: //wall1
                        ctx.drawImage(level3sprite, 0, 0, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 12: //wall2
                        ctx.drawImage(level3sprite, 0, 32, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 14: // cabinet1
                        ctx.drawImage(level3sprite, 0, 64, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 15: //cabinet2
                        ctx.drawImage(level3sprite, 0, 96, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 16: //stair1
                        ctx.drawImage(level3sprite, 192, 32, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 18: //doormat1:exit
                        ctx.drawImage(level3sprite, 32, 64, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 19: //doormat2:exit
                        ctx.drawImage(level3sprite, 64, 64, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 20: // window
                        ctx.drawImage(level3sprite, 33, 96, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 22: // door1
                        ctx.drawImage(level3sprite, 96, 64, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 23: // door2
                        ctx.drawImage(level3sprite, 128, 64, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 24: // door3
                        ctx.drawImage(level3sprite, 96, 96, 32, 32, col*32, row*32, 32, 32);
                        break;
                    case 25: // door4
                        ctx.drawImage(level3sprite, 128, 96, 32, 32, col*32, row*32, 32, 32);
                        break;
                }
            }

            if (thingToDraw !== undefined)
            {
                if (thingToDraw === floor  && l2) // If drawing the floor on level 2
                    ctx.drawImage(thingToDraw, floorSpriteX, 0, 32, 32, (col * 32), (row * 32), 32, 32);
                else
                    ctx.drawImage(thingToDraw, (col * 32), (row * 32));
            }
            destX += 32;
        }
        destX = 0;
        destY += 32;
    }
    if (!sewersDrained && l2)
    {
        ctx.fillStyle = "rgba(47, 141, 91, 0.41)";
        ctx.fillRect(0, 24, 320, 600);
        ctx.fillRect(352, 24, 800, 600);
        ctx.fillRect(320, 32, 32, 600);
        waterRunning.play();
    }
    if (!lightsOn && l2)
    {
        ctx.fillStyle = "rgba(0, 0, 0, 1)";
        ctx.fillRect(0, 0, 800, 600);
    }
    drawPMap();
}
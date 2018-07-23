//OBJECTS & ARRAY

           //0 ,1 ,2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12
let enemy = [[],[],[],[],[],[],[],[],[],[],[],[],[]];
let doneCreating = false;

createEnemies();

function createEnemies()
{
    if (scriptsLoaded)
    {
        //Level 8
        //Can't use "i" or any other letter as it will give an error when trying to draw the map when the player moves
        for (let numOfEnemies = 0; numOfEnemies < 15; numOfEnemies++)

        {
            let ratSmallLab =
                {
                    //////////////////////////////
                    // Set these for each enemy //
                    //////////////////////////////

                    hostile: true,     //Tell the code if your enemy is hostile
                    width: 32,          //Width of each frame in the sprite sheet
                    height: 32,         //Height of each frame in the sprite sheet
                    fov: 6,             //Number of tiles that the enemy can see in direction they are facing
                    rangeOV: 3,         //Number of tiles that the enemy can see to the left or right of the direction they are facing
                    imagePath: "2Sewer/images/rat.png",      //The path to the image used for your enemy
                    numOfHFrames: 3,    //Number of horizontal frames (Should be at least 3)
                    scurrySpeed: 180,   //Length of time between each movement in milliseconds (lower the number, enemy gets quicker)
                    sightedSpeed: 60,   //Speed the enemy travels when player is in view
                    myLevel: 8,         //Sets the level array to use for positioning the enemy in for collision detection

                    /////////////////
                    // Leave these //
                    /////////////////

                    //For positioning character on screen
                    xPos: 32,//X axis position 32
                    yPos: 512,//Y axis position 512
                    mapX: undefined,//Keeps track of where the enemy is located on lOMap
                    mapY: undefined,//To prevent enemies from walking through each other
                    //Enemy state variables
                    sighted: false,//Tells enemy if they should continue walking current direction (if player is in FOV)
                    dead: true,//If this enemy has been turned on or off (this is how it's turned off when switching levels
                    destroyed: false,//If this enemy has actually been destroyed & should not come back
                    setup: false,//Ensures certain values are only set once
                    originalSpeed: undefined,//For storing enemies originally set "scurrySpeed" in order to reset after !sighter
                    //To capture last position so we know where to erase
                    prevX: undefined,
                    prevY: undefined,
                    //For resetting frame values so player isn't mid step when facing a new direction
                    rFrameSet: false,
                    lFrameSet: false,
                    uFrameSet: false,
                    dFrameSet: false,
                    indexNum: undefined,
                    //For animating walking
                    frameXCounter: 0,
                    frameX: 1,//The pose in their direction
                    frameY: 2,//Facing direction
                    //For
                    dir: undefined, //Stores direction chosen to walk
                    dirOK: true,
                    //For drawing enemies image and maps images respectively
                    img: undefined,
                    thingToDraw: undefined,
                    //Main function .. creates a secondary global function in its setup function
                    roam: function ()
                    {
                        let self = this;

                        if (!this.setup)
                        {
                            self.dead = false;
                            self.originalSpeed = self.scurrySpeed;
                            //Set image -- then start walking
                            self.thingToDraw = new Image(); //Setup an image variable to use for choosing what image to draw where
                            self.img = new Image();
                            self.img.src = self.imagePath;
                            self.drawMe = function ()//Public function
                            {
                                if (p.row * 32 + p.height < self.yPos + self.height)//If player is behind enemy.. draw player first
                                {
                                    if (notWalking)
                                    {
                                        drawPMap();
                                    }
                                    //Draw new position
                                    ctx.drawImage(self.img, self.frameX * 32, self.frameY * 32, 32, 32, self.xPos, self.yPos, 32, 32);
                                }
                                else//Otherwise draw enemy first
                                {
                                    //Draw new position
                                    ctx.drawImage(self.img, self.frameX * 32, self.frameY * 32, 32, 32, self.xPos, self.yPos, 32, 32);
                                    if (notWalking)
                                    {
                                        drawPMap();
                                    }
                                }
                            };
                            self.setup = true;
                            self.img.onload = function ()
                            {
                                walk();
                            };
                        }

                        //Walk the direction chosen if boundaries permit it
                        function walk()
                        {
                            if (!self.dead && !self.destroyed)
                            {
                                //Get random walking direction
                                self.dir = chooseDirection();

                                //Call walking function correlating to direction chosen direction -- if ok to walk this way
                                //      else choose another random direction
                                if (self.dir === "left")
                                {
                                    checkIfOk(37);//Check boundaries inputting keyCode for direction
                                }
                                else if (self.dir === "right")
                                {
                                    checkIfOk(39);
                                }
                                else if (self.dir === "up")
                                {
                                    checkIfOk(38);
                                }
                                else if (self.dir === "down")
                                {
                                    checkIfOk(40);
                                }
                            }
                        }

                        //Simple AI to choose direction to travel -- returns direction to go
                        function chooseDirection()
                        {
                            let directionChosen;

                            //Setup variables to choose direction to get with
                            let xDir, yDir, xChosen, yChosen, up, down, left, right;

                            //Initialize booleans to false
                            xChosen = yChosen = up = down = left = right = false;

                            if (self.hostile)
                                directionChosen = checkFOV();

                            if (self.sighted && directionChosen !== undefined)
                            {
                                self.scurrySpeed = self.sightedSpeed;
                                return directionChosen;
                            }
                            else
                            {
                                if (directionChosen === undefined)
                                {
                                    //To use to decide whether to travel x or y axis
                                    let xOrY = (Math.floor(Math.random()*2) + 1);

                                    //Set axis chosen to true and and initialize variable to chose which way on axis
                                    switch (xOrY)
                                    {
                                        case 1:
                                            xChosen = true;
                                            xDir = (Math.floor(Math.random()*2) + 1);
                                            break;
                                        case 2:
                                            yChosen = true;
                                            yDir = (Math.floor(Math.random()*2) + 1);
                                            break;
                                    }

                                    //Chose a direction on the axis chosen
                                    if (yChosen)
                                    {
                                        switch (yDir)//Decide if going up or down
                                        {
                                            case 1:
                                                up = true;
                                                break;
                                            case 2:
                                                down = true;
                                                break;
                                        }
                                    }
                                    else if (xChosen)
                                    {
                                        switch (xDir)//Decide if going left or right
                                        {
                                            case 1:
                                                left = true;
                                                break;
                                            case 2:
                                                right = true;
                                                break;
                                        }
                                    }

                                    //Set direction chosen to return to variable that called it
                                    if (left)
                                    {
                                        directionChosen = "left";
                                    }
                                    else if (right)
                                    {
                                        directionChosen = "right";
                                    }
                                    else if (up)
                                    {
                                        directionChosen = "up";
                                    }
                                    else if (down)
                                    {
                                        directionChosen = "down";
                                    }
                                    self.scurrySpeed = self.originalSpeed;
                                }
                                else
                                {
                                    self.scurrySpeed = 90;
                                }

                                return directionChosen;
                            }
                        }

                        //Check boundaries (ONLY lMap -- not lPMap or lOMap)
                        function checkIfOk(e)
                        {
                            //Bool value to store answer of whether rat can travel this way
                            let goodToGo = false;

                            //Calculate remainder
                            let remainX = self.xPos % 32, remainY = self.yPos % 32;

                            //Subtract remained and divide by 32
                            let xPos = ((self.xPos - remainX) / 32);
                            let yPos = ((self.yPos - remainY) / 32);


                            //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                            if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                            {
                                if (l1 || l4 || l7 || l8)
                                {
                                    goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                                }

                                else if (l2)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 3 ||
                                            lMap[level][yPos + 1][xPos - 1] === 4 ||
                                            lMap[level][yPos + 1][xPos - 1] === 5 ||
                                            lMap[level][yPos + 1][xPos - 1] === 29 ||
                                            lMap[level][yPos + 1][xPos - 1] === 30 ||
                                            (
                                                lMap[level][yPos + 1][xPos - 1] === 15 ||
                                                lMap[level][yPos + 1][xPos - 1] === 9
                                                &&
                                                doorThreeOpen
                                            )

                                        );
                                }
                                else if (l11)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 3 ||
                                            lMap[level][yPos + 1][xPos - 1] === 4 ||
                                            lMap[level][yPos + 1][xPos - 1] === 0
                                        );
                                }
                                else if (l5)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                            lMap[level][yPos + 1][xPos - 1] === 40
                                        );
                                }
                                else if (l6)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 0 ||
                                            lMap[level][yPos + 1][xPos - 1] === 4
                                        );
                                }
                                else if (l3)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 16 ||
                                            lMap[level][yPos + 1][xPos - 1] === 17 ||
                                            lMap[level][yPos + 1][xPos - 1] === 0
                                        );
                                }
                            }
                            else if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                            {
                                if (l1 || l4 || l7 || l8)
                                {
                                    goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                                }

                                else if (l2) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 3 ||
                                            lMap[level][yPos + 1][xPos + 1] === 4 ||
                                            lMap[level][yPos + 1][xPos + 1] === 5 ||
                                            lMap[level][yPos + 1][xPos + 1] === 29 ||
                                            lMap[level][yPos + 1][xPos + 1] === 30 ||
                                            (
                                                lMap[level][yPos + 1][xPos + 1] === 15 ||
                                                lMap[level][yPos + 1][xPos + 1] === 9
                                                &&
                                                doorThreeOpen
                                            )
                                        );
                                }
                                else if (l11) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 3 ||
                                            lMap[level][yPos + 1][xPos + 1] === 4 ||
                                            lMap[level][yPos + 1][xPos + 1] === 0
                                        );
                                }
                                else if (l5) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                            lMap[level][yPos + 1][xPos + 1] === 40
                                        );
                                }
                                else if (l6) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 0 ||
                                            lMap[level][yPos + 1][xPos + 1] === 4
                                        );
                                }
                                else if (l3) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 16 ||
                                            lMap[level][yPos + 1][xPos + 1] === 17 ||
                                            lMap[level][yPos + 1][xPos + 1] === 0
                                        );
                                }
                            }
                            else if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                            {
                                if (l1 || l4 || l7 || l8)
                                {
                                    goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                                }
                                else if (l2)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 3 ||
                                            lMap[level][yPos][xPos] === 4 ||
                                            lMap[level][yPos][xPos] === 5 ||
                                            lMap[level][yPos][xPos] === 29 ||
                                            lMap[level][yPos][xPos] === 30 ||
                                            (
                                                lMap[level][yPos][xPos] === 15 ||
                                                lMap[level][yPos][xPos] === 9
                                                &&
                                                doorThreeOpen
                                            )
                                        );
                                }
                                else if (l11)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 3 ||
                                            lMap[level][yPos][xPos] === 4 ||
                                            lMap[level][yPos][xPos] === 0
                                        );
                                }
                                else if (l5)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === floorNumbers[level] ||
                                            lMap[level][yPos][xPos] === 40
                                        );
                                }
                                else if (l6)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 0 ||
                                            lMap[level][yPos][xPos] === 4
                                        );
                                }
                                else if (l3)
                                {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 16 ||
                                            lMap[level][yPos][xPos] === 17 ||
                                            lMap[level][yPos][xPos] === 0
                                        );
                                }
                            }
                            else if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                            {
                                if (l1 || l4 || l7 || l8) {
                                    goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                                }
                                else if (l2) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 3 ||
                                            lMap[level][yPos + 2][xPos] === 4 ||
                                            lMap[level][yPos + 2][xPos] === 5 ||
                                            lMap[level][yPos + 2][xPos] === 29 ||
                                            lMap[level][yPos + 2][xPos] === 30 ||
                                            (
                                                lMap[level][yPos + 2][xPos] === 15 ||
                                                lMap[level][yPos + 2][xPos] === 9
                                                &&
                                                doorThreeOpen
                                            )
                                        );
                                }
                                else if (l11) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 3 ||
                                            lMap[level][yPos + 2][xPos] === 4 ||
                                            lMap[level][yPos + 2][xPos] === 0
                                        );
                                }
                                else if (l5) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                            lMap[level][yPos + 2][xPos] === 40
                                        );
                                }
                                else if (l6) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 0 ||
                                            lMap[level][yPos + 2][xPos] === 4
                                        );
                                }
                                else if (l3) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 16 ||
                                            lMap[level][yPos + 2][xPos] === 17 ||
                                            lMap[level][yPos + 2][xPos] === 0
                                        );
                                }
                            }

                            //If no other enemies in the slot this enemy is trying to move to...
                            if (goodToGo)
                            {
                                //Check level objects map for other enemies in this slot
                                if (e === 37 && lOMap[self.myLevel][yPos] !== undefined && lOMap[self.myLevel][yPos][xPos - 1] !== undefined)//Left
                                {
                                    if (lOMap[self.myLevel][yPos][xPos - 1] === 0)
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = self.yPos  % 32, remainX = (self.xPos - 8) % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos - remainY)/32][((self.xPos - 8) - remainX)/32] = 1;
                                        self.mapX = ((self.xPos - 8) - remainX)/32;
                                        self.mapY = (self.yPos - remainY)/32;

                                        goodToGo = true;
                                    }

                                }
                                else if (e === 39 && lOMap[self.myLevel][yPos] !== undefined && lOMap[self.myLevel][yPos][xPos + 1] !== undefined)//Right
                                {
                                    if (lOMap[self.myLevel][yPos][xPos + 1] === 0)
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = self.yPos  % 32, remainX = (self.xPos + 8) % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos - remainY)/32][((self.xPos + 8) - remainX)/32] = 1;
                                        self.mapX = ((self.xPos + 8) - remainX)/32;
                                        self.mapY = (self.yPos - remainY)/32;

                                        goodToGo = true;
                                    }
                                }
                                else if (e === 38 && lOMap[self.myLevel][yPos - 1] !== undefined && lOMap[self.myLevel][yPos - 1][xPos] !== undefined)//Up
                                {
                                    if (lOMap[self.myLevel][yPos - 1][xPos] === 0)
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = (self.yPos - 8) % 32, remainX = self.xPos % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos - 8 - remainY)/32][(self.xPos - remainX)/32] = 1;
                                        self.mapX = (self.xPos - remainX)/32;
                                        self.mapY = (self.yPos - 8 - remainY)/32;

                                        //Then say its good to go
                                        goodToGo = true;
                                    }
                                }
                                else if (e === 40 && lOMap[self.myLevel][yPos + 1] !== undefined && lOMap[self.myLevel][yPos + 1][xPos] !== undefined)//Down
                                {

                                    if ((lOMap[self.myLevel][yPos + 1][xPos] === 0))
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = (self.yPos + 8) % 32, remainX = self.xPos % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos + 8 - remainY)/32][(self.xPos - remainX)/32] = 1;
                                        self.mapX = (self.xPos - remainX)/32;
                                        self.mapY = (self.yPos + 8 - remainY)/32;

                                        //Then say its good to go
                                        goodToGo = true;
                                    }
                                }
                            }

                            //Return the answer
                            self.dirOk = goodToGo;


                            if (self.dirOk)
                            {
                                if (e === 37)//Left
                                {
                                    if (self.xPos - 8 > 0)
                                    {
                                        walkLeft();
                                    }
                                    else
                                        setTimeout(walk, self.scurrySpeed);
                                }
                                else if (e === 39)//Right
                                {
                                    if (self.xPos + 8 + self.width < 800)
                                    {
                                        walkRight();
                                    }
                                    else
                                        setTimeout(walk, self.scurrySpeed);
                                }
                                else if (e === 38)//Up
                                {
                                    if (self.yPos - 8 > 0) {
                                        walkUp();
                                    }
                                    else
                                        setTimeout(walk, self.scurrySpeed);
                                }
                                else if (e === 40)//Down
                                {
                                    if (self.yPos + 8 + self.height < 600) {
                                        walkDown();
                                    }
                                    else
                                        setTimeout(walk, self.scurrySpeed);
                                }
                                else
                                    setTimeout(walk, self.scurrySpeed);
                            }
                            else
                            {
                                setTimeout(walk, self.scurrySpeed);
                            }
                        }

                        function checkIfOk2(e)//Is a non void function
                        {
                            //Bool value to store answer of whether rat can travel this way
                            let goodToGo = false;

                            //Calculate remainder
                            let remainX = self.xPos % 32, remainY = self.yPos % 32;

                            //Subtract remained and divide by 32
                            let xPos = ((self.xPos - remainX) / 32);
                            let yPos = ((self.yPos - remainY) / 32);

                            //Check level map (Not level player map or level object map) for boundaries to see if ok to go this way
                            if (e === 37 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos - 1] !== undefined)//Left
                            {
                                if (l1 || l4 || l7 || l8) {
                                    goodToGo = (lMap[level][yPos + 1][xPos - 1] === floorNumbers[level]);
                                }

                                else if (l2) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 3 ||
                                            lMap[level][yPos + 1][xPos - 1] === 4 ||
                                            lMap[level][yPos + 1][xPos - 1] === 5 ||
                                            lMap[level][yPos + 1][xPos - 1] === 29 ||
                                            lMap[level][yPos + 1][xPos - 1] === 30 ||
                                            (
                                                lMap[level][yPos + 1][xPos - 1] === 15 ||
                                                lMap[level][yPos + 1][xPos - 1] === 9
                                                &&
                                                doorThreeOpen
                                            )

                                        );
                                }
                                else if (l11) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 3 ||
                                            lMap[level][yPos + 1][xPos - 1] === 4 ||
                                            lMap[level][yPos + 1][xPos - 1] === 0
                                        );
                                }
                                else if (l5) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === floorNumbers[level] ||
                                            lMap[level][yPos + 1][xPos - 1] === 40
                                        );
                                }
                                else if (l6) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 0 ||
                                            lMap[level][yPos + 1][xPos - 1] === 4
                                        );
                                }
                                else if (l3) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos - 1] === 16 ||
                                            lMap[level][yPos + 1][xPos - 1] === 17 ||
                                            lMap[level][yPos + 1][xPos - 1] === 0
                                        );
                                }
                            }
                            if (e === 39 && lMap[level][yPos + 1] !== undefined && lMap[level][yPos + 1][xPos + 1] !== undefined)//Right
                            {
                                if (l1 || l4 || l7 || l8) {
                                    goodToGo = (lMap[level][yPos + 1][xPos + 1] === floorNumbers[level]);
                                }

                                else if (l2) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 3 ||
                                            lMap[level][yPos + 1][xPos + 1] === 4 ||
                                            lMap[level][yPos + 1][xPos + 1] === 5 ||
                                            lMap[level][yPos + 1][xPos + 1] === 29 ||
                                            lMap[level][yPos + 1][xPos + 1] === 30 ||
                                            (
                                                lMap[level][yPos + 1][xPos + 1] === 15 ||
                                                lMap[level][yPos + 1][xPos + 1] === 9
                                                &&
                                                doorThreeOpen
                                            )
                                        );
                                }
                                else if (l11) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 3 ||
                                            lMap[level][yPos + 1][xPos + 1] === 4 ||
                                            lMap[level][yPos + 1][xPos + 1] === 0
                                        );
                                }
                                else if (l5) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === floorNumbers[level] ||
                                            lMap[level][yPos + 1][xPos + 1] === 40
                                        );
                                }
                                else if (l6) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 0 ||
                                            lMap[level][yPos + 1][xPos + 1] === 4
                                        );
                                }
                                else if (l3) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 1][xPos + 1] === 16 ||
                                            lMap[level][yPos + 1][xPos + 1] === 17 ||
                                            lMap[level][yPos + 1][xPos + 1] === 0
                                        );
                                }
                            }
                            if (e === 38 && lMap[level][yPos] !== undefined && lMap[level][yPos][xPos] !== undefined)//Up
                            {
                                if (l1 || l4 || l7 || l8) {
                                    goodToGo = (lMap[level][yPos][xPos] === floorNumbers[level]);
                                }
                                else if (l2) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 3 ||
                                            lMap[level][yPos][xPos] === 4 ||
                                            lMap[level][yPos][xPos] === 5 ||
                                            lMap[level][yPos][xPos] === 29 ||
                                            lMap[level][yPos][xPos] === 30 ||
                                            (
                                                lMap[level][yPos][xPos] === 15 ||
                                                lMap[level][yPos][xPos] === 9
                                                &&
                                                doorThreeOpen
                                            )
                                        );
                                }
                                else if (l11) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 3 ||
                                            lMap[level][yPos][xPos] === 4 ||
                                            lMap[level][yPos][xPos] === 0
                                        );
                                }
                                else if (l5) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === floorNumbers[level] ||
                                            lMap[level][yPos][xPos] === 40
                                        );
                                }
                                else if (l6) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 0 ||
                                            lMap[level][yPos][xPos] === 4
                                        );
                                }
                                else if (l3) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos][xPos] === 16 ||
                                            lMap[level][yPos][xPos] === 17 ||
                                            lMap[level][yPos][xPos] === 0
                                        );
                                }
                            }
                            if (e === 40 && lMap[level][yPos + 2] !== undefined && lMap[level][yPos + 2][xPos] !== undefined)//Down
                            {
                                if (l1 || l4 || l7 || l8) {
                                    goodToGo = (lMap[level][yPos + 2][xPos] === floorNumbers[level]);
                                }
                                else if (l2) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 3 ||
                                            lMap[level][yPos + 2][xPos] === 4 ||
                                            lMap[level][yPos + 2][xPos] === 5 ||
                                            lMap[level][yPos + 2][xPos] === 29 ||
                                            lMap[level][yPos + 2][xPos] === 30 ||
                                            (
                                                lMap[level][yPos + 2][xPos] === 15 ||
                                                lMap[level][yPos + 2][xPos] === 9
                                                &&
                                                doorThreeOpen
                                            )
                                        );
                                }
                                else if (l11) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 3 ||
                                            lMap[level][yPos + 2][xPos] === 4 ||
                                            lMap[level][yPos + 2][xPos] === 0
                                        );
                                }
                                else if (l5) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === floorNumbers[level] ||
                                            lMap[level][yPos + 2][xPos] === 40
                                        );
                                }
                                else if (l6) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 0 ||
                                            lMap[level][yPos + 2][xPos] === 4
                                        );
                                }
                                else if (l3) {
                                    goodToGo =
                                        (
                                            lMap[level][yPos + 2][xPos] === 16 ||
                                            lMap[level][yPos + 2][xPos] === 17 ||
                                            lMap[level][yPos + 2][xPos] === 0
                                        );
                                }
                            }

                            //If no other enemies in the slot this enemy is trying to move to...
                            if (goodToGo)
                            {
                                //Check level objects map for other enemies in this slot
                                if (e === 37 && lOMap[self.myLevel][yPos] !== undefined && lOMap[self.myLevel][yPos][xPos - 1] !== undefined)//Left
                                {
                                    if (lOMap[self.myLevel][yPos][xPos - 1] === 0)
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = self.yPos  % 32, remainX = (self.xPos - 8) % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos - remainY)/32][((self.xPos - 8) - remainX)/32] = 1;
                                        self.mapX = ((self.xPos - 8) - remainX)/32;
                                        self.mapY = (self.yPos - remainY)/32;

                                        goodToGo = true;
                                    }

                                }
                                else if (e === 39 && lOMap[self.myLevel][yPos] !== undefined && lOMap[self.myLevel][yPos][xPos + 1] !== undefined)//Right
                                {
                                    if (lOMap[self.myLevel][yPos][xPos + 1] === 0)
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = self.yPos  % 32, remainX = (self.xPos + 8) % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos - remainY)/32][((self.xPos + 8) - remainX)/32] = 1;
                                        self.mapX = ((self.xPos + 8) - remainX)/32;
                                        self.mapY = (self.yPos - remainY)/32;

                                        goodToGo = true;
                                    }
                                }
                                else if (e === 38 && lOMap[self.myLevel][yPos - 1] !== undefined && lOMap[self.myLevel][yPos - 1][xPos] !== undefined)//Up
                                {
                                    if (lOMap[self.myLevel][yPos - 1][xPos] === 0)
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = (self.yPos - 8) % 32, remainX = self.xPos % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos - 8 - remainY)/32][(self.xPos - remainX)/32] = 1;
                                        self.mapX = (self.xPos - remainX)/32;
                                        self.mapY = (self.yPos - 8 - remainY)/32;

                                        //Then say its good to go
                                        goodToGo = true;
                                    }
                                }
                                else if (e === 40 && lOMap[self.myLevel][yPos + 1] !== undefined && lOMap[self.myLevel][yPos + 1][xPos] !== undefined)//Down
                                {

                                    if ((lOMap[self.myLevel][yPos + 1][xPos] === 0))
                                    {
                                        //Set what will be the new position right away
                                        //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                        let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                        //Set remainder to be used to floor x and y positions to a multiple of 32
                                        let remainY = (self.yPos + 8) % 32, remainX = self.xPos % 32;
                                        lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                        //Use the remainder to make it equal to that multiple and set its map position using that
                                        lOMap[self.myLevel][(self.yPos + 8 - remainY)/32][(self.xPos - remainX)/32] = 1;
                                        self.mapX = (self.xPos - remainX)/32;
                                        self.mapY = (self.yPos + 8 - remainY)/32;

                                        //Then say its good to go
                                        goodToGo = true;
                                    }
                                }
                            }

                            self.dirOK = goodToGo;

                            if (self.dirOk)
                            {
                                //Check return whether enemy is at the edge of the canvas
                                return  (e === 37 && self.xPos - 8 > 0) ||
                                (e === 39 && self.xPos + 8 + self.width < 800) ||
                                (e === 38 && self.yPos - 8 > 0) ||
                                (e === 40 && self.yPos + 8 + self.height < 600);
                            }
                            else
                                return false
                        }

                        function checkIfHit()
                        {
                            if (self.xPos/*leftSide*/ < ((p.col * 32/*leftSide*/) + 32/*width*/) && (self.xPos + 32) > (p.col * 32))
                            {
                                if (self.yPos/*top*/ < ((p.row * 32/*top*/) + 48/*height*/) && (self.yPos + 32) > (p.row * 32))
                                {
                                    p.health--;
                                    aghh.play();
                                    if (p.health === 0)
                                    {
                                        self.dead = true;
                                        ctx.fillStyle = '#ff0c18';
                                        ctx.fillRect(0,0,800,600);
                                        resetLevel(self.scurrySpeed);
                                    }
                                }
                            }
                        }

                        function checkFOV()
                        {
                            if (self.frameY === 0)//Looking down
                            {
                                //Check if in field of view
                                if (p.row * 32/*topOfPlayer*/ > (self.yPos + self.height/*bottomOfEnemy*/) && p.row * 32/*top*/ <= (self.yPos + self.height/*bottomOfEnemy*/ + self.fov * 32))
                                {
                                    return checkRange("Down");
                                }
                                else if (p.row * 32/*topOfPlayer*/ === (self.yPos + self.height/*bottomOfEnemy*/))
                                {
                                    return checkWhereToTurn("Down");
                                }
                            }
                            else if (self.frameY === 1)//Looking left
                            {
                                //Check if in field of view
                                if ((p.col * 32 + 32/*rightSideOfPlayer*/) < self.xPos && (p.col * 32 + 32/*rightSideOfPlayer*/) >= (self.xPos - self.fov * 32))
                                {
                                    return checkRange("Left");
                                }
                                else if ((p.col * 32 + p.width/*rightSideOfPlayer*/) === self.xPos)
                                {
                                    return checkWhereToTurn("Left");
                                }
                            }
                            else if (self.frameY === 2)//Looking right
                            {
                                //Check if in field of view
                                if ((p.col * 32 /*leftSideOfPlayer*/) > (self.xPos + self.width) && p.col * 32 /*leftSideOfPlayer*/ <= (self.xPos + self.width + self.fov * 32))
                                {
                                    return checkRange("Right");
                                }
                                else if ((p.col * 32 /*leftSideOfPlayer*/) === (self.xPos + self.width))
                                {
                                    return checkWhereToTurn("Right");
                                }
                            }
                            else if (self.frameY === 3)//Looking up
                            {
                                //Check if in field of view
                                if ((p.row * 32 + 48/*bottomOfPlayer*/) < (self.yPos/*topOfEnemy*/) && (p.row * 32 + 48/*bottomOfPlayer*/) >= (self.yPos/*topOfEnemy*/ - self.fov  * 32))
                                {
                                    return checkRange("Up");
                                }
                                else if ((p.row * 32 + 48/*bottomOfPlayer*/) === (self.yPos/*topOfEnemy*/))
                                {
                                    return checkWhereToTurn("Up");
                                }
                            }
                            else return undefined;

                            function checkRange(facing)
                            {
                                if (facing === "Down")
                                {

                                    if ((p.col * 32) > self.xPos - self.rangeOV * 32 && (p.col * 32 + 32) < self.xPos + self.width + self.rangeOV * 32)
                                    {
                                        self.sighted = true;
                                        return "down";
                                    }
                                }
                                else if (facing === "Left")
                                {
                                    if ((p.row * 32 + 48) > self.yPos - self.rangeOV * 32 && (p.row * 32) < self.yPos + self.height + self.rangeOV * 32)
                                    {
                                        self.sighted = true;
                                        return "left";
                                    }
                                }
                                else if (facing === "Right")
                                {
                                    if ((p.row * 32 + 48) > self.yPos - self.rangeOV * 32 && (p.row * 32) < self.yPos + self.height + self.rangeOV * 32)
                                    {
                                        self.sighted = true;
                                        return "right";
                                    }
                                }
                                else if (facing === "Up")
                                {
                                    if ((p.col * 32) > self.xPos - self.rangeOV * 32 && (p.col * 32 + 32) < self.xPos + self.width + self.rangeOV * 32)
                                    {
                                        self.sighted = true;
                                        return "up";
                                    }
                                }
                                else return undefined;
                            }
                            function checkWhereToTurn(currentlyChosenDir)
                            {
                                if (currentlyChosenDir === "Left" || currentlyChosenDir === "Right")
                                {
                                    //If enemy's above the player
                                    if (self.yPos + self.height < (p.row + 1) * 32)
                                    {
                                        self.sighted = true;
                                        return "down";
                                    }
                                    //If enemy's below the player
                                    else if (self.yPos > (p.row + 1) * 32 + 32)
                                    {
                                        self.sighted = true;
                                        return "up";
                                    }
                                    //If enemy is on the character
                                    else
                                    {
                                        return undefined;
                                    }

                                }
                                else if (currentlyChosenDir === "Up" || currentlyChosenDir === "Down")
                                {
                                    //If enemy's to the left of the player
                                    if (self.xPos + self.width < p.col * 32)
                                    {
                                        self.sighted = true;
                                        return "right";
                                    }
                                    //If enemy's to the right of the player
                                    else if (self.xPos > p.col * 32 + p.width)
                                    {
                                        self.sighted = true;
                                        return "left";
                                    }
                                    //If enemy is on the character
                                    else
                                    {
                                        return undefined;
                                    }
                                }
                            }
                        }

                        //Simple walking one direction functions
                        function walkLeft()
                        {
                            //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                            let numOfStepsLeft = (Math.floor(Math.random() * 4) + 1);

                            //Reset walking position so that rat is not mid step when changing direction
                            // && Reset other walking directions set values so that each change of dir does this
                            if (!self.lFrameSet)
                            {
                                self.frameXCounter = 0;
                                self.frameX = 0;
                                self.frameY = 1;//Facing left
                                self.rFrameSet = false;
                                self.uFrameSet = false;
                                self.dFrameSet = false;
                                self.lFrameSet = true;
                            }

                            let stepsLeft = 0;
                            moveLeft();

                            //Move character by 1/4 of a tile for however many random steps selected
                            function moveLeft()
                            {
                                stepsLeft++;
                                //Set position to be erased
                                setLastPos();

                                //Simulate walking by changing frames
                                self.frameXCounter++;
                                self.frameX = (self.frameXCounter % self.numOfHFrames);

                                //Change position
                                self.xPos -= 8;

                                //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                //Set remainder to be used to floor x and y positions to a multiple of 32
                                let remainY = self.yPos % 32, remainX = self.xPos % 32;

                                /*if (self.mapX !== (self.xPos - remainX)/32 || self.mapY !== (self.yPos - remainY)/32 )
                                {
                                    lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                    //Use the remainder to make it equal to that multiple and set its map position using that
                                    lOMap[self.myLevel][(self.yPos - remainY)/32][(self.xPos - remainX)/32] = 1;
                                    self.mapX = (self.xPos - remainX)/32;
                                    self.mapY = (self.yPos - remainY)/32;
                                }*/

                                lOMap[self.myLevel][(self.yPos - remainY)/32][(self.xPos - remainX)/32] = 1;
                                lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                //Use the remainder to make it equal to that multiple and set its map position using that
                                self.mapX = (self.xPos - remainX)/32;
                                self.mapY = (self.yPos - remainY)/32;

                                //Draw new position
                                drawIt();
                                if (stepsLeft < numOfStepsLeft - 1)
                                {
                                    if (checkIfOk2(37))
                                    {
                                        setTimeout(moveLeft, self.scurrySpeed);
                                    }
                                    else//Start again
                                        setTimeout(walk, self.scurrySpeed);
                                }

                                else
                                //Start again
                                    setTimeout(walk, self.scurrySpeed);

                            }
                        }

                        function walkRight()
                        {
                            //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                            let numOfStepsRight = (Math.floor(Math.random() * 4) + 1);

                            //Reset walking position so that rat is not mid step when changing direction
                            // && Reset other walking directions set values so that each change of dir does this
                            if (!self.rFrameSet) {
                                self.frameXCounter = 0;
                                self.frameX = 0;
                                self.frameY = 2;//Facing right
                                self.lFrameSet = false;
                                self.uFrameSet = false;
                                self.dFrameSet = false;
                                self.rFrameSet = true;
                            }

                            let stepsRight = 0;
                            moveRight();

                            //Move character by 1/4 of a tile for however many random steps selected
                            function moveRight() {
                                stepsRight++;
                                //Set position to be erased
                                setLastPos();

                                //Simulate walking by changing frames
                                self.frameXCounter++;
                                self.frameX = (self.frameXCounter % self.numOfHFrames);

                                //Change position
                                self.xPos += 8;

                                //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                //Set remainder to be used to floor x and y positions to a multiple of 32
                                let remainY = self.yPos % 32, remainX = self.xPos % 32;

                                /*if (self.mapX !== (self.xPos - remainX)/32 || self.mapY !== (self.yPos - remainY)/32 )
                                {
                                    lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                    //Use the remainder to make it equal to that multiple and set its map position using that
                                    lOMap[self.myLevel][(self.yPos - remainY)/32][(self.xPos - remainX)/32] = 1;
                                    self.mapX = (self.xPos - remainX)/32;
                                    self.mapY = (self.yPos - remainY)/32;
                                }*/

                                lOMap[self.myLevel][(self.yPos - remainY)/32][(self.xPos - remainX)/32] = 1;
                                lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                //Use the remainder to make it equal to that multiple and set its map position using that
                                self.mapX = (self.xPos - remainX)/32;
                                self.mapY = (self.yPos - remainY)/32;

                                //Draw new position
                                drawIt();
                                if (stepsRight < numOfStepsRight - 1)
                                {
                                    if (checkIfOk2(39))
                                    {
                                        setTimeout(moveRight, self.scurrySpeed);
                                    }
                                    else//Start again
                                        setTimeout(walk, self.scurrySpeed);
                                }
                                else
                                //Start again
                                    setTimeout(walk, self.scurrySpeed);

                            }
                        }

                        function walkDown()
                        {
                            //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                            let numOfStepsDown = (Math.floor(Math.random() * 4) + 1);

                            //Reset walking position so that rat is not mid step when changing direction
                            // && Reset other walking directions set values so that each change of dir does this
                            if (!self.dFrameSet) {
                                self.frameXCounter = 0;
                                self.frameX = 0;
                                self.frameY = 0;//Facing down
                                self.lFrameSet = false;
                                self.rFrameSet = false;
                                self.uFrameSet = false;
                                self.dFrameSet = true;
                            }

                            let stepsDown = 0;
                            moveDown();

                            //Move character by 1/4 of a tile for however many random steps selected
                            function moveDown() {
                                stepsDown++;
                                //Set position to be erased
                                setLastPos();


                                //Simulate walking by changing frames
                                self.frameXCounter++;
                                self.frameX = (self.frameXCounter % self.numOfHFrames);

                                //Change position
                                self.yPos += 8;

                                //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                //Set remainder to be used to floor x and y positions to a multiple of 32
                                let remainY = self.yPos % 32, remainX = self.xPos % 32;

                                /*if (self.mapX !== (self.xPos - remainX)/32 || self.mapY !== (self.yPos - remainY)/32 )
                                {
                                    lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                    //Use the remainder to make it equal to that multiple and set its map position using that
                                    lOMap[self.myLevel][(self.yPos - remainY)/32][(self.xPos - remainX)/32] = 1;
                                    self.mapX = (self.xPos - remainX)/32;
                                    self.mapY = (self.yPos - remainY)/32;
                                }*/

                                lOMap[self.myLevel][(self.yPos - remainY)/32][(self.xPos - remainX)/32] = 1;
                                lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                //Use the remainder to make it equal to that multiple and set its map position using that
                                self.mapX = (self.xPos - remainX)/32;
                                self.mapY = (self.yPos - remainY)/32;

                                //Draw new position
                                drawIt();
                                if (stepsDown < numOfStepsDown - 1)
                                {
                                    if (checkIfOk2(40))
                                    {
                                        setTimeout(moveDown, self.scurrySpeed);
                                    }
                                    else//Start again
                                        setTimeout(walk, self.scurrySpeed);
                                }
                                else
                                //Start again
                                    setTimeout(walk, self.scurrySpeed);

                            }
                        }

                        function walkUp()
                        {
                            //Enemy can go at least up to four steps since the next boundary is 4 * 8px(space take each step) away
                            let numOfStepsUp = (Math.floor(Math.random() * 4) + 1);

                            //Reset walking position so that rat is not mid step when changing direction
                            // && Reset other walking directions set values so that each change of dir does this
                            if (!self.uFrameSet) {
                                self.frameXCounter = 0;
                                self.frameX = 0;
                                self.frameY = 3;//Facing Up
                                self.lFrameSet = false;
                                self.rFrameSet = false;
                                self.dFrameSet = false;
                                self.uFrameSet = true;
                            }

                            let stepsUp = 0;
                            moveUp();

                            //Move character by 1/4 of a tile for however many random steps selected
                            function moveUp() {
                                stepsUp++;
                                //Set position to be erased
                                setLastPos();

                                //Simulate walking by changing frames
                                self.frameXCounter++;
                                self.frameX = (self.frameXCounter % self.numOfHFrames);

                                //Change position
                                self.yPos -= 8;

                                //Set remainder to be used to floor prevX and prevY positions to a multiple of 32
                                let pRemainY = self.prevY % 32, pRemainX = self.prevX % 32;
                                //Set remainder to be used to floor x and y positions to a multiple of 32
                                let remainY = self.yPos % 32, remainX = self.xPos % 32;

                                if (self.mapX !== (self.xPos - remainX)/32 || self.mapY !== (self.yPos - remainY)/32 )
                                {
                                    lOMap[self.myLevel][(self.prevY - pRemainY)/32][(self.prevX - pRemainX)/32] = 0;
                                    //Use the remainder to make it equal to that multiple and set its map position using that
                                    lOMap[self.myLevel][(self.yPos - remainY)/32][(self.xPos - remainX)/32] = 1;
                                    self.mapX = (self.xPos - remainX)/32;
                                    self.mapY = (self.yPos - remainY)/32;
                                }


                                //Draw new position
                                drawIt();
                                if (stepsUp < numOfStepsUp - 1)
                                {
                                    if (checkIfOk2(38))
                                    {
                                        setTimeout(moveUp, self.scurrySpeed);
                                    }
                                    else//Start again
                                        setTimeout(walk, self.scurrySpeed);
                                }
                                else
                                //Start again
                                    setTimeout(walk, self.scurrySpeed);
                            }
                        }

                        //Set last position for erasing map
                        function setLastPos()
                        {
                            self.prevX = self.xPos;
                            self.prevY = self.yPos;
                        }

                        //Drawing rat in new position -- called by walkLeft, walkRight .... functions (then call walk function to start over)
                        function drawIt()                           //May have to change up the drawImage command (self.img to something else)
                        {
                            ctx.clearRect(self.prevX, self.prevY, 32, 32);

                            let remainX = (self.xPos % 32), remainY = (self.yPos % 32);

                            for (let mR = ((self.yPos - remainY) / 32) - 2; mR < ((self.yPos - remainY) / 32) + 4; mR++) //Run through all that would have been erased
                            {
                                for (let mC = ((self.xPos - remainX) / 32) - 2; mC < ((self.xPos - remainX) / 32) + 3; mC++)//Run through all columns that would have been erased
                                {

                                    if (lMap[level][mR] !== undefined && lMap[level][mR][mC] !== undefined)//If the space being examined exists
                                    {
                                        switch (lMap[level][mR][mC])//check what needs drawing based on levels map index
                                        {
                                            case 0:
                                                self.thingToDraw = a;
                                                break;
                                            case 1:
                                                self.thingToDraw = b;
                                                break;
                                            case 2:
                                                self.thingToDraw = c;
                                                break;
                                            case 3:
                                                floorSpriteX = 32;
                                                self.thingToDraw = d;
                                                break;
                                            case 4:
                                                floorSpriteX = 64;
                                                self.thingToDraw = e;
                                                break;
                                            case 5:
                                                floorSpriteX = 96;
                                                self.thingToDraw = f;
                                                break;
                                            case 6:
                                                self.thingToDraw = g;
                                                break;
                                            case 7:
                                                if (l2 && !sewersDrained)
                                                    self.thingToDraw = wetPipe;
                                                else
                                                    self.thingToDraw = h;
                                                break;
                                            case 8:
                                                self.thingToDraw = i;
                                                break;
                                            case 9:
                                                self.thingToDraw = j;
                                                break;
                                            case 10:
                                                self.thingToDraw = k;
                                                break;
                                            case 11:
                                                self.thingToDraw = l;
                                                break;
                                            case 12:
                                                self.thingToDraw = m;
                                                break;
                                            case 13:
                                                self.thingToDraw = n;
                                                break;
                                            case 14:
                                                self.thingToDraw = o;
                                                break;
                                            case 15:
                                                self.thingToDraw = q;
                                                break;
                                            case 16:
                                                self.thingToDraw = r;
                                                break;
                                            case 17:
                                                self.thingToDraw = s;
                                                break;
                                            case 18:
                                                self.thingToDraw = t;
                                                break;
                                            case 19:
                                                self.thingToDraw = u;
                                                break;
                                            case 20:
                                                self.thingToDraw = v;
                                                break;
                                            case 21:
                                                self.thingToDraw = w;
                                                break;
                                            case 22:
                                                self.thingToDraw = x;
                                                break;
                                            case 23:
                                                self.thingToDraw = y;
                                                break;
                                            case 24:
                                                self.thingToDraw = z;
                                                break;
                                            case 25:
                                                self.thingToDraw = aa;
                                                break;
                                            case 26:
                                                self.thingToDraw = bb;
                                                break;
                                            case 27:
                                                self.thingToDraw = cc;
                                                break;
                                            case 28:
                                                self.thingToDraw = dd;
                                                break;
                                            case 29:
                                                self.thingToDraw = ee;
                                                break;
                                            case 30:
                                                self.thingToDraw = ff;
                                                break;
                                            case 31:
                                                self.thingToDraw = gg;
                                                break;
                                            case 32:
                                                self.thingToDraw = hh;
                                                break;
                                            case 33:
                                                self.thingToDraw = ii;
                                                break;
                                            case 34:
                                                self.thingToDraw = jj;
                                                break;
                                            case 35:
                                                self.thingToDraw = kk;
                                                break;
                                            case 36:
                                                self.thingToDraw = ll;
                                                break;
                                            case 37:
                                                self.thingToDraw = mm;
                                                break;
                                            case 38:
                                                self.thingToDraw = nn;
                                                break;
                                            case 39:
                                                self.thingToDraw = oo;
                                                break;
                                            case 40:
                                                self.thingToDraw = qq;
                                                break;
                                            case 41:
                                                self.thingToDraw = rr;
                                                break;
                                            case 42:
                                                self.thingToDraw = ss;
                                                break;
                                            case 43:
                                                self.thingToDraw = tt;
                                                break;
                                            case 44:
                                                self.thingToDraw = uu;
                                                break;
                                            case 45:
                                                self.thingToDraw = vv;
                                                break;
                                            case 46:
                                                self.thingToDraw = ww;
                                                break;
                                            case 47:
                                                self.thingToDraw = xx;
                                                break;
                                            case 48:
                                                self.thingToDraw = yy;
                                                break;
                                            case 49:
                                                self.thingToDraw = zz;
                                                break;
                                            case 50:
                                                self.thingToDraw = aaa;
                                                break;
                                            case 51:
                                                self.thingToDraw = bbb;
                                                break;
                                            case 52:
                                                self.thingToDraw = ccc;
                                                break;
                                            case 53:
                                                self.thingToDraw = ddd;
                                                break;
                                            case 54:
                                                self.thingToDraw = eee;
                                                break;
                                            case 55:
                                                self.thingToDraw = fff;
                                                break;
                                            case 56:
                                                self.thingToDraw = ggg;
                                                break;
                                            case 57:
                                                self.thingToDraw = hhh;
                                                break;
                                            case 58:
                                                self.thingToDraw = iii;
                                                break;
                                            case 59:
                                                self.thingToDraw = jjj;
                                                break;
                                            case 60:
                                                self.thingToDraw = kkk;
                                                break;
                                            case 61:
                                                self.thingToDraw = lll;
                                                break;
                                            case 62:
                                                self.thingToDraw = mmm;
                                                break;
                                            case 63:
                                                self.thingToDraw = nnn;
                                                break;
                                            case 64:
                                                self.thingToDraw = ooo;
                                                break;
                                            case 65:
                                                self.thingToDraw = qqq;
                                                break;
                                            case 66:
                                                self.thingToDraw = rrr;
                                                break;
                                            case 67:
                                                self.thingToDraw = sss;
                                                break;
                                            case 68:
                                                self.thingToDraw = ttt;
                                                break;
                                            case 69:
                                                self.thingToDraw = uuu;
                                                break;
                                            case 70:
                                                self.thingToDraw = vvv;
                                                break;
                                            case 71:
                                                self.thingToDraw = www;
                                                break;
                                            case 72:
                                                self.thingToDraw = xxx;
                                                break;
                                            case 73:
                                                self.thingToDraw = yyy;
                                                break;
                                            case 74:
                                                self.thingToDraw = zzz;
                                                break;
                                        }

                                        if (self.thingToDraw !== undefined)//If there is something to be drawn in area being examined
                                        {
                                            if (self.thingToDraw === sewerFloor && (l2 || l11))
                                            // If drawing the floor on level 2
                                            // then draw it based on floorSpriteX var positioning
                                                ctx.drawImage(self.thingToDraw, floorSpriteX, 0, 32, 32, (mC * 32), (mR * 32), 32, 32);
                                            else
                                            //Otherwise draw regularly
                                                ctx.drawImage(self.thingToDraw, (mC * 32), (mR * 32));
                                        }
                                    }
                                }
                            }



                            //Draw player over map and mouse
                            if (p.row * 32 + p.height < self.yPos + self.height)//If player is behind enemy.. draw player first
                            {
                                if (notWalking)
                                {
                                    drawPMap();
                                }
                                //Draw new position
                                ctx.drawImage(self.img, self.frameX * 32, self.frameY * 32, 32, 32, self.xPos, self.yPos, 32, 32);
                                drawZeeEnemy();
                            }
                            else//Otherwise draw enemy first
                            {
                                //Draw new position
                                ctx.drawImage(self.img, self.frameX * 32, self.frameY * 32, 32, 32, self.xPos, self.yPos, 32, 32);
                                drawZeeEnemy();
                                if (notWalking)
                                {
                                    drawPMap();
                                }

                            }



                            if (self.hostile)
                                checkIfHit();
                        }

                    }
                };

            //Set its position and ensure another enemy hasn't already been placed there
            setItsPosition();
            ratSmallLab.indexNum = numOfEnemies;
            function setItsPosition()
            {
                //Set random start positions
                ratSmallLab.xPos = Math.floor(Math.random() * 24) * 32;
                ratSmallLab.yPos = Math.floor(Math.random() * 13 + 5) * 32;

                //Set remainder of x & y pos of its division by 32 (amount each map slot is worth)
                let remainY = ratSmallLab.yPos % 32, remainX = ratSmallLab.xPos % 32;
                //Set actual map position
                ratSmallLab.mapY = ((ratSmallLab.yPos - remainY)/32);
                ratSmallLab.mapX = ((ratSmallLab.xPos - remainX)/32);


                //If the slot its trying to go into exists
                if (lOMap[ratSmallLab.myLevel][ratSmallLab.mapY] !== undefined && lOMap[ratSmallLab.myLevel][ratSmallLab.mapY][ratSmallLab.mapX] !== undefined)
                {
                    //And somethings not already there
                    if (lOMap[ratSmallLab.myLevel][ratSmallLab.mapY][ratSmallLab.mapX] === 0)
                    {
                        //Put it there
                        lOMap[ratSmallLab.myLevel][ratSmallLab.mapY][ratSmallLab.mapX] = 1;
                    }
                }
                else//If one is... try again
                    setItsPosition();
            }
            //Push results into the enemies array into a level's slot
            enemy[ratSmallLab.myLevel].push(ratSmallLab);
            if (numOfEnemies === 14)
            {
                doneCreating = true;
            }
        }

    }
    else
    {
        setTimeout(createEnemies, 10);
    }
}



























function drawZeeEnemy()
{
    for (let b = 0; b < enemy[level].length; b++)
    {
        if (!enemy[level][b].dead)
        {
            enemy[level][b].drawMe();
        }
    }
}
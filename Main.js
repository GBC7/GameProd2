var canvas = undefined;         //      Setup for global use as variables to allow setting new reference to the
var ctx = undefined;            //      new canvas element created each time loadLvlEnv() runs

const canvasSizer = document.getElementById("lvlCanvasSizer"); //Setup reference for container canvas for loadLvlEnv()

const canvWidth = [1536, 800,  362, 320, 544, 1200, 736]; //Levels background image width *******------------needs to be updated with all dimensions---------*******
                   //0   //1  //2   //3  //4  //5   //6
const canvHeight = [1536, 600, 237, 352, 512, 1600, 1374]; //Levels background image height *******------------needs to be updated with all dimensions---------*******
                   //0    //1  //2  //3  //4  //5   //6

var level = 0;                  // For switching between levels


var curBgPic = new Image();      // SRC attribute used for setting current background picture

         loadLvlEnv();   // Calling load level environment function

function loadLvlEnv ()   // Resize canvas if needed and load background image for level *******------------needs to be updated with all dimensions---------*******

    {
        switch (level) // Set the current background picture based on level *******------------needs to be updated with all file paths---------*******

            {

                case 0:

                    curBgPic.src = "../../Lvl4TheStreetz/images/basementMaze.jpeg";                                  //0 --- Home
                    break;

                case 1:

                    curBgPic.src = "../../Lvl2Sewer/images/Sewer1.jpg";       //1 --- Sewer
                    break;

                case 2:

                    curBgPic.src =  "../../Lvl3ClothingStore/images/checkout.jpeg";                                     //2 --- Clothing Store
                    break;

                case 3:

                    curBgPic.src =  "../../Lvl5MomsPlace/images/momsFullerLivingRoom.jpeg";                               //3 --- The Streetz ~!~
                    break;

                case 4:

                    curBgPic.src = "../../Lvl5MomsPlace/images/momsLivingRoom.jpeg";                                  //4 --- Mom's Place
                    break;

                case 5:

                    curBgPic.src = "../../Lvl6Lab/images/Lab.jpeg";            //5 --- Lab
                    break;

                case 6:

                    curBgPic.src = "../../Lvl6Lab/images/LabOffice.jpeg";                                  //6 --- Not decided
                    break;

            }

        curBgPic.onload = function()                            // Load level's background picture

            {
                canvasSizer.style.width = canvWidth[level] + "px"; //Set Canvas width to match maps width
                canvasSizer.style.height = canvHeight[level] + "px"; //Set Canvas height to match maps height


                //Removes canvas from HTML file and puts it back in with dimensions specific to current level
                canvasSizer.innerHTML = '<canvas id="canvas" width ="' + canvWidth[level] +
                    '" height="' + canvHeight[level] + '">Your browser does not support canvas.</canvas>';



                canvas = document.getElementById("canvas");                      //Re-captures canvas reference
                ctx = canvas.getContext("2d");                                   //Setting context
                canvas.style.backgroundImage = "url(" + curBgPic.src + ")";      //Sets background image based on level

            };
    }


























    /* *********************************** BELOW IS TEMPORARY ****************************************** */

    addEventListener("keydown", onkeydown, false);
    function onkeydown(e)
        {
             if (e.keyCode === 37 && level > 0)
             {
                 --level;
                 console.log(level);
             }
            else if (e.keyCode === 39 && level < 6)
            {
                ++level;
                console.log(level);
            }
            loadLvlEnv();
        }

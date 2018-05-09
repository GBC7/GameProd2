
//Attribute Declarations
var strength = 0;
var dexterity = 0;
var intelligence = 0;
var chance = 0;


//Character Declarations
var barbarian = false;
var rogue = false;
var wizard = false;


//Run Generate Function
generate(choice);



//This function uses Math.random equations to generate
//stats for the character of the players choosing
function generate(choice)
{
    switch(choice)
    {
        //Barbarian Class
        //Barbarians are strength based characters
        //While the random strength number generated for
        //strength is less than 12, repeat the equation
        //until the end result is greater than 12.
        //Dexterity and chance are set lower based on
        //a very low intelligence level
        case barbarian:
            strength = Math.ceil(Math.random()*25);
            while(strength < 12)
            {
                strength = Math.ceil(Math.random()*25);
            }
            dexterity = Math.ceil(Math.random()*10);
            intelligence = Math.ceil(Math.random()*5);
            chance = Math.ceil(Math.random()*10);
            break;
        //Rogue Class
        //Rogues are dexterity based characters
        //While the random strength number generated for
        //dexterity is less than 12, repeat the equation
        //until the end result is greater than 12.
        //Strength, intelligence, and chance are set midlevel.
        case rogue:
            strength = Math.ceil(Math.random()*15);
            dexterity = Math.ceil(Math.random()*25);
            while(deterity < 12)
            {
                deterity = Math.ceil(Math.random()*25);
            }
            intelligence = Math.ceil(Math.random()*15);
            chance = Math.ceil(Math.random()*15);
            break;
        //Wizard Class
        //Wizards are intelligence based characters
        //While the random strength number generated for
        //intelligence is less than 12, repeat the equation
        //until the end result is greater than 12.
        //Strength is set very low as this type is not a
        //physically strong character.
        //Dexterity, and chance are set midlevel.
        case wizard:
            strength = Math.ceil(Math.random()*5);
            dexterity = Math.ceil(Math.random()*10);
            intelligence = Math.ceil(Math.random()*25);
            while(intelligence < 12)
            {
                intelligence = Math.ceil(Math.random()*25);
            }
            chance = Math.ceil(Math.random()*15);
            break;
        default:
            break;
    }
}
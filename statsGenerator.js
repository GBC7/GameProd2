
//Attribute Declarations
var strength = 0;
var dexterity = 0;
var intelligence = 0;
var chance = 0;
var healthPoints = 0;


//Character Declarations
var barbarian = false;
var rogue = false;
var wizard = false;



//Min and Max States
var minStrength = 5;
var midStrength = 12;
var maxStrength = 25;
var minIntelligence = 5;
var midIntelligence = 12;
var maxIntelligence = 25;
var minDexterity = 5;
var midDexterity = 12;
var maxDexterity = 25;
var minChance = 5;
var midChance = 12;
var maxChance = 25;
var barbarianHealthPoints = 50;
var rogueHealthPoints = 30;
var wizardHealthPoints = 15;



choice = barbarian;
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
            strength = Math.ceil(Math.random()*maxStrength);
            while(strength < midStrength)
            {
                strength = Math.ceil(Math.random()*maxStrength);
            }
            dexterity = Math.ceil(Math.random()*midDexterity);
            intelligence = Math.ceil(Math.random()*minIntelligence);
            chance = Math.ceil(Math.random()*midChance);
            healthPoints = barbarianHealthPoints;
            console.log(healthPoints);
            break;
        //Rogue Class
        //Rogues are dexterity based characters
        //While the random strength number generated for
        //dexterity is less than 12, repeat the equation
        //until the end result is greater than 12.
        //Strength, intelligence, and chance are set midlevel.
        case rogue:
            strength = Math.ceil(Math.random()*midStrength);
            dexterity = Math.ceil(Math.random()*maxDexterity);
            while(dexterity < midDexterity)
            {
                dexterity = Math.ceil(Math.random()*maxDexterity);
            }
            intelligence = Math.ceil(Math.random()*midIntelligence);
            chance = Math.ceil(Math.random()*midChance);
            healthPoints = rogueHealthPoints;
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
            strength = Math.ceil(Math.random()*minStrength);
            dexterity = Math.ceil(Math.random()*midDexterity);
            intelligence = Math.ceil(Math.random()*maxIntelligence);
            while(intelligence < midIntelligence)
            {
                intelligence = Math.ceil(Math.random()*maxIntelligence);
            }
            chance = Math.ceil(Math.random()*midChance);
            healthPoints = wizardHealthPoints;
            break;
        default:
            break;
    }
}

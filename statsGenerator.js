
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


function generate(choice)
{
    switch(choice)
    {
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
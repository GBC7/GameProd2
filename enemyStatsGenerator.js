
//Attribute Declarations
var enemyAttackPoints = 0;
var enemyChance = 0;
var enemyHealthPoints = 0;


//Character Declarations
var posterEnemy = false;
var lowLevelEnemy = false;
var midLevelEnemy = false;
var bossLevelEnemy = false;



//Min and Max States
var minStrength = 5;
var midStrength = 12;
var maxStrength = 25;
var minChance = 5;
var midChance = 12;
var maxChance = 25;
var posterEnemyHealthPoints = 1;
var lowLevelHealthPoints = 5;
var midLevelHealthPoints = 10;
var bossLevelHealthPoints = 40;




enemy = lowLevelEnemy;
//Run Generate Function
generate(enemy);



//This function uses Math.random equations to generate
//stats for the character of the players choosing
function generate(choice)
{
    switch(choice)
    {
        //Poster Stats Generator
        case posterEnemy:
        {
            enemyAttackPoints = 0;
            enemyHealthPoints = posterEnemyHealthPoints;
        }
        //Low Level Enemy Stats Generator
        case lowLevelEnemy:
            enemyAttackPoints = Math.ceil(Math.random()*minStrength);
            while(strength < minStrength)
            {
                enemyAttackPoints = Math.ceil(Math.random()*minStrength);
            }
            enemyChance = Math.ceil(Math.random()*minChance);
            enemyHealthPoints = lowLevelHealthPoints;
            console.log(healthPoints);
            break;
        //Mid Level Enemy Stats Generator
        case midLevelEnemy:
            enemyAttackPoints = Math.ceil(Math.random()*midStrength);
            while(strength < midStrength)
            {
                enemyAttackPoints = Math.ceil(Math.random()*midStrength);
            }
            enemyChance = Math.ceil(Math.random()*midChance);
            enemyHealthPoints = midLevelHealthPoints;
            console.log(healthPoints);
            break;
        //Boss Level Stats Generator
        case bossLevelEnemy:
            enemyAttackPoints = Math.ceil(Math.random()*maxStrength);
            while(strength < midStrength)
            {
                enemyAttackPoints = Math.ceil(Math.random()*maxStrength);
            }
            enemyChance = Math.ceil(Math.random()*maxChance);
            enemyHealthPoints = bossLevelHealthPoints;
            console.log(healthPoints);
            break;
        default:
            break;
    }
}
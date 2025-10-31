import arcaneDatabase from "./database.js";
import arcaneDraw from "./draw.js";
arcaneDraw();

import arcaneTrial from "./trial.js";
arcaneTrial();

import arcaneValidation from "./validation.js";
arcaneValidation();
console.log(arcaneDatabase[0]?.cardname);
console.log(arcaneDatabase[0]?.answer);
console.log(arcaneDatabase[1]?.cardname);
console.log(arcaneDatabase[1]?.question);
console.log(arcaneDatabase[2]?.cardname);
console.log(arcaneDatabase[2]?.proposition1);
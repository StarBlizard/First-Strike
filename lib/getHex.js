let players = require('./players');
let currentNum = 0;

module.exports = function(){

  /*
  function getNumber(){
    let number = Math.floor((Math.random() * 255) + 1).toString(16)+"";
    return (!players[number]) ? number : getNumber();
  }
  */

  let hex = currentNum.toString(16)+"";

  currentNum++;

  if(hex.length == 1){ hex = "0" + hex; }
  return hex.toUpperCase();
};

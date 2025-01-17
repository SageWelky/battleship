class Player {

  constructor(id) {
    this.id = id;
  }
  //...
  startNewTurn(isChained = false, a = undefined, b = undefined) {

    //For Players:
    //Unlock board on DOM
    //That's it. Just wait for an event listener to call the gameboard attack method.
    //Inside eventListener:
    //If returns hit === true then run startNewTurn() again, if miss run it for opponent

    //For CPU:
    //if(isChained) then(x,y = guessAdjacentToLastGuess(a,b))
    //Do (x,y random guesses within range) while(alreadyGuessed x,y)
    //store guess in alreadyGuessed
    //call opponent gameboard with attack(x,y) method
    //If returns hit === true then run startNewTurn(true, lastX, lastY) again, if miss run it for opponent

  }

  setupTurn() {
    //placement logic

  }

}

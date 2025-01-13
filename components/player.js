class Player {
  //As a human input, turn commands will update the DOM off of the
  //current gameboard state relevant to this player
  //The DOM itself will be hooked up to event listeners which
  //will deliver the callback with the guess information
  //CPU players will instead have the gamecheck simply act as input for
  //making a guess that can be delivered directly as a callback


  constructor(id) {
    this.id = id;
    gameState = 0;
  }
  //...
  startNewTurn(boardData, callback = () => {}) {

    //will let the other player/cpu know that they've finished placement phase if needed
    callback();
    if(gameState > 0) {

      //DOM update
      //unlock input for this player
      //logic for guesses
    } else if(gameState === 0) {

      //DOM update
      //unlock input for this player
      //logic for placement
    } else {
      console.log(`Error: Player ${this.id} has an invalid gamestate (${this.gameState}).`);
    }

  }

  leavePlacementPhase() {

    this.gameState++

  }
}

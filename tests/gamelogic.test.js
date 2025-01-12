




//Gamelogic needs to:


//(A):
//Handle three categories:
//Startup signal,
//Placement phase,
//Play phase,
//----------------Notes----------------
//Input differentiation should come in the form of two functions
//A function call for startup,
//A single function call for game inputs that makes placement logic unreachable after...
//...placement completion for both players is confirmed by the gameboard

//The startup command will only exist in the index and run a single time at launch

//The turn input function will be used everywhere aside from the at launch index.js call
//Gamelogic will attempt to run the turn input logic for guesses first
//This will fail at first because the guess variables cannot exist until after placement phase
//When it does succeed it will return out of the function with a callback function...
//...before it can reach placement code

//The turn input will look at the parameter's obj.placement value exclusively at first
//The CPU and DOM will be in placement mode exclusively by default until...
//...they run a specific function called by the successful completion of turn input inside game logic
//The turn input will expect obj.placement info until gameboard returns a valid setup

//The value for which player is 'current player' executing their turn will not swap unless a valid turn is...
//...approved by the gameboard

//Valid turn or not, the gamelogic will return an unlock call for current player's turn...
//...which should allow for further inputs, alongside a message to the player if the turn was invalid
//The CPU player would do nothing with the invalid message, but keeping the CPU logic...
//...for inputs and outputs in parity with requirements for i/o of player logic keeps code clean and modular
//The new turn will not change aside from potentially carrying a message
//The CPU and player turns are only indicative of who is allowed to make a move currently
//Thus, there is no difference between two turns where the first made no change...
//...and a rejected turn followed by a second attempt
//With this in mind, the only thing that player/CPU logic needs to know is when...
//...it is time to (both simultaneously) update state from the current game board and allow/execute inputs

//The current turn execution method like is managed by the internal state per-player
//The method of execution is placement by default
//Upon recieving the callback function that comes with a valid setup phase

//Turn logic sets the appropriate player object reference to the currentPlayer variable label
//This means that when a callback is returned we can do it as currentPlayer.<given method to invoke>
//This will alias to either player1.<given method to invoke> or (CPU) player2.<given method to invoke>
//Having turn logic control the call allows many advantages, but interested in one in particular...
//...that being the ability to call a state change method to the player who made a valid placement turn...
//...and send an unlock code to the OTHER player via a second callback holding the state change
//Structured as:

//(psuedo for turn change logic)
//currentPlayer = player1 -> currentPlayer = player2 ... repeated for notCurrentPlayer

//(exiting gamelogic with nexted callback
//return currentPlayer.startNewTurn(notCurrentPlayer.leavePlacementPhase());

//Where:

class Player {

  //...
  startNewTurn(callback) {
    callback();
    if(gameState)
  }

  leavePlacementPhase() {

    this.gameState++


}
}
//(B):
//Create Gameboards
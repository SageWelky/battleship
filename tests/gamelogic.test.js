


//This is the core of the game's flow control
//Using callbacks to enable communication between parts is, as far
//as I'm aware, not a very common practice
//So I thought I might note it down during TDD, and explain why I
//elected to do it this way


//I disliked the idea of gamelogic (or any other outer-layer code block) being
//tightly coupled to these neat code blocks in order to direct the game
//Additionally, I disliked the idea of having to make the outer-layer around class
//instances overly complicated
//Thus, I found the idea of each 'blackbox' class instance having their coupling concentrated
//in the return makes it exceedingly easy to change out and/or isolate
//The only external information a componenent has aside from their input is the callback
//they're supposed to wrap their data in
//I prefer this over the outer layer simply taking data and calling what should go next
//because the component itself should 'know' that based on it's internal state
//and having to keep the wrapping layer appraised of that information got a smidge messy
//by comparison
//The gamelogic block does most of the things you would expect a outer layer to do
//but is kept pretty clean and simple

//The core concept of the communication is:
//callback(with data) as state -into-> gamelogic
//gamelogic decides what component should be acting next
//callback(with data) as "control flow mechanism" <-out of- gamelogic
//Where all returns at the scope just below global have a callback() that acts as
//a 'To: address' postage label of sorts

//If an extra callback is nested in, it acts as a method of updating more than one component
//related to the game's overall current state

//All of these communications are fairly easy to direct, and only need a go-between
//like gamelogic because of the need to keep track of when the turn should change between players
//Because it is the go-between, and already is responsible for keeping track of overall game state
//and directing it, it also acts as a convenient place to check for game end as well as housing
//the 'create fresh class instances' code for restarts and follow-up games if such features should
//end up being implemented

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

/*class Player {
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
  startNewTurn(callback) {

    //will let the other player/cpu know that they've finished placement phase
    callback();
    if(gameState > 0) {
      //logic for guesses
      //DOM update
      //unlock input for this player
    } else if(gameState === 0) {
      //logic for placement
      //DOM update
      //unlock input for this player
    }

  }

  leavePlacementPhase() {

    this.gameState++

  }
}
//(B):
//Create Gameboards

*/
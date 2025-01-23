//gameStates.js
/**
  * @typedef {import("./stateMachine.js").default} StateMachine
  */

export default let gameStates = {

  //Possible states for the Machine:
  setupPhase: {

      /** Defined in stateMachine.js, and initialized in index.js, this what manages our flow control.
        * @param {Object} params - Parameter object format as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the corresponding "states" property.
        */
    action: async ({ player, opponent, stateMachineInstance }) => {

      //Run the setup sequence players and await the confirmation they've finished.
      await player.setupBoard();
      await opponent.setupBoard();

      //After both players are setup we can begin play phase turns.
      stateMachineInstance.transition("newTurn", { player: opponent, opponent: player });
    },
    transitions: { newTurn: "newTurn" },
  },

  newTurn: {

    /** Defined in stateMachine.js, and initialized in index.js, this what manages our flow control.
        * @param {Object} params - Parameter object format as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the corresponding "states" property.
        */
    action: ({ player, opponent, stateMachineInstance }) => {

      //For Humans this unlocks DOM input for coordinate squares.
      const move = player.makeMove(opponent.board);

      //Pause the task queue until event listener unpauses it.
      if(move && move.result === "Awaiting Human Player Input") {
        stateMachineInstance.paused = true;
      }

      //This behavior will only fire for CPU players, event listeners replicate it for humans.
      else if (move && (move.result === "hit" || move.result === "miss")) {

        if(move.result === "miss") {
          //Change player on miss.
          stateMachineInstance.transition("newTurn", { player: opponent, opponent: player });
        }

        else if(move.result === "hit") {
          //Guess another coordinate on hit.
          stateMachineInstance.transition("newTurn", { player: player, opponent: opponent });
        }
      }

      //If we aren't waiting for player input and it isn't a hit/miss, it's likely a game over.
      else if(move && move.result === "All ships sunk") {
        stateMachineInstance.transition("gameOver", { winner: player, opponent: opponent });
      }

      else if((move && move.result === "Validation Error, already guessed") || (move && move.result === "Unexpected error validating guess")) {

        //If we're this is the type of error we're getting, we should try the turn again.
        stateMachineInstance.taskQueue.unshift(stateMachineInstance.states[stateMachineInstance.currentState].action({player: player, opponent: opponent, stateMachineInstance: stateMachineInstance}));
      }
      else {
        prompt("A game-breaking error has occured, please refresh the Page.");
      }
    },
    transitions: { newTurn: "newTurn", gameOver: "gameOver" },
  },

  gameOver: {

    /** Defined in stateMachine.js, and initialized in index.js, this what manages our flow control.
        * @param {Object} params - Parameter object format as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the corresponding "states" property.
        */
    action: ({ winner, opponent, stateMachineInstance }) => {

      //Remaining tasks currently in queue are superfluous, and could only cause issues.
      stateMachineInstance.taskQueue = [];

      //Call DOM loading for the victory screen.
    },
    transitions: { newGame: "newGame" },
  },

  newGame: {

    /** Defined in stateMachine.js, and initialized in index.js, this what manages our flow control.
        * @param {Object} params - Parameter object format as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the corresponding "states" property.
        */
    action: async ({ player, opponent, stateMachineInstance }) => {

      //A new match requires default state.
      stateMachineInstance.resetState();

      let nextGameType = await nextGameInput();
      if(nextGameType === "rematch"){
        player.resetState()
        opponent.resetState()
        player.board.resetState()
        opponent.board.resetState()
      } else {
        let players = await createPlayers();
        player = players.playerOne;
        opponent = players.playerTwo;
      }

      createPlaySpace({playerOneType: player.isCPU, playerTwoType: opponent.isCPU});
      stateMachineInstance.transition("setupPhase", {player: player, opponent: opponent});
    },
    transitions: { setupPhase: "setupPhase" },
  },

};
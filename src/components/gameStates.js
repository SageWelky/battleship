/**
  * @typedef {import("./stateMachine.js").default} StateMachine
  */

export default let gameStates = {

  //Possible states for the Machine:
  setupPhasePlayerOne: {
      /** Defined in stateMachine.js, and initialized in index.js, this what manages our flow control.
        * @param {object} params - Parameter object format as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {stateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the "states" property of upon creation.
        */
    action: ({ player, opponent, stateMachineInstance }) => {
      if (player.isCPU) {
        //CPU style setup here
      } else {
        //Human style setup
      }
      stateMachineInstance.transition("setupPhasePlayerTwo", { player: opponent, opponent: player });
    },
    transitions: { setupPhasePlayerTwo: "setupPhasePlayerTwo" },
  },

  setupPhasePlayerTwo: {
    action: ({ player, opponent, stateMachineInstance }) => {
      if (player.isCPU) {
        //CPU style setup
      } else {
        //Human style setup
      }
      stateMachineInstance.transition("playerOneTurn", { player: opponent, opponent: player });
    },
    transitions: { playerOneTurn: "playerOneTurn" },
  },

  newTurn: {
    action: ({ player, opponent, stateMachineInstance }) => {
      const move = player.makeMove(opponent.board);
      if(move) {

      }
    },
    transitions: { playerOneTurn: "newTurn", gameOver: "gameOver" },
  },

  gameOver: {
    action: ({ winner, stateMachineInstance }) => {

    },
    transitions: {},
  },

};
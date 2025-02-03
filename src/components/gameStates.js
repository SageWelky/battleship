import { loadPlayScreen } from "../dom/playScreen.js";
import turnLogicHandler from "../helpers/turnLogicHandler.js";
/**
  * @typedef {import("./stateMachine.js").default} StateMachine
  */
export default let gameStates = {

  //Possible states for the Machine:
  setupPhase: {

      /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the corresponding "states" property.
        */
    action: async ({ player, opponent, stateMachineInstance }) => {

      //Run the setup sequence players and await the confirmation they've finished.
      await player.setupBoard();
      await opponent.setupBoard();

      //After both players are setup we can begin play phase turns.
      stateMachineInstance.transition("newTurn", { player: opponent, opponent: player});
    },
    transitions: { newTurn: "newTurn" },
  },

  newTurn: {

    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the corresponding "states" property.
        */
    action: ({ player, opponent, stateMachineInstance }) => {

      let move = player.makeMove(opponent);
      let stateInstructions = turnLogicHandler(move) || { event: null, payload: null };

      if(stateInstructions?.event && stateInstructions?.payload) {
        stateMachineInstance.transition(stateInstructions.event, stateInstructions.payload);
      }
    },
    transitions: { newTurn: "newTurn", gameOver: "gameOver" },
  },

  gameOver: {

    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
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

    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which gameStates is the corresponding "states" property.
        */
    action: async ({ player, opponent, stateMachineInstance }) => {

      //A new match requires default state.
      stateMachineInstance.resetState();

      let nextGameType = await nextGameInput();
      if(nextGameType === "rematch") {
        player.resetState();
        opponent.resetState();
      } else {
        let players = await createPlayers();
        player = players.playerOne;
        opponent = players.playerTwo;
      }

      loadPlayScreen({playerOneType: player.isCPU, playerTwoType: opponent.isCPU});
      stateMachineInstance.transition("setupPhase", {player: player, opponent: opponent});
    },
    transitions: { setupPhase: "setupPhase" },
  },

};
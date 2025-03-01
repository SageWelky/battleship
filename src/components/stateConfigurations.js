import { loadPlayScreen } from "../dom/playScreen.js";
import determineNextState from "../helpers/determineNextState.js";
import { updateUIForTurn } from "../dom/turnChangeUI.js";
import { delayQueue } from "../helpers/delay.js";
import { handleDisplayUpdate } from "../dom/updateDisplay.js";

/**
  * @typedef {import("./stateMachine.js").default} StateMachine
  */

const stateConfigurations = {
  setupPhase: {
    /**
      * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
      * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which stateConfigurations is the corresponding "states" property.
      */
    action: ({ activePlayer, opponent, stateMachineInstance }) => {
      let setupPlayer = activePlayer.setupBoard(stateMachineInstance);
      let setupOpponent = opponent.setupBoard(stateMachineInstance);

      if (setupPlayer instanceof Promise || setupOpponent instanceof Promise) {
        Promise.all([setupPlayer, setupOpponent]).then(() => {
          stateMachineInstance.transition("startTurn", { activePlayer: activePlayer, opponent: opponent });
        });
      } else {
        stateMachineInstance.transition("startTurn", { activePlayer: activePlayer, opponent: opponent });
      }
    },
    transitions: { startTurn: "startTurn" },
  },

  startTurn: {
    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which stateConfigurations is the corresponding "states" property.
        */
    action: ({ activePlayer, opponent, stateMachineInstance }) => {
      //Leaving some debug code for anyone who wants to see how the queue keeps the callstack clean.
      //logCallStackSize();
      updateUIForTurn(activePlayer, opponent);

      if(activePlayer?.isCPU === true) {
        delayQueue(stateMachineInstance);
      }

      let move = activePlayer.makeMove(opponent, stateMachineInstance);
      let stateInstructions = determineNextState(activePlayer, opponent, stateMachineInstance, move) || (activePlayer, opponent, stateMachineInstance, { event: null, payload: null });
      //Maybe swap to two explicit observer functions? Would be more extensible, but probably more bloated, too.
      let uiPayload = { uiPayloadType: "turn", move: move, opponent: opponent  };
      handleDisplayUpdate(uiPayload);

      if (stateInstructions?.event && stateInstructions?.payload) {
        stateMachineInstance.transition(stateInstructions.event, stateInstructions.payload);
      }
    },
    transitions: { startTurn: "startTurn", gameOver: "gameOver" },
  },

  gameOver: {
    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which stateConfigurations is the corresponding "states" property.
        */
    action: ({ winner, opponent, stateMachineInstance }) => {
      console.log(`Game over! Player ${winner.id} has won!`);
      //Remaining tasks currently in queue are superfluous, and could only cause issues.
      stateMachineInstance.taskQueue = [];

      //Call DOM loading for the victory screen.
    },
    transitions: { restartGame: "restartGame" },
  },

  restartGame: {
    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which stateConfigurations is the corresponding "states" property.
        */
    action: async ({ activePlayer, opponent, stateMachineInstance }) => {
      //A new match requires default state.
      stateMachineInstance.resetState();

      let nextGameType = await nextGameInput();

      if (nextGameType === "rematch") {
        activePlayer.resetState();
        opponent.resetState();

      } else {
        let players = await createPlayers();
        activePlayer = players.playerOne;
        opponent = players.playerTwo;
      }

      loadPlayScreen({playerOneType: activePlayer, playerTwoType: opponent.isCPU});
      stateMachineInstance.transition("setupPhase", {activePlayer: activePlayer, opponent: opponent});
    },
    transitions: { setupPhase: "setupPhase" },
  },

};

function logCallStackSize() {
  try {
    throw new Error();
  } catch (e) {
    const stackTrace = e.stack || '';
    const stackFrames = stackTrace.split('\n').filter(line => line.trim() !== '' && !line.includes("Error"));
    console.log('Call stack size:', stackFrames.length);
  }
}

export default stateConfigurations;
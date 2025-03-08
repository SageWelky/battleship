import { loadPlayScreen } from "../dom/playScreen.js";
import determineNextState from "../helpers/determineNextState.js";
import { updateUIForTurn } from "../dom/turnChangeUI.js";
import { delayQueue } from "../helpers/delay.js";
import { handleDisplayUpdate } from "../dom/updateDisplay.js";
import { logCallStackSize } from "../helpers/debug.js";

/**
  * @typedef {import("./stateMachine.js").default} StateMachine
  */

const stateConfigurations = {
  idle: {
    transitions: { setupPhase: "setupPhase" },
  },

  setupPhase: {
    /**
      * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
      * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which stateConfigurations is the corresponding "states" property.
      */
    action: ({ activePlayer, opponent, stateMachineInstance }) => {
      let setupPlayer = activePlayer.setupBoard(stateMachineInstance);
      console.log("Setup Player: ", setupPlayer);
      console.log(opponent.isSetupComplete);

      if (opponent.isSetupComplete === false) {
        if (setupPlayer instanceof Promise) {
          console.log("Promise found in setup phase");
          setupPlayer.then(() => {
            console.log(setupPlayer);
            stateMachineInstance.transition("transitionActivePlayer", { activePlayer: activePlayer, opponent: opponent }, true);
            stateMachineInstance.transition("setupPhase", { activePlayer: opponent, opponent: activePlayer });
          });
        } else {
          console.log("No promise found in setup phase");
          stateMachineInstance.transition("transitionActivePlayer", { activePlayer: activePlayer, opponent: opponent }, true);
          stateMachineInstance.transition("setupPhase", { activePlayer: opponent, opponent: activePlayer });
        }
      } else {
        if (setupPlayer instanceof Promise) {
          console.log("Promise found in setup phase");
          setupPlayer.then(() => {
            console.log(setupPlayer);
            stateMachineInstance.transition("transitionActivePlayer", { activePlayer: activePlayer, opponent: opponent }, true);
            stateMachineInstance.transition("startTurn", { activePlayer: opponent, opponent: activePlayer });
          });
        } else {
          console.log("No promise found in setup phase");
          stateMachineInstance.transition("transitionActivePlayer", { activePlayer: activePlayer, opponent: opponent }, true);
          stateMachineInstance.transition("startTurn", { activePlayer: opponent, opponent: activePlayer });
        }
      }
      console.log("Setup Ping.");
    },
    transitions: { transitionActivePlayer: "transitionActivePlayer", setupPhase: "setupPhase", startTurn: "startTurn" },
  },

  transitionActivePlayer: {
    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which stateConfigurations is the corresponding "states" property.
        */
    action: ({ activePlayer, opponent, stateMachineInstance }) => {
      updateUIForTurn(activePlayer, opponent, stateMachineInstance);
    },
    transitions: {},
  },

  startTurn: {
    /**
        * @param {Object} params - Parameter object formatted as {...payload, stateMachineInstance} for the stateMachine.js transition method.
        * @param {StateMachine} params.stateMachineInstance - Reference to our state machine instance for which stateConfigurations is the corresponding "states" property.
        */
    action: ({ activePlayer, opponent, stateMachineInstance }) => {
      let move = activePlayer.makeMove(opponent, stateMachineInstance);

      if (move instanceof Promise) {
        move.then((data) => {
          let move = data;
          console.log("Turn Promise Resolved as:");
          console.log(move);
          console.log(move.result);
          let stateInstructions = determineNextState(activePlayer, opponent, stateMachineInstance, move) || (activePlayer, opponent, stateMachineInstance, { event: null, payload: null });
          let uiPayload = { uiPayloadType: "turn", move: move, opponent: opponent  };
          handleDisplayUpdate(uiPayload);
          if (stateInstructions?.event && stateInstructions?.payload) {
            if( move.result === "Miss" ) {
              stateMachineInstance.transition("transitionActivePlayer", { activePlayer: activePlayer, opponent: opponent }, true);
            }
            stateMachineInstance.transition(stateInstructions.event, stateInstructions.payload);
          }
        });
      } else {
        let stateInstructions = determineNextState(activePlayer, opponent, stateMachineInstance, move) || (activePlayer, opponent, stateMachineInstance, { event: null, payload: null });
        let uiPayload = { uiPayloadType: "turn", move: move, opponent: opponent  };
        handleDisplayUpdate(uiPayload);
        if (stateInstructions?.event && stateInstructions?.payload) {
          if( move.result === "Miss" ) {
            stateMachineInstance.transition("transitionActivePlayer", { activePlayer: activePlayer, opponent: opponent }, true);
          }
          stateMachineInstance.transition(stateInstructions.event, stateInstructions.payload);
        }
      }
      if(activePlayer?.isCPU === true) {
        delayQueue(stateMachineInstance);
      }
    },
    transitions: { transitionActivePlayer: "transitionActivePlayer", startTurn: "startTurn", gameOver: "gameOver" },
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

export default stateConfigurations;
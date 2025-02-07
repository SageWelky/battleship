import "./styles.css";
import gameStates from "./components/gameStates.js";
import StateMachine from "./components/stateMachine.js";
import createPlayers from "./helpers/createPlayers.js";
import { loadPlayScreen } from "./dom/playScreen.js";

/**
  * @typedef {StateMachine} StateMachineInstance
  */
async function startupTheApplication() {
  /**
  * The state machine managing Battleship game states.
  * @type {StateMachineInstance}
  */
  const battleshipStateMachine = new StateMachine(gameStates);

  let {player, opponent} = await createPlayers();

  await loadPlayScreen({playerOneType: player.isCPU, playerTwoType: opponent.isCPU});

  battleshipStateMachine.states[battleshipStateMachine.currentState]
  .action({ player: player, opponent: opponent, stateMachineInstance: battleshipStateMachine});

  startButton.removeEventListener("click", startupTheApplication);
}

let startButton = document.querySelector( "#start-button");
startButton.addEventListener("click", startupTheApplication);
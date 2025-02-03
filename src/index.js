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

  //Code for establishing players.
  let {player, opponent} = await createPlayers();

  //Initializes the play screen.
  loadPlayScreen({playerOneType: player.isCPU, playerTwoType: opponent.isCPU});

  //Start the action of the initial state.
  battleshipStateMachine.states[battleshipStateMachine.currentState].action({ player: player, opponent: opponent, stateMachineInstance: battleshipStateMachine});

}

let startButton = document.querySelector( "#start-button");

startButton.addEventListener("click", startupTheApplication);



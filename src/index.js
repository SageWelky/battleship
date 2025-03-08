import "./styles.css";
import stateConfigurations from "./components/stateConfigurations.js";
import StateMachine from "./components/stateMachine.js";
import createPlayers from "./helpers/createPlayers.js";
import { loadPlayScreen } from "./dom/playScreen.js";
import { animateAppend } from "./helpers/animateAppend.js";
import { Observer } from "./helpers/observer.js";

/**
  * @typedef {StateMachine} StateMachineInstance
  */
async function startUpTheApplication() {
  /**
  * The state machine managing Battleship game states.
  * @type {StateMachineInstance}
  */
  const battleshipStateMachine = new StateMachine(stateConfigurations);

  let firstLaunch = true;

  let {activePlayer, opponent} = await createPlayers(firstLaunch);

  await loadPlayScreen({playerOneType: activePlayer.isCPU, playerTwoType: opponent.isCPU});

  setTimeout(() => {
    battleshipStateMachine.transition("setupPhase", { activePlayer: activePlayer, opponent: opponent, });
    // battleshipStateMachine.states[battleshipStateMachine.currentState]
    // .action({ activePlayer: activePlayer, opponent: opponent, stateMachineInstance: battleshipStateMachine});
  }, 600);

  startButton.removeEventListener("click", startUpTheApplication);
}

//const gameObserver = new Observer();
//gameObserver.subscribe(handleDisplayUpdate);

let startButton = document.querySelector( '#start-button');
startButton.addEventListener('click', startUpTheApplication);
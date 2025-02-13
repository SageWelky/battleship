import "./styles.css";
import gameStates from "./components/gameStates.js";
import StateMachine from "./components/stateMachine.js";
import createPlayers from "./helpers/createPlayers.js";
import { loadPlayScreen } from "./dom/playScreen.js";
import { testHelper } from "./helpers/testHelpers.js";
import { generateEmptyBoardCached } from "./dom/boardUI.js";
import { animateAppend } from "./helpers/animateAppend.js";

/**
  * @typedef {StateMachine} StateMachineInstance
  */
async function startUpTheApplication() {
  /**
  * The state machine managing Battleship game states.
  * @type {StateMachineInstance}
  */
  const battleshipStateMachine = new StateMachine(gameStates);

  let firstLaunch = true;

  let {player, opponent} = await createPlayers(firstLaunch);

  await loadPlayScreen({playerOneType: player.isCPU, playerTwoType: opponent.isCPU});

  setTimeout(() => {
    battleshipStateMachine.states[battleshipStateMachine.currentState]
    .action({ player: player, opponent: opponent, stateMachineInstance: battleshipStateMachine});
  }, 600);

  startButton.removeEventListener("click", startUpTheApplication);
}

generateEmptyBoardCached({startingOwnerId: 'start-screen', eventualOwnerId: 'board-1'});
generateEmptyBoardCached({startingOwnerId: 'start-screen', eventualOwnerId: 'board-2'});


let startButton = document.querySelector( '#start-button');
startButton.addEventListener('click', startUpTheApplication);
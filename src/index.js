import "./styles.css";
import "./components/ship.js";
import gameStates from "./components/gameStates.js";
import StateMachine from "./components/stateMachine.js";
/**
  * @typedef {StateMachine} StateMachineInstance
  */

/**
  * The state machine managing Battleship game states.
  * @type {StateMachineInstance}
  */
const battleshipStateMachine = new StateMachine(gameStates);
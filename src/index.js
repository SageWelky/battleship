import "./styles.css";
import "./components/ship.js";
import { createGameActors, Gamelogic } from "../components/gamelogic";

//create the conductor for game information between game actor objects
let gamelogic = new Gamelogic();

//Manually do startup logic to assign inner function callback (for creating game actors on external scope)
//By keeping the method inside of gamelogic,
//it can be called at anytime for new games or resets if needed later
gamelogic.startUp();
//Make the first thing callback will alias that inner function definition
let callback = createGameActors;

//After first time setup, all we need is the ability to execute callbacks continually
while(true) {
  callback = callback();
}










//Clarification on design pattern:
//--------------------------------
//With our 'actor structure', we expect each actor to know who to give their output to
//The particular method that should be run using said output data is similar to a custom "type" for the data
//and a single function with an overload.

//Rather than calling those methods all inside a ever-deeper nested chain
//we can return what function call needs to be made and with what information
//
//This allows the callback to run and assign the next actor and their instructions as the
//next step
//Because all of the actors only talk to game logic, and game logic
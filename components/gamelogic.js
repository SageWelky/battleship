import Gameboard from "./gameboard";
import Ship from "./ship";

export let createGameActors;

export class Gamelogic {

  //...

  startUp(){

    innerFunction() {
      //create players, boards, and ships in this function
      //should return a callback that starts a first turn\
      return this.turnInput;
    }
    createGameActors = innerFunction;
  }

  turnInput() {
    //...
  }

}
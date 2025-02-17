import Gameboard from "./gameboard";

class Player {
  constructor(id) {
    this.id = id;
    this.isCPU = false;
    this.allSunk = false;
    this.gameboard = new Gameboard();
  }

  setupBoard(stateMachineInstance) {
    throw new Error("setupBoard() must be implemented");
  }

  makeMove() {
    throw new Error("makeMove() must be implemented");
  }

  resetState() {
    this.gameboard = new Gameboard();
  }

};

class CPUPlayer extends Player {

  constructor(id) {
    super(id);
    this.isCPU = true;
  }

  //getShipCoordinates should be made a helper.
  //
  setupBoard(stateMachineInstance) {
    let shipLengths = [5, 4, 3, 3, 2]

    const setupShip = (shipLength) => {
      let x;
      let y;
      let shipCoords = [];
      let shipOrientation = "vertical";

      do {
        shipOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        if (shipOrientation === "horizontal") {
          x = Math.floor(Math.random() * (10 - shipLength));
          y = Math.floor(Math.random() * 10);
        } else if (shipOrientation === "vertical") {
          x = Math.floor(Math.random() * 10);
          y = Math.floor(Math.random() * (10 - shipLength));
        }

        shipCoords = this.gameboard.getShipCoordinates({ x: x, y: y, length: shipLength, orientation: shipOrientation });
      } while (shipCoords.some(([x, y]) => this.gameboard.hashedShipCoords.has(`${x},${y}`)));

      this.gameboard.placeShip({ x: x, y: y, length: shipLength, orientation: shipOrientation });
    };

    shipLengths.forEach(setupShip);
    //Send ship info to DOM.
  }

  makeMove(opponent) {
    let x, y;
    let move = {};

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (opponent.gameboard.hashedGuesses.has(`${x},${y}`));

    move = opponent.gameboard.receiveAttack({x: x, y: y});
    if (move.result === "All ships sunk") {
      this.allSunk = true;
    }
    return move;
  }

}

class HumanPlayer extends Player {
  constructor(id) {
    super(id);
    this.isCPU = false;
  }

  setupBoard(stateMachineInstance) {
    stateMachineInstance.pause();
    console.log("not setup: setupBoard()");
    //DOM side logic needs to call placeShip for each ship
    //Upon placement of all ships needs to call stateMachineInstance.resume()
  }

  makeMove() {
    console.log("not setup: makeMove()");
  }
}

export { Player, CPUPlayer, HumanPlayer };
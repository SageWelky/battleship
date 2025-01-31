import Gameboard from "./gameboard";

class Player {
  constructor() {
    this.isCPU = false;
    this.gameboard = new Gameboard();
  }

  setupBoard() {
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

  constructor() {
    super();
    this.isCPU = true;
  }

  setupBoard() {

    let shipPlacements = [];
    let shipLengths = [5, 4, 3, 3, 2]

    const setupShip = (shipLength) => {
      let x;
      let y;
      let shipCoords = [];
      let shipOrientation;

      do {
        shipOrientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        x = Math.floor(Math.random() * 10);
        y = Math.floor(Math.random() * 10);
        shipCoords = this.gameboard.getShipCoordinates({ x: x, y: y, length: shipLength, orientation: shipOrientation });
      } while (shipPlacements.some(coord => shipCoords.includes(coord)));

      this.gameboard.placeShip({ x: x, y: y, length: shipLength, orientation: shipOrientation });
      //We're making an array of all coordinate pairs across all current ships.
      shipPlacements = [...this.gameboard.ships.flatMap(ship => ship.coordinates)];
    };

    shipLengths.forEach(setupShip);
  }

  makeMove(opponent) {

    let x, y;
    let move = {};
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (opponent.gameboard.hashedGuesses.has(`${x},${y}`));
    move.result = opponent.gameboard.receiveAttack({x: x, y: y});
    return move;
  }

}

class HumanPlayer extends Player {

  constructor() {
    super();
    this.isCPU = false;
  }

  setupBoard() {
    console.log("not setup: setupBoard()");
  }

  makeMove() {
    console.log("not setup: makeMove()");
  }
}

export { Player, CPUPlayer, HumanPlayer };
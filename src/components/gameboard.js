import Ship from "./ship.js";

export default class Gameboard {
  constructor() {
    this.hashedShipCoords = new Map();
    this.hashedGuesses = new Map();
    this.numShipsSunk = 0;
    this.ships = [];
    this.currentShipID = 1;
  }

  receiveAttack({x: x, y: y}) {
    const key = `${x},${y}`;

    if (this.hashedGuesses.get(key) === undefined) {
      this.hashedGuesses.set(key, 1);

      if (this.hashedShipCoords.get(key) !== undefined) {
        let gameOver = false;

        //Side effect updates ship damage from hit, return checks if all sunk.
        gameOver = this.handleHit(key);

        //DOM update
        if (gameOver && typeof gameOver === "boolean") {
          return "All ships sunk";
        }

        return "hit";
      }

      else {
        //DOM update
        return "miss";
      }
    } else if (this.hashedGuesses.get(key) === 1) {

      return "Validation Error, already guessed";
    }

    return "Unexpected error processing guess";
  }

  handleHit(key) {
    let id = this.hashedShipCoords.get(key);
    this.ships[id - 1].hit();

    if (this.ships[id - 1].isSunk()) {
      this.numShipsSunk++;

      if (this.numShipsSunk > 4) {

        return true;
      }
    }

    return false;
  }

  placeShip({x: x, y: y, length: length, orientation: orientation}) {
    let id = this.currentShipID;
    let coords = this.getShipCoordinates({x: x, y: y, length: length, orientation: orientation});

    coords.forEach((coord) => {
      let xCoord = coord[0];
      let yCoord = coord[1];
      let key = `${xCoord},${yCoord}`;

      this.hashedShipCoords.set(key, id);
    });

    let newShip = new Ship({id: id, x: x, y: y, length: length, orientation: orientation, coordinates: coords});
    this.ships.push(newShip);
    this.currentShipID++;

    return id;
  }

  getShipCoordinates({x: x, y: y, length: length, orientation: orientation}) {
    let coordinates = [];

    if (orientation === "horizontal") {
      for (let i = 0; i < length; i++) {
        coordinates.push([x + i, y]);
      }

    } else if (orientation === "vertical") {
      for (let i = 0; i < length; i++) {
        coordinates.push([x, y + i]);
      }
    }

    return coordinates;
  }
}

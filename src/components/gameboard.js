import Ship from "./ship.js";
import { getShipCoordinates } from "../helpers/shipHelpers.js";
import { ensureShipHasObjectFormatting } from "../helpers/shipHelpers.js";

export default class Gameboard {
  constructor() {
    this.hashedShipCoords = new Map();
    this.hashedGuesses = new Map();
    this.numShipsSunk = 0;
    this.ships = [];
    this.currentShipId = 1;
  }

  receiveAttack({x: x, y: y}) {
    const key = `${x},${y}`;

    let move = {};
    move.guess = [x, y];
    move.key = key;

    if (this.hashedGuesses.get(key) === undefined) {
      this.hashedGuesses.set(key, 1);

      if (this.hashedShipCoords.get(key) !== undefined) {
        let sunkShip = false;

        sunkShip = this.handleHit(key);
        move.shipId = sunkShip[1];

        if (sunkShip[0]) {
          if (this.numShipsSunk > 4) {
            move.result = "All ships sunk!!!";
            move.sunkShipId = sunkShip[1];

            return move;
          }
          move.result = "Ship sunk!!";
          move.sunkShipId = sunkShip[1];
        }

        move.result = "Hit!";
        return move;
      }

      else {
        move.result = "Miss";
        return move;
      }

    } else if (this.hashedGuesses.get(key) === 1) {
      move.result = "Validation Error, already guessed.";
      return move;
    }

    move.result = "Unexpected error processing guess.";
    return move;
  }

  handleHit(key) {
    let id = this.hashedShipCoords.get(key);
    this.ships[id - 1].hit();

    if (this.ships[id - 1].isSunk()) {
      this.numShipsSunk++;

      return [true, id];

    }

    return [false, id];
  }

  canPlaceShip(shipCandidate, isCPU = true, numberOfSquaresPerSide = 10) {
    shipCandidate = ensureShipHasObjectFormatting(shipCandidate);

    function flipY(yCoord, numberOfSquaresPerSide = 10) {
      return ((numberOfSquaresPerSide - 1) - yCoord);
    }

    function offsetY(yCoord, length) {
      return (yCoord + 1 - (2 * length));
    }

    if (shipCandidate.coordinates.some(([x, y]) => this.hashedShipCoords.has(`${x},${y}`))) {
      //console.log("Can't place ship because coord found in hashed ships.");
      return false;
    }

    if (isCPU) {
      if (shipCandidate.orientation === "vertical" && !((shipCandidate.y + shipCandidate.length) <= 10)) {
        return false;
      }

      if (shipCandidate.orientation === "horizontal" && !((shipCandidate.x + shipCandidate.length) <= 10)) {
        return false;
      }
    } else {
      if (shipCandidate.orientation === "horizontal" && (!((shipCandidate.x + shipCandidate.length) <= 10) || !(shipCandidate.x >= 0))) {
        return false;
      }

      if (shipCandidate.orientation === "vertical" && (!((shipCandidate.y + shipCandidate.length) <= 10) || !((shipCandidate.y) >= 0))) {
        return false;
      }
    }



    return true;
  }

  placeShip(shipToPlace, customCoords = null) {
    let coords;
    let placementShip = ensureShipHasObjectFormatting(shipToPlace);
    let {x, y, length, orientation} = placementShip;

    if (customCoords) {
      coords = shipToPlace;
    } else {
      coords = getShipCoordinates({x: x, y: y, length: length, orientation: orientation});
    }

    let id = this.currentShipId;

    coords.forEach((coord) => {
      let xCoord = coord[0];
      let yCoord = coord[1];
      let key = `${xCoord},${yCoord}`;

      this.hashedShipCoords.set(key, id);
    });

    let newShip = new Ship({id: id, x: x, y: y, length: length, orientation: orientation});
    this.ships.push(newShip);
    this.currentShipId++;

    return id;
  }
}

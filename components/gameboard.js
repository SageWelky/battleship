import Ship from "./ship.js";

export default class Gameboard {

  constructor(playerTag, type = "human") {

    this.hashedShipCoords = new Map();
    this.numShipsSunk = 0;
    this.ships = [];
    this.currentShipID = 1;
    this.type = type;
    this.thisPlayer = Players[playerTag];
    this.opponentPlayer = playerTag === 0 ? Players[1] : Players[0];

  }

  receiveAttack(xCoord, yCoord) {

    const x = xCoord;
    const y = yCoord;

    const key = `${x},${y}`;

    if(map.get(key)) {

      handleHit(id, key);

      //DOM update
      //set same player startNewTurn

    } else {

      //miss logic

      //DOM update
      //set opponent player startNewTurn
    }
    //return callback of player to target
  }

  handleHit(id, key) {

    let id = map.get(key);
    ships[id - 1].isHit();

    if(ships[id - 1].isSunk()) {

      this.numShipsSunk++;

      if(this.numShipsSunk > 4) {
        //GAME OVER logic here
      }
    }
  }

  placeShip(xCoord, yCoord, length, orientation) {

    id = this.currentShipID;
    let ship`${id}` = new Ship(id, ...arguments);


    let coords = getShipCoordinates(...arguments);

    forEach(let coord of coords) {

      let x = coord[0];
      let y = coord[1];
      let key = `${x},${y}`;
      map.set(key, id);
    }

    this.ships.push(ship`${id}`);
    this.currentShipID++;

  }

  getShipCoordinates(x, y, length, orientation) {

    let coordinates = [];

    if (orientation === 'horizontal') {

      for (let i = 0; i < length; i++) {
        coordinates.push([x + i, y]);
      }

    } else if (orientation === 'vertical') {

      for (let i = 0; i < length; i++) {
        coordinates.push([x, y + i]);
      }

    }

    return coordinates;

  }


}

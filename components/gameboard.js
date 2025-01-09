//0 for nothing there
//-1 for a miss already guessed, and -2 for a hit already guessed
//1-10 for the corresponding unhit ship

export default class Gameboard {

  constructor() {

    this.spaces = [];
    this.numShipsSunk = 0;
    this.startBoard();

    startBoard()
    {
      for(var i=0;i<=9;i++) {

        this.spaces[i]=[];

        for(var j=0;j<=9;j++) {

          this.spaces[i].push(0);

        }
      }
    }


  }

  receiveAttack(xCoord, yCoord) {

    let check = this.space[xCoord][yCoord];

    if(check === 0) {
      this.space[xCoord][yCoord] = -1;
      return ["Miss", check];
    } else if(check < 0) {
      return ["Already guessed", check];
    } else if(check > 0 && check <11) {
      this.space[xCoord][yCoord] = -2;
      return ["Hit", check];
    } else {
      return ["Error", check];
    }
  }

  placeShip(xCoord, yCoord, direction) {
    if(direction === "horizontal") {

    }
    if(direction === "vertical") {

    }
  }

  removeShip(shipNumber) {

  }


}
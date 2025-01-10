import Ship from "./ship.js";

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


//blank board for me
//blank board for my opponent
//place my ships
//they place theirs
//I guess where a ship is on their board
//they check their board to see if my guess hit anything
//They update their board with my guesses' results, and tell me the updated info
//I update my guesses' results on my board
//they guess where a ship is on my board
//I check to see see if their guess hit anything
//I update my board with their guesses results, and share the updated info
//they update their guesses' results on their board

import Gameboard from "../src/components/gameboard";

let gameboard1;

beforeAll(() => {

  gameboard1 = new Gameboard();
  return gameboard1;
  gameboard1.placeShip({x: 3, y: 2, length: 5, orientation: "vertical"});
});

it("Mocks get coordinates", ()=>{

  gameboard1.placeShip({x: 3, y: 2, length: 5, orientation: "vertical"});
  let input = {x: 3, y: 2, length: 5, orientation: "vertical"};
  let coords = gameboard1.getShipCoordinates({...input});
  expect(coords).toEqual([[3, 2], [3, 3], [3, 4], [3, 5], [3, 6]]);
});

it("Mocks ship placement", ()=>{

  expect(gameboard1.placeShip({x: 7, y: 2, length: 5, orientation: "vertical"})).toBe(2);

  let x = 1;
  let y = 1;

  gameboard1.hashedShipCoords.set(`${x},${y}`, 23);
  expect(gameboard1.hashedShipCoords.get(`${x},${y}`)).toBe(23);
  gameboard1.hashedShipCoords.set(`${x},${y}`, undefined);

  x = 4;
  y = 2;
  expect(gameboard1.hashedShipCoords.get(`${x},${y}`)).toBe(undefined);

  x = 3;
  y = 2;
  expect(gameboard1.hashedShipCoords.get(`${x},${y}`)).toBe(1);

  x = 3;
  y = 6;
  expect(gameboard1.hashedShipCoords.get(`${x},${y}`)).toBe(1);
});

it("mocks handle hit", ()=>{

  let x = 3;
  let y = 4;

  expect(gameboard1.ships[0].damage).toBe(0);
  expect(gameboard1.handleHit(`${x},${y}`)).toBe(false);
  expect(gameboard1.ships[0].damage).toBe(1);
  gameboard1.handleHit(`${x},${y}`)
  expect(gameboard1.ships[0].damage).toBe(2);

  expect(gameboard1.ships.length).toBe(2);
  expect(gameboard1.ships[0].id).toBe(1);
  expect(gameboard1.ships[1].id).toBe(2);


  expect(gameboard1.ships[1].damage).toBe(0);
  expect(gameboard1.ships[1].isSunk()).toBe(false);
  expect(gameboard1.numShipsSunk).toBe(0);

  x = 7;
  y = 2
  gameboard1.handleHit(`${x},${y}`);
  expect(gameboard1.ships[1].damage).toBe(1);

  y = 3
  gameboard1.handleHit(`${x},${y}`);
  expect(gameboard1.ships[1].damage).toBe(2);
  y = 4
  gameboard1.handleHit(`${x},${y}`);
  expect(gameboard1.ships[1].damage).toBe(3);
  y = 5
  gameboard1.handleHit(`${x},${y}`);
  expect(gameboard1.ships[1].damage).toBe(4);
  y = 6
  let allSunk = gameboard1.handleHit(`${x},${y}`);
  expect(gameboard1.ships[1].damage).toBe(5);

  expect(gameboard1.ships[1].isSunk()).toBe(true);
  expect(gameboard1.numShipsSunk).toBe(1);
  expect(allSunk).toBe(false);

  gameboard1.numShipsSunk += 4;
  allSunk = gameboard1.handleHit(`${x},${y}`);
  expect(allSunk).toBe(true);

  gameboard1.numShipsSunk = 0;
  gameboard1.ships[1].damage = 0;
});

it("mocks receive attack", ()=>{
  gameboard1.numShipsSunk = 0;
  gameboard1.ships[1].damage = 0;
  expect(gameboard1.numShipsSunk).toBe(0);
  expect(gameboard1.receiveAttack({x: 1, y: 1})).toBe("miss");
  expect(gameboard1.receiveAttack({x: 1, y: 1})).toBe("Validation Error, already guessed");
  expect(gameboard1.receiveAttack({x: 3, y: 4})).toBe("hit");
  gameboard1.numShipsSunk = 4;
  gameboard1.ships[1].damage = 4;
  expect(gameboard1.receiveAttack({x: 7, y: 6})).toBe("All ships sunk");

  gameboard1.numShipsSunk = 0;
  gameboard1.ships[1].damage = 2;

  let a = 1;
  let b = 1;
  let fooBar = `${a},${b}`;
  gameboard1.hashedGuesses.set(fooBar, "foobar");
  expect(gameboard1.receiveAttack({x: 1, y: 1})).toBe("Unexpected error validating guess");
  gameboard1.hashedGuesses.set(fooBar, 1);
});

//Gameboard needs to:


//(A):
//Handle two categories:
//Placement phase coordinates for ships,
//Play phase guess coordinates,
//----------------Notes----------------
//Input differentiation should come in the form of two different function calls
//

//(A.1):
//Placement details:



//(B):
//Store board state:
//0 for nothing there,
//-1 for a miss already guessed, and -2 for a hit already guessed,
//1-10 for the corresponding unhit ship,
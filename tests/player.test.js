import {  Player, CPUPlayer, HumanPlayer } from "../src/components/player";
import Gameboard from "../src/components/gameboard";

describe("CPUPlayer Internal Tests", () => {

  let testCPUPlayer, testOpponentPlayer;
  beforeEach(() => {

    testCPUPlayer = new CPUPlayer();
    testOpponentPlayer = new CPUPlayer();
    testOpponentPlayer.gameboard = new Gameboard();
    testOpponentPlayer.gameboard.receiveAttack = jest.fn().mockReturnValue("hit");

    testCPUPlayer.gameboard = new Gameboard();
  });

  test("setupBoard places ships correctly", () => {
    testCPUPlayer.setupBoard();
    expect(testCPUPlayer.gameboard.ships.length).toBe(5);
    expect([...testCPUPlayer.gameboard.hashedShipCoords.keys()].length).toBe(17);
  });

  test("makeMove calls receiveAttack with valid coordinates", () => {
    let move = testCPUPlayer.makeMove(testOpponentPlayer);

    expect(testOpponentPlayer.gameboard.receiveAttack).toHaveBeenCalledTimes(1);

    const [[attackCoords]] = testOpponentPlayer.gameboard.receiveAttack.mock.calls;
    expect(attackCoords).toHaveProperty("x");
    expect(attackCoords).toHaveProperty("y");
    expect(attackCoords.x).toBeGreaterThanOrEqual(0);
    expect(attackCoords.x).toBeLessThan(10);
    expect(attackCoords.y).toBeGreaterThanOrEqual(0);
    expect(attackCoords.y).toBeLessThan(10);
  });

  test("makeMove does not attack previously guessed coordinates", () => {

    testOpponentPlayer.gameboard.hashedGuesses.set("5,5", 1);
    jest.spyOn(global.Math, "random")
      .mockReturnValueOnce(0.55)
      .mockReturnValueOnce(0.1);

    testCPUPlayer.makeMove(testOpponentPlayer);
    expect(testOpponentPlayer.gameboard.receiveAttack).not.toHaveBeenCalledWith({ x: 5, y: 5 });

    jest.spyOn(global.Math, "random").mockRestore();
  });
});

describe("CPUPlayer Output Tests", () => {
  let testCPUPlayer, testOpponentPlayer;

  beforeEach(() => {
    testCPUPlayer = new CPUPlayer();
    testOpponentPlayer = new CPUPlayer();

    jest.spyOn(testOpponentPlayer.gameboard, "receiveAttack");
  });

  it("returns 'hit' when hitting a ship", () => {
    testOpponentPlayer.gameboard.receiveAttack.mockReturnValue("hit");

    const move = testCPUPlayer.makeMove(testOpponentPlayer);
    expect(move.result).toBe("hit");
  });

  it("returns 'miss' when missing a ship", () => {
    testOpponentPlayer.gameboard.receiveAttack.mockReturnValue("miss");

    const move = testCPUPlayer.makeMove(testOpponentPlayer);
    expect(move.result).toBe("miss");
  });

  it("returns 'Validation Error, already guessed' for duplicate guess", () => {
    testOpponentPlayer.gameboard.receiveAttack.mockReturnValue("Validation Error, already guessed");

    const move = testCPUPlayer.makeMove(testOpponentPlayer);
    expect(move.result).toBe("Validation Error, already guessed");
  });

  it("returns 'All ships sunk' when the last ship is destroyed", () => {
    testOpponentPlayer.gameboard.receiveAttack.mockReturnValue("All ships sunk");

    const move = testCPUPlayer.makeMove(testOpponentPlayer);
    expect(move.result).toBe("All ships sunk");
  });

  it("returns 'Unexpected error validating guess' on an unaccounted for issue processing move", () => {
    testOpponentPlayer.gameboard.receiveAttack.mockReturnValue("Unexpected error processing guess");

    const move = testCPUPlayer.makeMove(testOpponentPlayer);
    expect(move.result).toBe("Unexpected error processing guess");
  });
});

it("tests creating a human player", () => {

  let testHumanPlayer = new HumanPlayer();


  let foo = "bar";
  expect(testHumanPlayer instanceof Player).toBe(true);
})
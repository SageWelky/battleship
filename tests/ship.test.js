import {jest} from '@jest/globals';
import Ship from "../components/ship";

let ship1;

beforeAll(() => {
  ship1 = new Ship(7, 5);
  return ship1;
});

it("mock ship id", () => {

  expect(ship1.id).toBe(7);

})

it("mock ship length", () => {

  expect(ship1.length).toBe(5);

})

it("mock ship hit and isSunk", () => {

  expect(ship1.isSunk()).toBe(false);
  expect(ship1.hit).toBe(0);
  for(let i = 0; i < 5; i++) {
    ship1.isHit();
  }
  expect(ship1.isSunk()).toBe(true);
  expect(ship1.hit).toBe(5);

})
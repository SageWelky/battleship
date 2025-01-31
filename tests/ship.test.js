import {jest} from '@jest/globals';
import Ship from "../src/components/ship";

let ship1;

beforeAll(() => {
  ship1 = new Ship({id:7, x: 9, y: 8, length: 5});
  return ship1;
});

it("tests ship id", () => {

  expect(ship1.id).toBe(7);

})

it("tests ship length", () => {

  expect(ship1.length).toBe(5);

})

it("tests ship hit and isSunk", () => {

  expect(ship1.isSunk()).toBe(false);
  expect(ship1.damage).toBe(0);
  for(let i = 0; i < 5; i++) {
    ship1.hit();
  }
  expect(ship1.isSunk()).toBe(true);
  expect(ship1.damage).toBe(5);

})
import { animateAppend } from "../helpers/animateAppend";
import { makeCached } from "../helpers/makeCached";
import { getShipCoordinates } from "../helpers/shipHelpers.js";
import { ensureShipHasObjectFormatting } from "../helpers/shipHelpers.js";

export async function generateBoardTiles({startingOwnerId,
                                    startingOwnerType = "board",
                                    numberOfSquaresPerSide = 10,
                                    eventualOwnerId = null,
                                    eventualOnwerType = startingOwnerType}, cachedIndex = 0) {
  //Designed to alternatively take a number startingOwnerId and type to make it 'forEach'-able.
  //Can also split between initial and eventual targets, and customization of parameters.
  //Input format:
  // {startingOwnerId: <string | number>, optionalArgOne: <value>, ..., optionalArgN: <value> }
  let correspondingAppendTarget;
  let namingText;

  if (typeof startingOwnerId === "string") {
    correspondingAppendTarget = document.getElementById(`${startingOwnerId}`);
  } else if (typeof startingOwnerId === "number") {
    correspondingAppendTarget = document.getElementById(`${startingOwnerType}-${startingOwnerId}`);
  }

  if (!eventualOwnerId) {
    eventualOwnerId = startingOwnerId;
  }

  if (typeof eventualOwnerId === "string") {
    namingText = `${eventualOwnerId}`;
  } else if ((typeof eventualOwnerId === "number")) {
    namingText = `${eventualOwnerType}-${eventualOwnerId}`;
  }

  let div;

  let y = 0;
  while ( y < numberOfSquaresPerSide ) {
    for ( let x = 0; x < numberOfSquaresPerSide; x++ ) {
      let gridId = `${x},${y}`;
      div = document.createElement('div');
      div.setAttribute('id', `${namingText}-tile-${gridId}`);
      div.classList.add('grid-tile');
      div.style.gridRow = `${(numberOfSquaresPerSide - y) + 0}`;
      div.style.gridColumn = `${x + 1}`;
      // div.style.width = `${100.00 / numberOfSquaresPerSide}cqw`;
      // div.style.height = `${100.00 / numberOfSquaresPerSide}cqw`;
      //div.style.viewTransitionName = `${namingText}-tile-${((x + 1) + (y * 10)) + cachedIndex}`;
      correspondingAppendTarget.appendChild(div);
      // (x % 5) === 0 ? await delay(100) : null;
    }
    y++;
  }
  return div.style.viewTransitionName;
}

export const generateBoardTilesCached = makeCached(generateBoardTiles);


export function createShipImage(length, shipId, appendTarget, playerId) {
  let ship = document.createElement('div');
  ship.classList.add('ship');
  ship.classList.add(`player-${playerId}-ship`);

  ship.style.setProperty('--ship-length', length);
  ship.dataset.length = length;

  ship.style.setProperty('id', `player-${playerId}-ship-${shipId}`);
  ship.dataset.shipId = shipId;

  document.getElementById(appendTarget).appendChild(ship);
  return ship;
}

export function placeShipImageOnBoard(shipToAppend, appendTarget, numberOfSquaresPerSide = 10) {
  let placementShipImage = ensureShipHasObjectFormatting(shipToAppend);
  let {x, y, length, orientation} = placementShipImage;

  let ship = shipToAppend;

  x = parseInt(x);
  y = parseInt(y);
  length = parseInt(length);


  //We add 1 because the gridlines start at 1 and our coordinates start at 0.
  //Gridlines needed for 'n' areas is 'n + 1', thus our start index is like 'tare weight' for length.
  if (orientation === "horizontal") {
    y = numberOfSquaresPerSide - y - 1;
    ship.style.gridRow = `${y + 1} / span 1`;
    ship.style.gridColumn = `${x + 1} / span ${length}`;
  } else if (orientation === "vertical") {
    y = numberOfSquaresPerSide - y - length;
    ship.style.gridRow = `${y + 1} / span ${length}`;
    ship.style.gridColumn = `${x + 1} / span 1`;
    ship.classList.add('vertical');
  }
  document.getElementById(appendTarget).appendChild(ship);
  return ship;
}
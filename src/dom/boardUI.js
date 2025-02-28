import { animateAppend } from "../helpers/animateAppend";
import { makeCached } from "../helpers/makeCached";

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
      div.style.gridRow = `${y + 1}`;
      div.style.gridColumn = `${x + 1}`;
      // div.style.width = `${100.00 / numberOfSquaresPerSide}cqw`;
      // div.style.height = `${100.00 / numberOfSquaresPerSide}cqw`;
      div.style.viewTransitionName = `${namingText}-tile-${((x + 1) + (y * 10)) + cachedIndex}`;
      correspondingAppendTarget.appendChild(div);
      // (x % 5) === 0 ? await delay(100) : null;
    }
    y++;
  }
  return div.style.viewTransitionName;
}

export const generateBoardTilesCached = makeCached(generateBoardTiles);


export async function boardGridTileSet(boardId) {
  let y = 0;
  while ( y < 10 ) {
    for ( let x = 0; x < 10; x++ ) {
      let gridId = `${x},${y}`;
      document.getElementById(`board-${boardId}`).appendChild(document.getElementById(`board-${boardId}-tile-${gridId}`));
    }
    y++;
  }
}
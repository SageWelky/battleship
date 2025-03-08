import { placeShipImageOnBoard } from "./boardUI";

function updateTileAppearance(move, opponent) {
    let tileBoardId = opponent.id;
    let tile = document.getElementById(`board-${tileBoardId}-tile-${move.key}`);

    if (move.result === "Hit!"
        || move.result === "Ship sunk!!"
        || move.result === "All ships sunk!!!") {
        tile.classList.add('hit');
        tile.classList.add(`player-${opponent.id}-ship-${move.shipId}`);
    } else if (move.result === "Miss") {
        tile.classList.add('miss');
    }

    if (move?.sunkShipId) {
        // placeShipImageOnBoard(opponent.ships[move.sunkShipId - 1], `board-${tileBoardId}`);
        const sunkShipTiles = document.querySelectorAll(`.player-${opponent.id}-ship-${move.sunkShipId}`);
        //NEED TO COME BACK TO THIS!!
        //SET THIS TO A DATASET INSTEAD!! SAME WITH HIT AND MISS, DONT FORGET
        sunkShipTiles.forEach(tile => tile.classList.add('sunk'));
    }
}

function updateHeaderInfo(move) {
    const infoContainer = document.querySelector('#player-display');
    if (infoContainer) {
        infoContainer.textContent = move.result;
    }
}

function updatePlayerHealth(opponent) {
    const playerHealth = document.querySelector(`#player-${opponent.id}-health-value`);
    if (playerHealth) {
        playerHealth.textContent = `${5 - opponent.gameboard.numShipsSunk}`;
    }
}

export function handleDisplayUpdate(payload) {
  if (payload.uiPayloadType === "turn") {
    updateTileAppearance(payload.move, payload.opponent);
    updateHeaderInfo(payload.move);
    updatePlayerHealth(payload.opponent);
  }
}

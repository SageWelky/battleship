function updateTileAppearance(move, opponent) {
    let tileBoardId = (opponent.id === 1) ? 2 : 1;
    let tile = document.getElementById(`board-${tileBoardId}-tile-${move.key}`);
    console.log(`Tile Target: board-${tileBoardId}-tile-${move.key}`);
    console.log(`Tile Result: ${tile}`);

    if (move.result === "Hit!"
        || move.result === "Ship sunk!!"
        || move.result === "All ships sunk!!!") {
        tile.classList.add("hit");
    } else if (move.result === "Miss") {
        tile.classList.add("miss");
    }

    if (move?.sunkShipId) {
        placeShipImageOnBoard(opponent.ships[move.sunkShipId - 1], `board-${tileBoardId}`);
        //const sunkShipTiles = document.querySelectorAll(`[data-ship-id='${move.sunkShipId}']`);
        //NEED TO COME BACK TO THIS!!
        //SET THIS TO A DATASET INSTEAD!! SAME WITH HIT AND MISS, DONT FORGET
        sunkShipTiles.forEach(tile => tile.classList.add("sunk"));
    }
}

function updateHeaderInfo(stateInstructions) {
    const infoContainer = document.querySelector('#info-container');
    if (infoContainer) {
        infoContainer.textContent = move.result;
    }
}

function updatePlayerHealth(opponent) {
    const playerHealth = document.querySelector('#player-health');
    if (playerHealth) {
        playerHealth.textContent = `Player ${opponent.id} Health: ${5 - opponent.gameboard.numShipsSunk}`;
    }
}

export function handleDisplayUpdate(payload) {
  if (payload.type === "turn") {
    updateTileAppearance(payload.move, payload.opponent);
    updateHeaderInfo(payload.move);
    updatePlayerHealth(payload.opponent);
  }
}

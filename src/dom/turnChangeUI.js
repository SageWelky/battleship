export function updateUIForTurn(player, opponent) {

  let playerDisplay = document.getElementById(`player-display`);
  //Make sure player-display has: data-player-id = "none" both on startup and reset.
  let lastPlayerId = playerDisplay.dataset.playerId;
  playerDisplay.dataset.playerId = `${player.id}`

  if (lastPlayer !== `${player.id}`){
    let activeBoard = document.getElementById(`board-${player.id}`);
    let opponentBoard = document.getElementById(`board-${opponent.id}`);

    if (!player.isCPU && !opponent.isCPU) {
      opponentBoard.classList.add("hidden");
      showTurnModal();
      activeBoard.classList.remove("hidden");
    }

    document.querySelectorAll(".board").forEach(board => board.classList.remove("active"));
    activeBoard.classList.add("active");
  }
}

//Write a turn modal HTML into the playScreen content insertion.
function showTurnModal() {
  let modal = document.getElementById("turn-modal");
  modal.style.display = "block";

  document.getElementById("continue-turn").onclick = () => {
    modal.style.display = "none";
  };
}
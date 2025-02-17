export function updateUIForTurn(activePlayer, opponent) {

  let activePlayerDisplay = document.getElementById(`player-display`);
  //Make sure player-display has: data-player-id = 'none' both on startup and reset.
  let lastPlayerId = activePlayerDisplay.dataset.playerId;
  activePlayerDisplay.dataset.playerId = `${activePlayer.id}`

  if (lastPlayerId !== `${activePlayer.id}`){
    let activeBoard = document.getElementById(`board-${activePlayer.id}`);
    let opponentBoard = document.getElementById(`board-${opponent.id}`);

    if (!activePlayer && !opponent.isCPU) {
      opponentBoard.classList.add('hidden');
      showTurnModal();
      activeBoard.classList.remove('hidden');
    }

    document.querySelectorAll('.board').forEach(board => board.classList.remove('active'));
    activeBoard.classList.add('active');
  }
}

//Write a turn modal HTML into the playScreen content insertion.
function showTurnModal() {
  let modal = document.getElementById('turn-modal');
  modal.classList.add('open');;

  document.getElementById('continue-turn').onclick = () => {
    modal.classList.remove('open');;
  };
}
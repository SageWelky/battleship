import { logCallStackSize } from "../helpers/debug";

export function updateUIForTurn(activePlayer, opponent, stateMachineInstance) {

  let activePlayerDisplay = document.getElementById(`player-display`);
  //Make sure player-display has: data-player-id = 'none' both on startup and reset.
  let lastPlayerId = activePlayerDisplay.dataset.playerId;
  activePlayerDisplay.dataset.playerId = activePlayer.id;

  if (lastPlayerId !== toString(activePlayer.id)){
    let activeBoard = document.getElementById(`board-${activePlayer.id}`);
    let opponentBoard = document.getElementById(`board-${opponent.id}`);

    if (!activePlayer.isCPU && !opponent.isCPU) {
      stateMachineInstance.pause();
      opponentBoard.classList.add('hidden');
      showTurnModal(activePlayer, opponent, stateMachineInstance);
      activeBoard.classList.remove('hidden');
    }

    document.querySelectorAll('.board').forEach(board => board.classList.remove('active'));
    activeBoard.classList.add('active');
  }
}

//Write a turn modal HTML into the playScreen content insertion.
function showTurnModal(activePlayer, opponent, stateMachineInstance) {
  const playerId = activePlayer.id;
  const uiPlayerBoard = document.getElementById(`board-${playerId}`);
  const modal = document.getElementById('turn-modal');

  modal.style.display = 'grid';
  console.log("Turn Modal Visible");

  uiPlayerBoard.querySelectorAll(`.player-${playerId}-ship`).forEach((ship) => {
    ship.classList.add('fog-of-war');
  });

  document.getElementById('turn-modal').onclick = () => {
    stateMachineInstance.resume();
    modal.style.display = 'none';
    setTimeout(() => {
      stateMachineInstance.runQueue();
    }, 600);
  };
}
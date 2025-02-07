export function loadPlayScreen(inputObject = {playerOneType: false, playerTwoType: true}) {
  //Swap to hardcoding this later.
  const content = document.getElementById('content');
  content.replaceChildren();
  content.innerHTML =
  `
  <div id="player-display" data-player-id="none"></div>
  <div class="board" id="board-1"></div>
  <div class="board" id="board-2"></div>
  `;
}

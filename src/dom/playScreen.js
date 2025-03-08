import { closePtmModal } from "./ptmModal";
import { generateBoardTilesCached } from "./boardUI";
import { placeShipImageOnBoard } from "./boardUI";

export async function loadPlayScreen(inputObject = {playerOneType: false, playerTwoType: true}) {
  const splashTitle = document.getElementById('title-splash');
  const playScreenTitle = document.getElementById('play-screen-title');
  const allBoardsContainer = document.getElementById('player-boards');
  const ptmPlayerOneContainer = document.getElementById('ptm-player-one-container');
  const ptmPlayerTwoContainer = document.getElementById('ptm-player-two-container');
  const boardOne = document.getElementById('board-1');
  const boardTwo = document.getElementById('board-2');
  let playerId = 1;

  allBoardsContainer.style.viewTransitionName = 'boards';
  splashTitle.style.viewTransitionName = 'title';
  playScreenTitle.style.viewTransitionName = 'title';
  ptmPlayerOneContainer.style.viewTransitionName = 'left';
  boardOne.style.viewTransitionName = 'left';
  ptmPlayerTwoContainer.style.viewTransitionName = 'right';
  boardTwo.style.viewTransitionName = 'right';

  ptmPlayerOneContainer.style.zIndex = 999;
  ptmPlayerTwoContainer.style.zIndex = 999;

  if (!document.startViewTransition) {
    document.getElementById('play-screen').style.display = 'grid';
    document.getElementById('player-type-modal').style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
  } else {
    let transition = document.startViewTransition(() => {
      document.getElementById('play-screen').style.display = 'grid';
      document.getElementById('player-type-modal').style.display = 'none';
      document.getElementById('start-screen').style.display = 'none';
    });
    await transition.finished;
  }

  ptmPlayerOneContainer.style.zIndex = '';
  ptmPlayerTwoContainer.style.zIndex = '';

  setTimeout(() => {
    splashTitle.style.viewTransitionName = '';
    playScreenTitle.style.viewTransitionName = '';

    ptmPlayerOneContainer.style.viewTransitionName = '';
    // boardOne.style.viewTransitionName = '';

    ptmPlayerTwoContainer.style.viewTransitionName = '';
    // boardTwo.style.viewTransitionName = '';
  }, 100);

  generateBoardTilesCached({startingOwnerId: 'board-1'});
  generateBoardTilesCached({startingOwnerId: 'board-2'});

}
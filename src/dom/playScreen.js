import { closePtmModal } from "./ptmModal";

export async function loadPlayScreen(inputObject = {playerOneType: false, playerTwoType: true}) {
  const splashTitle = document.getElementById('title-splash');
  const playScreenTitle = document.getElementById('play-screen-title');
  const ptmPlayerOneContainer = document.getElementById('ptm-player-one-container');
  const ptmPlayerTwoContainer = document.getElementById('ptm-player-two-container');
  const boardOne = document.getElementById('board-1');
  const boardTwo = document.getElementById('board-2');

  splashTitle.style.viewTransitionName = 'title';
  playScreenTitle.style.viewTransitionName = 'title';
  ptmPlayerOneContainer.style.viewTransitionName = 'left';
  boardOne.style.viewTransitionName = 'left';
  ptmPlayerTwoContainer.style.viewTransitionName = 'right';
  boardTwo.style.viewTransitionName = 'right';

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
    await transition.finishd;
  }

  setTimeout(() => {
    splashTitle.style.viewTransitionName = '';
    playScreenTitle.style.viewTransitionName = '';

    ptmPlayerOneContainer.style.viewTransitionName = '';
    boardOne.style.viewTransitionName = '';

    ptmPlayerTwoContainer.style.viewTransitionName = '';
    boardTwo.style.viewTransitionName = '';
  }, 500);
}

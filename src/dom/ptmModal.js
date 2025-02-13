export function openPtmModal(firstLaunch) {

  //Replace with proper construction later on.
  const ptmModal = document.getElementById('player-type-modal');
  ptmModal.style.display = 'grid';

  //player selection logic here:
  return new Promise((resolve) => {
    let ptmConfirmButton = document.querySelector( '#ptm-confirm-button' );
    let ptmPlayerOneContainer = document.querySelector( '#ptm-player-one-container' );
    let ptmPlayerTwoContainer = document.querySelector( '#ptm-player-two-container' );

    function setPlayerType(event) {
      event.target.closest('.ptm-container').querySelectorAll('.ptm-option')
      .forEach( option => option.classList.remove('active'));

      if (!document.startViewTransition) {
        event.target.closest('.ptm-option').classList.add('active');
      } else {
        //document.startViewTransition(() => {
          event.target.closest('.ptm-option').classList.add('active');
        //});
      }
    }

    function retreivePlayerTypes(firstLaunch) {
      let playerOne = ptmPlayerOneContainer.querySelector('.active').dataset.iscpu === 'true';
      let playerTwo = ptmPlayerTwoContainer.querySelector('.active').dataset.iscpu === 'true';

      document.querySelectorAll('.ptm-option')
      .forEach(option => option.removeEventListener('click', setPlayerType));
      ptmConfirmButton.removeEventListener('click', () => retreivePlayerTypes(firstLaunch));
      if (!firstLaunch) {
        closePtmModal();
      }

      resolve({ p1isCPU: playerOne, p2isCPU: playerTwo});
    }

    document.querySelectorAll('.ptm-option')
    .forEach(option => option.addEventListener('click', setPlayerType));

    ptmConfirmButton.addEventListener('click', () => retreivePlayerTypes(firstLaunch));
  });
}

export function closePtmModal() {
  const ptmModal = document.getElementById('player-type-modal');
  if (!document.startViewTransition) {
    ptmModal.style.display = 'none';
  } else {
    document.startViewTransition(() => {
      ptmModal.style.display = 'none';
    });
  }
}
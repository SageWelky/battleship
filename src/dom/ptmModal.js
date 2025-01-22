export function openPtmModal() {

  //display modal logic here:
  //NEEDS TO BE WRITTEN

  //player selection logic here:
  return new Promise((resolve) => {
    let playerTypeModal = document.querySelector( "#player-type-modal" );
    let ptmConfirmButton = document.querySelector( "#ptm-confirm-button" );
    let ptmPlayerOneContainer = document.querySelector( "#ptm-player-one-container" );
    let ptmPlayerTwoContainer = document.querySelector( "#ptm-player-two-container" );

    //Defaults to singleplayer.
    let leftPlayer = false;
    let rightPlayer = true;

    function retreivePlayerTypes(leftPlayer, rightPlayer) {
      leftPlayer = ptmPlayerOneContainer.dataset.is-cpu === "true";
      rightPlayer = ptmPlayerOneContainer.dataset.is-cpu === "true";
    }

    ptmConfirmButton.addEventListener("click", retreivePlayerTypes(leftPlayer, rightPlayer));

    closePtmModal()
    ptmConfirmButton.removeEventListener("click", retreivePlayerTypes);
    resolve({ p1isCPU: leftPlayer, p2isCPU: rightPlayer});
  });

}

function closePtmModal() {
  //NEEDS TO BE WRITTEN
}
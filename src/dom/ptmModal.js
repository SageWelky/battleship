export function openPtmModal() {

  //display modal logic here:
  //NEEDS TO BE WRITTEN

  //player selection logic here:
  return new Promise((resolve) => {
    let playerTypeModal = document.querySelector( "#player-type-modal" );
    let ptmConfirmButton = document.querySelector( "#ptm-confirm-button" );
    let ptmPlayerOneContainer = document.querySelector( "#ptm-player-one-container" );
    let ptmPlayerTwoContainer = document.querySelector( "#ptm-player-two-container" );\

    playerTypeModal.style.display = "block";

    function retreivePlayerTypes() {

      let playerOne = ptmPlayerOneContainer.dataset.iscpu === "true";
      let playerTwo = ptmPlayerTwoContainer.dataset.iscpu === "true";

      ptmConfirmButton.removeEventListener("click", retreivePlayerTypes);
      playerTypeModal.style.display = "none";

      resolve({ p1isCPU: playerOne, p2isCPU: playerTwo});
    }

    ptmConfirmButton.addEventListener("click", retreivePlayerTypes);
  });
}

function closePtmModal() {
  let playerTypeModal = document.querySelector("#player-type-modal");
  playerTypeModal.style.display = "none";
}
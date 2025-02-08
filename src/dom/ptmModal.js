export function openPtmModal() {

  //Replace with proper construction later on.
  const ptmModal = document.getElementById("player-type-modal");
  if (!document.startViewTransition) {
    ptmModal.classList.add("open");
  } else {
    document.startViewTransition(() => ptmModal.classList.add("open"));
  }

  //player selection logic here:
  return new Promise((resolve) => {
    let ptmConfirmButton = document.querySelector( "#ptm-confirm-button" );
    let ptmPlayerOneContainer = document.querySelector( "#ptm-player-one-container" );
    let ptmPlayerTwoContainer = document.querySelector( "#ptm-player-two-container" );

    function setPlayerType(event) {
      event.target.closest(".ptm-container").querySelectorAll(".ptm-option")
      .forEach( option => option.classList.remove("active"));

      if (!document.startViewTransition) {
        event.target.closest(".ptm-option").classList.add("active");
      } else {
        document.startViewTransition(() => {
          event.target.closest(".ptm-option").classList.add("active");
        });
      }
    }

    function retreivePlayerTypes() {
      let playerOne = ptmPlayerOneContainer.querySelector(".active").dataset.iscpu === "true";
      let playerTwo = ptmPlayerTwoContainer.querySelector(".active").dataset.iscpu === "true";

      document.querySelectorAll(".ptm-option")
      .forEach(option => option.removeEventListener("click", setPlayerType));
      ptmConfirmButton.removeEventListener("click", retreivePlayerTypes);
      closePtmModal();

      resolve({ p1isCPU: playerOne, p2isCPU: playerTwo});
    }

    document.querySelectorAll(".ptm-option")
    .forEach(option => option.addEventListener("click", setPlayerType));

    ptmConfirmButton.addEventListener("click", retreivePlayerTypes);
  });
}

function closePtmModal() {
  const ptmModal = document.getElementById("player-type-modal");

  if (!document.startViewTransition) {
    ptmModal.classList.remove("open");
  } else {
    document.startViewTransition(() => {
      ptmModal.classList.remove("open");
    });
  }
}
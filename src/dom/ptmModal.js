export function openPtmModal() {

  //display modal logic here:
  //NEEDS TO BE WRITTEN
  const modalAnchor = document.getElementById('modal-anchor');
  modalAnchor.innerHTML =
  `
  <div class="player-type-modal">

    <div class="ptm-container" id="ptm-player-one-container">

      <div class="ptm-option active" data-iscpu="false">Human</div>
      <div class="ptm-option" data-iscpu="true">CPU</div>

    </div>

    <div class="ptm-container" id="ptm-player-two-container">

      <<div class="ptm-option" data-iscpu="false">Human</div>
      <div class="ptm-option active" data-iscpu="true">CPU</div>

    </div>

    <button id="ptm-confirm-button">Confirm</button>

  </div>
  `;

  //player selection logic here:
  return new Promise((resolve) => {
    let ptmConfirmButton = document.querySelector( "#ptm-confirm-button" );
    let ptmPlayerOneContainer = document.querySelector( "#ptm-player-one-container" );
    let ptmPlayerTwoContainer = document.querySelector( "#ptm-player-two-container" );

    function setPlayerType(event) {
      event.target.closest(".ptm-container").querySelectorAll(".ptm-option")
      .forEach( option => option.classList.remove("active"));
      event.target.closest(".ptm-option").classList.add("active");
    }

    document.querySelectorAll(".ptm-option")
    .forEach(option => option.addEventListener("click", setPlayerType));

    function retreivePlayerTypes() {
      let playerOne = ptmPlayerOneContainer.querySelector(".active").dataset.iscpu === "true";
      let playerTwo = ptmPlayerTwoContainer.querySelector(".active").dataset.iscpu === "true";

      document.querySelectorAll(".ptm-option")
      .forEach(option => option.removeEventListener("click", setPlayerType));
      ptmConfirmButton.removeEventListener("click", retreivePlayerTypes);
      closePtmModal();

      resolve({ p1isCPU: playerOne, p2isCPU: playerTwo});
    }

    ptmConfirmButton.addEventListener("click", retreivePlayerTypes);
  });
}

function closePtmModal() {
  const modalAnchor = document.getElementById('modal-anchor');
  modalAnchor.replaceChildren();
}
import Gameboard from "./gameboard";
import { createShipImage, placeShipImageOnBoard } from "../dom/boardUI";
import { battleshipGameBox } from "../definitions/boardgamePieces";
import { ensureShipHasObjectFormatting, getShipCoordinates } from "../helpers/shipHelpers.js";
import { delayTime } from "../helpers/delay.js";

class Player {
  constructor(id) {
    this.id = id;
    this.isSetupComplete = false;
    this.isCPU = false;
    this.allSunk = false;
    this.gameboard = new Gameboard();
  }

  setupBoard(stateMachineInstance) {
    throw new Error("setupBoard() must be implemented");
  }

  makeMove() {
    throw new Error("makeMove() must be implemented");
  }

  resetState() {
    this.gameboard = new Gameboard();
  }

};


class CPUPlayer extends Player {

  constructor(id) {
    super(id);
    this.isCPU = true;
    this.isSetupComplete = false;
  }

  setupBoard(stateMachineInstance, numberOfSquaresPerSide = 10) {
    const shipLengths = battleshipGameBox.ships.shipLengths;
    const uiPlayerBoard = document.getElementById(`board-${this.id}`);

    const setupShip = (shipLength) => {
      let currentShip = {};
      currentShip.length = shipLength;
      currentShip.orientation = "";
      currentShip.x;
      currentShip.y;
      currentShip.coordinates = [];

      do {
        currentShip.orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
        if (currentShip.orientation === "horizontal") {
          currentShip.x = Math.floor(Math.random() * (10 - shipLength));
          currentShip.y = Math.floor(Math.random() * 10);
        } else if (currentShip.orientation === "vertical") {
          currentShip.x = Math.floor(Math.random() * 10);
          currentShip.y = Math.floor(Math.random() * (10 - shipLength));
        }

        currentShip.coordinates = getShipCoordinates(currentShip);

      } while (!this.gameboard.canPlaceShip(currentShip));

      this.gameboard.placeShip(currentShip);
    };

    shipLengths.forEach(setupShip);
    uiPlayerBoard.classList.add('ready');
    this.isSetupComplete = true;
    return 5;
  }

  makeMove(opponent) {
    let x, y;
    let move = {};

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (opponent.gameboard.hashedGuesses.has(`${x},${y}`));

    move = opponent.gameboard.receiveAttack({x: x, y: y});
    if (move.result === "All ships sunk!!!") {
      this.allSunk = true;
    }
    delayTime(2000);
    return move;
  }

}


class HumanPlayer extends Player {

  constructor(id) {
    super(id);
    this.isCPU = false;
    this.isSetupComplete = false;
  }

  setupBoard(stateMachineInstance, numberOfSquaresPerSide = 10) {
    const currentPlayer = this;

    let footerInfoContainer = document.getElementById('footer-info-container');
    footerInfoContainer.innerHTML = '';

    let ul = document.createElement('ul');
    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    ul.setAttribute('id', 'setup-instructions-list');
    ul.classList.add('info-ul');
    li1.setAttribute('id', 'placement-instructions');
    li2.setAttribute('id', 'rotate-instructions');
    li1.textContent = 'Drag and Drop Ships to Place Them.';
    li2.textContent = 'Press "R" on the Keyboard to Rotate Your Pieces.';

    ul.appendChild(li1);
    ul.appendChild(li2);
    footerInfoContainer.appendChild(ul);

    return new Promise((resolve) => {
      const opponentId = this.id === 1 ? 2 : 1;
      const playerId = this.id;
      const logicPlayerBoard = this.gameboard;
      const uiPlayerBoard = document.getElementById(`board-${playerId}`);
      const shipLengths = battleshipGameBox.ships.shipLengths;
      const shipDomIds = battleshipGameBox.ships.shipDomIds;

      const allBoardsContainer = document.getElementById('player-boards');
      const side = document.getElementById(`player-${playerId}-pc-side`);
      const lower = document.getElementById(`player-${playerId}-pc-lower`);
      const opponentContainer = document.getElementById(`player-${opponentId}-container`);
      const playerContainer = document.getElementById(`player-${playerId}-container`);
      side.style.viewTransitionName = 'side';
      lower.style.viewTransitionName = 'lower';
      allBoardsContainer.style.viewTransitionName = 'boards';

      let offsetFromMouse;
      let placedShips = 0;
      let currentDraggablePiece;


      async function transitionInSetup() {

        if (!document.startViewTransition) {
          opponentContainer.classList.add('setup-opponent');
          side.style.width = '45cqh';
          allBoardsContainer.classList.add('setup');
          playerContainer.classList.add('setup');
          primeDraggablesAndContainers(playerId);
        } else {

          let transition = document.startViewTransition(() => {
            opponentContainer.classList.add('setup-opponent');
            allBoardsContainer.classList.add('setup');
            playerContainer.classList.add('setup');
            side.style.width = '45cqh';
          });
          await transition.finished;
          primeDraggablesAndContainers(playerId);
        }
      }

      async function transitionOutSetup() {

        if (!document.startViewTransition) {
          opponentContainer.classList.remove('setup-opponent');
          side.style.width = '17cqh';
          allBoardsContainer.classList.remove('setup');
          playerContainer.classList.remove('setup');
        } else {

          let transition = document.startViewTransition(() => {
            opponentContainer.classList.remove('setup-opponent');
            allBoardsContainer.classList.remove('setup');
            playerContainer.classList.remove('setup');
            side.style.width = '17cqh';
          });
          await transition.finished;
        }
        side.style.viewTransitionName = `side${playerId}`;
        lower.style.viewTransitionName = `lower${playerId}`;
      }

      transitionInSetup();
      document.addEventListener("keyup", rotate);

      function rotate(event) {
        event = event || window.event;
        if (event.which === 82) {
          event.preventDefault();
          let pieces = document.querySelectorAll('.draggable');
          pieces.forEach((piece) => piece.classList.toggle('vertical'));
        }
      }

      function primeDraggablesAndContainers(playerId) {
        uiPlayerBoard.querySelectorAll('.grid-tile').forEach((tile) => {
          tile.addEventListener('dragover', (e) => dragOver(e));
          tile.addEventListener('drop', (e) => dragDrop(e, logicPlayerBoard));
          tile.addEventListener('dragenter', (e) => dragEnter(e, logicPlayerBoard));
        });

        for (let i = 0; i < shipDomIds.length; i++) {
          let ship = createShipImage(shipLengths[i], shipDomIds[i], `player-${playerId}-pc-side`, playerId);
          ship.ondragstart = onDragStart;
          ship.ondragend = onDragEnd;
          ship.draggable = true;
          ship.classList.add('draggable');
          ship.classList.add('vertical');
        }
      }

      function onDragStart(e) {
        currentDraggablePiece = e.target;
        let dragShipId = e.target.id;
        let numberOfIncrements = e.target.dataset.length;
        let mousePosition;
        let targetEdge;
        let size;
        e.target.dataset.placed = 'false';

        setTimeout(function(){
          e.target.classList.add('hide-draggable-ghost');
        });

        if (currentDraggablePiece.classList.contains('vertical')) {
          mousePosition = e.clientY;
          targetEdge = e.target.getBoundingClientRect().top;
          size = e.target.offsetHeight;
          e.target.dataset.offsetFromMouse = numberOfIncrements - Math.floor((mousePosition - targetEdge) / (size / numberOfIncrements)) - 1;
        } else {
          mousePosition = e.clientX;
          targetEdge = e.target.offsetLeft;
          size = e.target.offsetWidth;
          e.target.dataset.offsetFromMouse = Math.floor((mousePosition - targetEdge) / (size / numberOfIncrements));
        }

        e.dataTransfer.setData('text', dragShipId);
      }

      function dragEnter(event, logicPlayerBoard) {
        const gridTile = event.target;
        let shipElement = currentDraggablePiece;

        shipElement.dataset.x = gridTile.id.slice(-3, -2);
        shipElement.dataset.y = gridTile.id.slice(-1);
        shipElement.dataset.orientation = shipElement.classList.contains('vertical') ? 'vertical' : 'horizontal';

        shipElement.dataset.x = (shipElement.dataset.orientation !== 'vertical') ? shipElement.dataset.x - parseInt(shipElement.dataset.offsetFromMouse) : shipElement.dataset.x;
        shipElement.dataset.y = (shipElement.dataset.orientation === 'vertical') ? shipElement.dataset.y - parseInt(shipElement.dataset.offsetFromMouse) : shipElement.dataset.y;

        let coordinates = getShipCoordinates(shipElement);

        uiPlayerBoard.querySelectorAll('.can-drop').forEach((tile) => tile.classList.remove('can-drop'));
        uiPlayerBoard.querySelectorAll('.can-not-drop').forEach((tile) => tile.classList.remove('can-not-drop'));

        if (logicPlayerBoard.canPlaceShip(shipElement, false)) {
          coordinates.forEach((coordinatePair) => {
            let gridTileX = coordinatePair[0];
            let gridTileY = coordinatePair[1];
            let overlappedTile = document.getElementById(`board-${playerId}-tile-${gridTileX},${gridTileY}`);
            overlappedTile?.classList.add('can-drop');
          });
        } else {
          coordinates.forEach((coordinatePair) => {
            let gridTileX = coordinatePair[0];
            let gridTileY = coordinatePair[1];
            let overlappedTile = document.getElementById(`board-${playerId}-tile-${gridTileX},${gridTileY}`);
            overlappedTile?.classList.add('can-not-drop');
          });
        }
      }

      function dragOver(event) {
        event.preventDefault();
      }

      function dragDrop(e, logicPlayerBoard) {
        if (logicPlayerBoard.canPlaceShip(currentDraggablePiece, false)) {
          placeShipImageOnBoard(currentDraggablePiece, `board-${playerId}`);
          placedShips++;
          currentDraggablePiece.dataset.placed = 'true';
          currentDraggablePiece.classList.remove('draggable');
          let logicShip = ensureShipHasObjectFormatting(currentDraggablePiece);
          console.log("!!!!currentDraggablePiece!!!!");
          console.log(logicShip);
          logicPlayerBoard.placeShip(logicShip);
        } else {
          currentDraggablePiece.dataset.placed = 'false';
          return;
        }

        if (placedShips > 4) {
          uiPlayerBoard.querySelectorAll('.grid-tile').forEach((tile) => {
            tile.removeEventListener('dragover', (e) => dragOver(e));
            tile.removeEventListener('drop', (e) => dragDrop(e, logicPlayerBoard));
            tile.removeEventListener('dragenter', (e) => dragEnter(e, logicPlayerBoard));
          });

          document.removeEventListener("keyup", rotate);

          uiPlayerBoard.classList.add('ready');
          currentPlayer.isSetupComplete = true;
          footerInfoContainer.innerHTML = '';
          transitionOutSetup();
          setTimeout(() => resolve(placedShips), 500);
        }
      }

      function onDragEnd(e) {
        setTimeout(function(){
            e.target.classList.remove('hide-draggable-ghost');
        });
        uiPlayerBoard.querySelectorAll('.can-drop')?.forEach((tile) => tile.classList.remove('can-drop'));
        uiPlayerBoard.querySelectorAll('.can-not-drop')?.forEach((tile) => tile.classList.remove('can-not-drop'));
      }
    });
  }

  async makeMove(opponent, stateMachineInstance) {
    let currentPlayer = this;

    let footerInfoContainer = document.getElementById('footer-info-container');
    footerInfoContainer.innerHTML = '';

    let splitter = document.createElement('div');

    let ulInstructions = document.createElement('ul');
    let divKey = document.createElement('div');

    let li1 = document.createElement('li');
    let li2 = document.createElement('li');

    let div3 = document.createElement('div');
    let divider3to4 = document.createElement('div');
    let div4 = document.createElement('div');
    let divider4to5 = document.createElement('div');
    let div5 = document.createElement('div');

    ulInstructions.setAttribute('id', 'turn-instructions-list');
    ulInstructions.classList.add('info-ul');
    li1.setAttribute('id', 'make-guess-instructions');
    li2.setAttribute('id', 'end-turn-on-miss-instructions');
    li1.textContent = 'Click on the Enemy Board to Fire a Shot.';
    li2.textContent = 'Hits Let You Fire an Additional Shot That Turn';

    divKey.setAttribute('id', 'turn-guess-key');
    divKey.classList.add('info-key');
    div3.setAttribute('id', 'miss-color');
    div4.setAttribute('id', 'hit-color');
    div5.setAttribute('id', 'sunk-color');
    div3.textContent = 'Missed Color';
    div3.style.color = 'black';
    divider3to4.classList.add('info-divider-line');
    div4.textContent = 'Hit Color';
    div4.style.color = 'var(--accent-color)';
    divider4to5.classList.add('info-divider-line');
    div5.textContent = 'Sunk Color';
    div5.style.color = 'var(--selected-accent-color)';

    splitter.setAttribute('id', 'footer-info-splitter');

    ulInstructions.appendChild(li1);
    ulInstructions.appendChild(li2);

    divKey.appendChild(div3);
    divKey.appendChild(divider3to4);
    divKey.appendChild(div4);
    divKey.appendChild(divider4to5);
    divKey.appendChild(div5);

    splitter.appendChild(ulInstructions);
    splitter.appendChild(divKey);

    footerInfoContainer.appendChild(splitter);

    return await new Promise((resolve) => {
      let move = {};

      async function handleGuess(e) {
        let clickedTile = e.target;
        console.log(clickedTile);
        if (clickedTile.classList.contains('grid-tile')) {
          let x = clickedTile.id.slice(-3, -2);
          let y = clickedTile.id.slice(-1);

          if (opponent.gameboard.hashedGuesses.has(`${x},${y}`)) {
            clickedTile.style.animation = 'invalid 0.2s 3';
            clickedTile.addEventListener('animationend', function() {
              clickedTile.style.animation = '';
            });
          } else {
            move = opponent.gameboard.receiveAttack({x: x, y: y});
            if (move.result === "All ships sunk!!!") {
              currentPlayer.allSunk = true;
            }

            uiOpponentBoard.removeEventListener('click', handleGuess);
            setTimeout(() => resolve(move), 500);
          }
        }
      }

      const playerId = this.id;
      const opponentId = this.id === 1 ? 2 : 1;
      const uiPlayerBoard = document.getElementById(`board-${playerId}`);
      const uiOpponentBoard = document.getElementById(`board-${opponentId}`);

      uiPlayerBoard.querySelectorAll(`.player-${playerId}-ship`).forEach((ship) => {
        if (ship.classList.contains('fog-of-war')) {
          ship.classList.remove('fog-of-war');
        }
      });

      uiOpponentBoard.addEventListener('click', handleGuess);
    });
  }
}

export { Player, CPUPlayer, HumanPlayer };





// --------------------------------------------------------------------------------


//On setupBoard:
//Create 5 ships and append them to the piece container
//Resolve once 5 ships have given the signal for a successful drop.

//On dragStart:
//Need to know where ship was grabbed
//Parse this to be number of tiles left or down to be the number of the origin coordinate

//On hover:
//Use hover target to relay drop information to grab cursor tile, and use distance to origin coordinate
//to offset target tile such that origin of ship lines up with new target after offset

//On dropEvent:
//Place the ship if valid placement and create logical element
//Otherwise return out
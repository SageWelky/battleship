export default function turnLogicHandler(player, opponent, stateMachineInstance, move) {
  let stateInstructions = { event: null, payload: null };

  if (!move) return stateInstructions;
  console.log(`Player ${player.id} has ${move.result}.`);

  switch (move.result) {
    case "Awaiting Human Player Input":
      stateMachineInstance.paused = true;
      break;

    case "hit":
      stateInstructions.event = "newTurn";
      stateInstructions.payload = { player: player, opponent: opponent };
      break;
    case "miss":
      stateInstructions.event = "newTurn";
      stateInstructions.payload = { player: opponent, opponent: player };
      break;

    case "All ships sunk":
      stateInstructions.event = "gameOver";
      stateInstructions.payload = { winner: player, opponent: opponent };
      break;

    case "Validation Error, already guessed":
    case "Unexpected error processing guess":
      console.warn('Invalid state instructions: ', move.result);
      stateMachineInstance.taskQueue.unshift(stateMachineInstance.states[stateMachineInstance.currentState].action({player: player, opponent: opponent, stateMachineInstance: stateMachineInstance}));
      break;

    default:
      console.warn('Invalid state instructions: ', move.result);
      prompt("A game-breaking error has occured, please refresh the Page.");
      break;
  }

  return stateInstructions;
}



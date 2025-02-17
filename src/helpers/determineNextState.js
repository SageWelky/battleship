export default function determineNextState(activePlayer, opponent, stateMachineInstance, move) {
  let stateInstructions = { event: null, payload: null };

  if (!move) return stateInstructions;
  console.log(`Player ${activePlayer.id} has ${move.result}.`);

  switch (move.result) {
    case "Awaiting Human Player Input...":
      stateMachineInstance.pause();
      break;

    case "Hit!":
      stateInstructions.event = "startTurn";
      stateInstructions.payload = { activePlayer: activePlayer, opponent: opponent };
      break;
    case "Miss":
      stateInstructions.event = "startTurn";
      stateInstructions.payload = { activePlayer: opponent, opponent: activePlayer };
      break;

    case "All ships sunk!!!":
      stateInstructions.event = "gameOver";
      stateInstructions.payload = { winner: activePlayer, opponent: opponent };
      break;

    case "Validation Error, already guessed.":
    case "Unexpected error processing guess.":
      console.warn('Invalid state instructions: ', move.result);
      stateMachineInstance.taskQueue.unshift(stateMachineInstance.states[stateMachineInstance.currentState].action({activePlayer: activePlayer, opponent: opponent, stateMachineInstance: stateMachineInstance}));
      break;

    default:
      console.warn('Invalid state instructions: ', move.result);
      prompt("A game-breaking error has occured, please refresh the Page.");
      break;
  }

  return stateInstructions;
}



export function delayQueue(stateMachineInstance) {
  stateMachineInstance.pause();
  setTimeout(() => {
    stateMachineInstance.resume();
  }, 650);
}

export function delayTime(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function delayQueue(stateMachineInstance, ms) {
  stateMachineInstance.pause();
  setTimeout(() => {
    stateMachineInstance.resume();
  }, ms);
}

export function delayTime(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
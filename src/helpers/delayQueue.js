export default function delayQueue(stateMachineInstance) {
  stateMachineInstance.paused = true;
  setTimeout(() => {
    stateMachineInstance.paused = false;
    stateMachineInstance.runQueue();
  }, 300);
}
export default function delayQueue(stateMachineInstance) {
  stateMachineInstance.pause();
  setTimeout(() => {
    stateMachineInstance.resume();
  }, 650);
}
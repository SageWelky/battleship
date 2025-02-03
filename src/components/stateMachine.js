/**
   * Found in stateMachine.js, this is where our "state traversals" are mapped out.
   * @param {Class} StateMachine - The states object defining transitions and logic.
   */
export default class StateMachine {
  /**
    * StateMachine's constructor.
    * @param {Object} states - Our states to traverse.
    */
  constructor(states) {
    //Startup will read in state object, we want to initialize to setup.
    this.currentState = "setupPhase";
    this.states = states;
    //The queue allows for a clean call-stack.
    this.taskQueue = [];
    this.running = false;
    //We're binding the 'this' context in order to preserve instance reference.
    this.runQueue = this.runQueue.bind(this);
    //Allows for player input without needing async code.
    this.paused = false;
  }

  /**
   * Transitions to a new state.
   * @param {string} event - The name of the state to transition to.
   * @param {Object} [payload={}] - Additional data to pass during the transition.
   * @returns {void}
   */
  transition(event, payload) {
    this.enqueue(() => {
      const nextState = this.states[this.currentState].transitions[event];
      this.currentState = nextState;

      if (this.states[nextState]?.action) {

        this.states[nextState].action({...payload, stateMachineInstance: this});
      }
    });
  }

  enqueue(action) {
   this.taskQueue.push(action);

   if (!this.running) {
    this.runQueue();
   }
  }

  runQueue() {
    //This interupts running the queue until human input can 'resolve'.
    if (this.paused) {
      return;
    }

    //The task insertion needs to know if it should 'open' the queue execution context.
    this.running = true;

    while(this.paused === false && this.taskQueue.length > 0) {
      let action = this.taskQueue.shift();
      action();
    }

    this.running = false;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;

    //We use setTimeout to exit the 'resume context' before running the queue
    setTimeout(this.runQueue(), 100);
  }

  resetState() {
    //Task queue should be emptied by gameOver,
    //however this ensures modularity and inso supports feature expansion (e.g. a dedicated NG button).
    this.taskQueue = [];
    this.running = false;
    this.paused = false;
  }
}
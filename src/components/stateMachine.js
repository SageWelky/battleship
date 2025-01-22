export default class StateMachine {
  /**
   * Found in gameStates.js, this is where our "state traversals" are mapped out.
   * @param {Object} states - The states object defining transitions and logic.
   */
  constructor(states) {

    //Startup will hookup UI and read in state object, which chains to player input
    this.currentState = "setupPhasePlayerOne";
    this.states = states;

    //The player input will need to be locked when it isn't their turn
    //We can account for two players in a later refactor
    this.playerTurnLocked = false;

    //The queue allows for a clean call-stack, and instruction to multiple actors per state transition
    this.taskQueue = [];
    this.running = false;

    //We're binding the 'this' context in order to preserve instance reference
    this.runQueue = this.runQueue.bind(this);

    //pausing the queue without changing the running status allows specialized queue stops
    //for player input without needing async code
    this.paused = false;

    //implement fully in a future iteration of refactoring, DOM oriented
    this.observers = [];
  }

  /**
   * Transitions to a new state.
   * @param {string} event - The name of the state to transition to.
   * @param {Object} [payload={}] - Additional data to pass during the transition.
   * @returns {void}
   */
  transition(event, payload) {

    this.enqueue(() => {

      const nextState = this.states[this.state].transitions[event];
      this.state = nextState;

      if (this.states[nextState]?.action) {

        this.states[nextState].action({...payload, stateMachineInstance: this});
      }
    });
    //Old Version to pull from for adding onEnter/onExit functionality if needed:
    // let state = this.states[this.currentState];
    // let nextState = state.transition[action];
    // this.currentState = nextState;
    // let runOnEnter = this.states[nextState]?.onEnter;
    // if(runOnEnter) {
    //   runOnEnter(this.context, payload);
    // }
  }

  enqueue(action) {

   this.taskQueue.push(action);

   if(!this.running) {
    this.runQueue();
   }
  }

  runQueue() {

    if(this.paused) {
      return;
    }

    //State transitions can result from actions, which can themselves add tasks
    //The task insertion needs to know if it should start the queue execution context
    this.running = true;

    while(this.taskQueue.length > 0) {
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

  addObserver(observer) {

    this.observers.push(observer);
  }

  removeObserver(observer) {

    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notifyObservers(message) {

    this.observers.forEach(observer => observer.update(message));
  }

}
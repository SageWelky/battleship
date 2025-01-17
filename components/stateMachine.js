

export default class StateMachine {

  constructor(initial, states) {
    this.currentState = initial;
    this.states = states;
    this.taskQueue = [];
    this.running = false;
    this.subscribers = [];
  }

  transition(action, payload) {

    let state = this.states[this.currentState];
    let nextState = state.transition[action];

    this.currentState = nextState;
    let runOnEnter = this.states[nextState]?.onEnter;

    if(runOnEnter) {
      runOnEnter(this.context, payload);
    }
  }

  enqueue() {

  }

  runQueue() {

  }

  stopQueue() {

  }

}
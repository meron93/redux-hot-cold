import {makeGuess, toggleInfoModal, newGame} from './actions';
import reducer from './reducer';

describe('Reducer', () => {
  it('should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.guesses).toEqual([]);
    expect(state.feedback).toEqual('Make your guess!');
    expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
    expect(state.correctAnswer).toBeLessThanOrEqual(100);
    expect(state.showInfoModal).toEqual(false);
  });

  describe('newGame', () => {
    it('should start a new game', () => {
      let currentState = {
        guesses: [1, 56, 73, 99],
        feedback: 'You got it!',
        correctAnswer: [99]
      }
      const state = reducer(currentState, newGame());
      expect(state.guesses).toEqual([]);
      expect(state.feedback).toEqual('Make your guess!');
      expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(state.correctAnswer).toBeLessThanOrEqual(100);
      expect(state.showInfoModal).toEqual(false);
    });
  });

  describe('makeGuess', () => {
    it('should make a guess', () => {
      let state = {
        guesses: [],
        feedback: '',
        correctAnswer: 100
      };

      state = reducer(state, makeGuess(25));
      expect(state.guesses).toEqual([25]);
      expect(state.feedback).toEqual('You\'re Ice Cold...');

      state = reducer(state, makeGuess(60));
      expect(state.guesses).toEqual([25, 60]);
      expect(state.feedback).toEqual('You\'re Cold...');

      state = reducer(state, makeGuess(75));
      expect(state.guesses).toEqual([25, 60, 75]);
      expect(state.feedback).toEqual('You\'re Warm');

      state = reducer(state, makeGuess(95));
      expect(state.guesses).toEqual([25, 60, 75, 95]);
      expect(state.feedback).toEqual('You\'re Hot!');

      state = reducer(state, makeGuess(100));
      expect(state.guesses).toEqual([25, 60, 75, 95, 100]);
      expect(state.feedback).toEqual('You got it!');
    });
   });

  describe('toggleInfoModal', () => {
    it('should toggle info modal on', () => {
      let currentState = {
        showInfoModal: false
      };
      const state = reducer(currentState, toggleInfoModal());
      expect(state.showInfoModal).toEqual(true);
    });

    it('should toggle info modal off', () => {
      let currentState = {
        showInfoModal: true
      };
      const state = reducer(currentState, toggleInfoModal());
      expect(state.showInfoModal).toEqual(false);
    });
  });
});
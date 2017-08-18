import React from 'react';
import {shallow, mount} from 'enzyme';

import {GuessCount} from './guess-count';

describe('<GuessCount />', () => {
  it('Renders without crashing', () => {
    shallow(<GuessCount />);
  });

  it('Renders the correct amount of guesses', () => {
    const value = 4;
    const wrapper = shallow(<GuessCount count={value} />);
    expect(wrapper.text()).toEqual(`Guess #${value}!`);
  });
});
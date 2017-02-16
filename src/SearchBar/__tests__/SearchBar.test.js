import React from 'react';
import SearchBar from '../index';
import {shallow} from 'enzyme';

describe('SearchBar', () => {

  test('SearchBar renders', () => {
    shallow(<SearchBar />);
  });
});

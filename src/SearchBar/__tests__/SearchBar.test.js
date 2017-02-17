import React from 'react';
import SearchBar from '../index';
import { shallow } from 'enzyme';

describe('Footer', () => {
  test('searchbar renders', () => {

  });
  test('search bar had input', () => {
    const handleChangeMock = jest.fn();
    const searchBar = shallow(<SearchBar onChange={handleChangeMock} />);
    searchBar.find('input').first().simulate(
      'change',
      {
        target: {
          value: 'testing'
        }
      }
    );
  });
});

import React from 'react';
import SearchBar from '../index';
import {shallow} from 'enzyme';

describe('SearchBar', () => {

  test('SearchBar renders', () => {
    shallow(<SearchBar />);
  });

  test('has initial value empty string', () => {
    const searchBar = shallow(<SearchBar />);

    expect(searchBar.state('value')).toEqual('');
  });

  test('triggers change event on user input', () => {
    const handleChangeMock = jest.fn();
    const searchBar = shallow(<SearchBar onChange={handleChangeMock} />);

    searchBar.find('input').first().simulate(
      'change',
      {
        target: {
          value: 'testvalue'
        }
      }
    );

    expect(handleChangeMock.mock.calls).toEqual(
      [
        ['testvalue']
      ]
    );
  });
});

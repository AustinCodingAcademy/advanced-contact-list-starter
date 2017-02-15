import React from 'react';
import SearchBar from '../SearchBar';
import { shallow } from 'enzyme';

describe('Footer', () => {
  test('searchbar renders', () => {
    shallow(<SearchBar />);
  });

  test('has initial value empty string', () => {
    const searchBar = shallow(<SearchBar value="" />);

    // console.log(searchBar.state('value'));
    expect(searchBar.prop('value')).toEqual('');
  });

  test('has initial value empty string', () => {
    const searchBar = shallow(<SearchBar />);

    console.log(searchBar.state('value'));
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

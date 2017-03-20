import React from 'react';
import SearchBar from '../SearchBar';
import { shallow } from 'enzyme';

describe ('Footer', () => {

  test('triggers change', () => {
    const handleChangeMock = jest.fn();
    const searchBar = shallow(<SearchBar onChange={handleChangeMoc} />);

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
    )

  })

})

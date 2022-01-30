import React from 'react';
import renderer from 'react-test-renderer';
import ListaDeUsuarios from '../src/ListaDeUsuarios';

test('Snapshot test for content', () => {
  const component = renderer.create(
    <ListaDeUsuarios />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});


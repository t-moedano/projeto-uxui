import React from 'react';
import renderer from 'react-test-renderer';
import ListaDeUsuarios from '../src/ListaDeUsuarios';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <ListaDeUsuarios />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
import React from 'react';
import renderer from 'react-test-renderer';
import ListaDeUsuarios from '../src/ListaDeUsuarios';
import {cleanup, fireEvent, screen, render} from '@testing-library/react';

afterEach(cleanup);


it('Snapshot test for content', () => {
  const component = renderer.create(
    <ListaDeUsuarios />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


it('Test Open Pay Modal', () => {
  render(
    <ListaDeUsuarios />,
  );
  fireEvent.click(screen.getByText(/PAGAR/i))
  const text = screen.getByText(/Digite o valor:/i);
  expect(text).toBeTruthy();
})


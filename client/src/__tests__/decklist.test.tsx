import DeckList from '../components/decklist.component';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import {DeckProps, DeckType} from '../types/types'
import Deck from '../components/deck.component';
import Props from '../types/types';

//! testing functions
const decks: DeckType[] = [

];

const {updateDecks, getDeckFromName, getCardFromID} = Props;

function sum(x:number, y:number) {
  return x + y;
}

describe('sum', () => {
  test('sums up two values', () => {
    expect(sum(2, 4)).toBe(6);
  });
});


describe('Decklist renders if there are no decks', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<Deck getDeckFromName={getDeckFromName} updateDecks={updateDecks} getCardFromID={getCardFromID}/>, container)
  });

  test('renders decklist component', () => {
    render(<DeckList decks={decks} />);
  })


});



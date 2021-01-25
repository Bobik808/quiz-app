import DeckList from '../components/decklist.component';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import {DeckProps, DeckType, CardType} from '../types/types'
import Deck from '../components/deck.component';
import {Props} from '../types/types';
import App from '../App'
import {MemoryRouter} from 'react-router'

jest.mock('../components/deck.component');

//! testing functions

let props:Props;

const cards:CardType[] = [ {
  type: 'yesNo',
  text: 'Do you like my massive deck?',
  possibleAnswers: ['yes', 'no'],
  correctAnswer: 'yes',
  _id:'anything'
}, {
  type: 'yesNo',
  text: 'Do you like my tiny deck?',
  possibleAnswers: ['yes', 'no'],
  correctAnswer: 'no',
  _id:'whatever'
}]

const decks: DeckType[] = [
{
    name: 'Massive Deck',
    cards:cards
  },
 {
    name: 'Tiny Deck',
    cards: cards
  }
];


describe('Decks', () => {
test('renders decks when there are decks to display', () => {
  render(<MemoryRouter> <DeckList decks={decks} /> </MemoryRouter> );
  const linkElement = screen.getByText('Massive Deck');
  const tinyElement = screen.getByText('Tiny Deck');
  const buttonRename = screen.getAllByRole('button', {name: 'Rename'})
  const buttonDelete = screen.getAllByRole('button', {name: 'Delete'})
  const numberOfCards = screen.getAllByText('2 cards');
  expect(linkElement).toBeInTheDocument();
  expect(tinyElement).toBeInTheDocument(); 
  expect(buttonRename[0]).toBeInTheDocument();
  expect(buttonDelete[0]).toBeInTheDocument(); 
  expect(numberOfCards[0]).toBeInTheDocument(); 
});

}); 


describe('deck via jest.mock', () => {
test('display card titles within the deck', ()=>{
  const myMockFn = jest
    .fn()
    .mockReturnValue('')
    .mockReturnValueOnce('first call')
    .mockReturnValueOnce('second call');
  // Deck.mockImplementation(() => <div>PageHeaderMock</div>);
})  
})

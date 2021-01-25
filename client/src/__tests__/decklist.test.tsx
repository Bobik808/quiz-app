import DeckList from '../components/decklist.component';
import React from 'react';
import * as ReactDOM from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeckProps, DeckType, CardType } from '../types/types'
import Deck from '../components/deck.component';
import { Props } from '../types/types';
import App from '../App'
import { MemoryRouter } from 'react-router'
import { getDeckFromName } from '../helpers/helpers'
import '@testing-library/jest-dom/extend-expect';
import QuizCard from '../components/quiz-card.component';
import CardEdit from '../components/cardedit.component';


//! testing functions

let props: Props;

const cards: CardType[] = [{
  type: 'yesNo',
  text: 'Do you like my massive deck?',
  possibleAnswers: ['yes', 'no'],
  correctAnswer: 'yes',
  _id: 'anything'
}, {
  type: 'yesNo',
  text: 'Or do you prefer tiny decks?',
  possibleAnswers: ['yes', 'no'],
  correctAnswer: 'no',
  _id: 'whatever'
}]

const decks: DeckType[] = [
  {
    name: 'Massive Deck',
    cards: cards
  },
  {
    name: 'Tiny Deck',
    cards: cards
  }
];


describe('Decks', () => {
  // let container: HTMLDivElement;
  test('renders decks when there are decks to display', () => {
    render(<MemoryRouter>
      <DeckList decks={decks} />
    </MemoryRouter>);

    const linkElement = screen.getByText('Massive Deck');
    const tinyElement = screen.getByText('Tiny Deck');
    const buttonRename = screen.getAllByRole('button', { name: 'Rename' })
    const buttonDelete = screen.getAllByRole('button', { name: 'Delete' })
    const numberOfCards = screen.getAllByText('2 cards');
    expect(linkElement).toBeInTheDocument();
    expect(tinyElement).toBeInTheDocument();

    expect(buttonRename[0]).toBeInTheDocument();
    expect(buttonDelete[0]).toBeInTheDocument();
    expect(numberOfCards[0]).toBeInTheDocument();
    expect(screen.getByRole('button', {name:'Create new quizz'})).toBeInTheDocument();

  });

});   


describe('Deck', () => {

  test('display card titles within the deck', () => {

    render(
      <MemoryRouter >
        <Deck updateDecks={()=>{}} getDeckFromName={()=> decks[0]}  />
      </MemoryRouter>
    );

    expect(screen.getByText(decks[0].name)).toBeInTheDocument();
    expect(screen.queryByText(decks[1].name)).toBeNull();
    expect(screen.getByText(cards[0].text)).toBeInTheDocument();
    expect(screen.getByText(cards[1].text)).toBeInTheDocument();

  })  
}) 

describe('Card', () => {

  test('display card within the deck', () => {

    render(
      <MemoryRouter >
        <CardEdit updateDecks={()=>{}} getCardFromID={()=> cards[0]} getDeckFromName={()=> decks[0]} decks={decks} />
      </MemoryRouter>
    );

    expect(screen.getByText('yesNo')).toBeInTheDocument();
    expect(screen.getByText('Edit card')).toBeInTheDocument();   
   
  })
})    
  
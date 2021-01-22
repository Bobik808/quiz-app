import React from 'react';
import './components.scss';

import { Link } from 'react-router-dom';
import {DeckProps} from '../types/types';

//! deck-list if rendered --- add property testID ---- get element by testID
//! Check that everything that you expect to see is rendered
//! test results of interactions (screen. ... getElementByText('..'))
//! test aria selectors

const deckList = ({decks}: DeckProps) => (
  <div className="deck-list">
    <h2 className="table-header">Decks</h2>
    <div className="table">
        {decks.map((deck, index) =>
            <div className="table-row" key={index}>
              <div className="table-cell first-col" id="deck-name">
                <Link to={{pathname: `/deck/${deck.name}`, state: deck}}>
                  {deck.name}
                </Link>
              </div>
              <div className="table-cell" id="num-cards">
                <Link to={{pathname: `/deck/${deck.name}`, state: deck }}>
                  {deck.cards.length + ' cards'}
                </Link>
              </div>
              <div className="table-cell actions">
                <button>Rename</button >
              </div>
              <div className="table-cell actions">
                <button>Delete</button>
              </div>
            </div>
        )}
    </div>
    <div className="create-new bottom-actions">
      <button>Create new deck</button>
    </div>
  </div>
);

export default deckList;

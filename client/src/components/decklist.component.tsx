import React from 'react';
import './components.css';

import { Link } from 'react-router-dom';
import {DeckProps} from '../types/types';

const deckList = ({decks}: DeckProps) => (
  <div className="deck-list">
    <h2 className="table-header">Quizzes</h2>
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
                <button>Rename</button>
              </div>
              <div className="table-cell actions">
                <button>Delete</button>
              </div>
            </div>
        )}
    </div>
    <div className="create-new bottom-actions">
      <button>Create new quizz</button>
    </div>
  </div>
);

export default deckList;

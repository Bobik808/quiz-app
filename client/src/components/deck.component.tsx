import React, { useEffect, useState } from 'react';
import './components.scss';
import { useParams } from 'react-router-dom';
import { DeckType, CardType, urlParams, Props } from '../types/types';
import { Link } from 'react-router-dom';

const Deck = ({ getDeckFromName, deleteCard, updateDecks, refresh }: Props) => {
  const { deckName } = useParams<urlParams>(); 
  const [deck, setDeck] = useState<DeckType>({name: 'Deck loading...', cards:[]});

  useEffect(() => {
    const newDeck = getDeckFromName(deckName);
    setDeck(newDeck);
  }, []);

  const handleDelete = (card: CardType) => async (e: React.SyntheticEvent) => {
    if (deleteCard) await deleteCard(card, deckName);
    await updateDecks();
    const updatedDeck = Object.assign({}, deck);
    updatedDeck.cards = deck.cards.filter((c: CardType) => c._id !== card._id)
    setDeck(updatedDeck);
  };

  const displayCards = () => {
    return (
      deck.cards.map((card, index) =>
        <div className="table-row" key={index}>
          <div className="table-cell first-col">
            <p className="question-text">{card.text}</p>
          </div>
          <div className="table-cell">
            {card.type}
          </div>
          <div className="table-cell actions">
            <Link to={`/deck/${deck.name}/edit/${card._id}`}>
              <button>Edit</button>
            </Link>
          </div>
          <div className="table-cell actions">
            <button onClick={(e) => handleDelete(card)(e)}>Delete</button>
          </div>
        </div>
      )
    )
  };

  return (
    <div>
      {deck.name
        ? <div className="deck">
            <h2 className="table-header">{deck.name}</h2>
              <div className="table">
                {displayCards()}
              </div>
              <div className="bottom-actions">
                <Link to={{ pathname: `/deck/${deck.name}/edit/new` }}>
                  <button>Create new card</button>
                </Link>
              <Link to={{ pathname: `/deck/${deck.name}/quiz` }}>
                <button>Start quiz</button>
              </Link>
            </div>
        </div>
      : null}
    </div>
  );
}


export default Deck;

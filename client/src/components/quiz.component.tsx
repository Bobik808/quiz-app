import React, { useEffect, useState } from 'react';
import './components.scss'
import { useParams } from 'react-router-dom';
import { DeckType, CardType, urlParams } from '../types/types';
import QuizCard from './quiz-card.component';

type props = {
  getDeckFromName (deckName: string): DeckType;
}

const Quiz = ({getDeckFromName}: props) => {
  const { deckName } = useParams<urlParams>();
  const [deck, setDeck] = useState<DeckType>({ name: 'Deck loading...', cards: [] });
  const [cards, setCards] = useState<CardType[]>([]);
  const [currentCardIndex, setIndex] = useState<number>(0);
  const [isReady, setReady] = useState<boolean>(false);

  useEffect(() => {
    const newDeck = getDeckFromName(deckName);
    setDeck(newDeck);
    shuffleCards(newDeck);
    setReady(true);
  }, []);

  const shuffleCards = (deck: DeckType) => {
    let shuffledCards = [...deck.cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    setCards(shuffledCards);
  };

  const goToPrevious = () => {
    setIndex(currentCardIndex - 1);
  }

  const goToNext = () => {
    setIndex(currentCardIndex + 1);
  }

  return (
    <div>
      {isReady
        ? <div className="quiz">
            <h2 className="table-header">{deck.name}</h2>
              <div className="top-actions">
                <p>{currentCardIndex + 1} / {cards.length}</p>
              </div>
                {<QuizCard
                  card={cards[currentCardIndex]}
                  index={currentCardIndex}
                  numCards={cards.length}
                  goToPrevious={goToPrevious}
                  goToNext={goToNext}
                  />}
          </div>
      : <h4>Quiz loading...</h4>}
    </div>
  )
}

export default Quiz;
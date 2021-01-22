import React, { useEffect, useState } from 'react';
import './components.scss'
import { CardType } from '../types/types';
import AnswerButton from './answer-button.component';
// import MultipleButton from './multiple-button';

type props = {
  card: CardType;
  goToPrevious: () => void;
  goToNext: () => void;
  index: number;
  numCards: number;
}

const QuizCard = ({ card, index, numCards, goToPrevious, goToNext }: props) => {
  const [answerClicked, setAnswerClicked] = useState<boolean>(false)

  useEffect(() => {
    // setAnswerClicked(false);
  }, []);

  console.log('CARD', card);
  return (
    <div className="quiz-card">
      <div className="question-text">
        <p>{card.text}</p>
      </div>


      <div className="answers-wrapper">
        <div className="answers-panel">
          {card.possibleAnswers.map((answer, i) => {
            return (<div className="answer-option">
              <p className="answer-text">{answer}</p>
              <input type={`${card.type === 'yesno' ? 'radio' : 'checkbox'}`} className="answer-selector"></input>

            </div>)
          })}
        </div>

      </div>


      <div className="bottom-actions">
        <button onClick={goToPrevious} disabled={index === 0}>Previous</button>
        <button onClick={goToNext} disabled={index === numCards - 1}>Next</button>
      </div>
    </div>
  )
}

export default QuizCard;
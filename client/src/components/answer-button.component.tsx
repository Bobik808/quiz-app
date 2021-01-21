import React, { useState, useEffect } from 'react';
import './components.scss'

type props = {
  answer: string
  isCorrect: boolean
  clicked: boolean | undefined
  cardIndex: number
}

const AnswerButton = ({ answer, isCorrect, cardIndex, clicked }: props) => {
  const [isClicked, setClicked] = useState<boolean>(false);
  const [isReady, setReady] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setClicked(true);
  }

  const resetButton = async () => {
    await setClicked(false);
    setReady(true);
  }

  useEffect(() => {
    resetButton();
  }, [answer, cardIndex, isCorrect, clicked]);

  return (
    <div>
      {isReady
        ? <div className="answer-button ">
          <button
            onClick={handleClick}
            className={((isCorrect && isClicked && isReady) ? 'clicked-correct' : ' null ')
            + ((!isCorrect && isClicked && isReady) ? ' clicked-incorrect' : ' null ')}
          >{answer}</button>
        </div>
      : null}
    </div>
  )
}

export default AnswerButton;
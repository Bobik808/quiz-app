import React, { useState, useEffect } from 'react';
import './components.scss';
import { useForm } from 'react-hook-form';
import { Redirect, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { DeckType, CardType, urlParams, Props, CardSubmitType} from '../types/types';

const CardEdit = ({getDeckFromName, getCardFromID, editCard, updateDecks}: Props) => {
  const {deckName, cardID} = useParams<urlParams>();
  const isNew = cardID === 'new';
  const [deck, setDeck] = useState <DeckType | {}>({});
  const [card, setCard] = useState <CardType>({
    _id: cardID || 'new',
    type: 'yesNo',
    text: '',
    possibleAnswers: [''],
    correctAnswer: ''
  });
  const { register, handleSubmit, watch, errors } = useForm();

  const [isSubmitted, setSubmitted] = useState <boolean>(false);

  const onSubmit = async (data: CardSubmitType) => {
    if (data.type === 'yesNo') {
      data.possibleAnswers = ['Yes', 'No'];
    } else if (typeof(data.possibleAnswers) === 'string') {
      data.possibleAnswers = data.possibleAnswers.split(',');
    }
    if (!isNew && cardID) data._id = cardID;
    if (editCard) await editCard(data as CardType, deckName, isNew);
    updateDecks();
    setSubmitted(true);
  }

  useEffect (() => {
    const newDeck = getDeckFromName(deckName);
    setDeck(newDeck);
    if (cardID && newDeck && getCardFromID) {
      const newCard = getCardFromID(newDeck as DeckType, cardID);
      setCard(newCard);
    }
  }, []);


  let type = watch('type');
  let isYesNo = type === 'yesNo';


  return (
    <div className="card-edit">
      <Link to={`/deck/${deckName}`}>
        <h2>{deckName}</h2>
      </Link>
      <h3>{isNew ? 'Create new card' : 'Edit card'}</h3>
      <form onSubmit={handleSubmit(onSubmit)} id="editForm">
        <div className="edit-row type">
          <label htmlFor="type">Type:</label>
          <select name="type" id="type" ref={register}>
            <option value="yesNo" selected={isNew || card.type === 'yesNo'}>yesNo</option>
            <option value="multipleChoice" selected={!isNew && card.type === 'multipleChoice'}>Multiple Choice</option>
            <option value="written" selected={!isNew && card.type === 'written'}>Write Answer</option>
          </select>
        </div>
        <div className="edit-row">
          <label htmlFor="text">Text</label>
          <input type="text" name="text" ref={register}
                  defaultValue={isNew? '': card.text}
                  placeholder={isYesNo
                    ? "Do you love white text on black background?"
                    : type==="multipleChoice"
                      ? "Which of the following are valid HTTP methods?"
                      : "List all possible falsy values in Javascript"}/>
        </div>
        <div className="edit-row">
          <label>Possible answers</label>
          <input type="text" name="possibleAnswers" ref={register}
                  disabled={isYesNo}
                  placeholder={isYesNo
                    ? "Yes, No"
                    : type === "multipleChoice"
                      ? "GET, PUT, EDIT, DELETE"
                      : ""}/>
        </div>
        <div className="edit-row">
          <label>Correct answer</label>
          {isYesNo
            ? (<div id="yesNoAnswers">
                <label htmlFor="Yes">Yes</label>
                <input type="radio" name="correctAnswer" value="Yes" ref={register} defaultChecked></input>
                <label htmlFor="No">No</label>
                <input type="radio" name="correctAnswer" value="No" ref={register}></input>
              </div>)
            : <input type="text" name="correctAnswer" ref={register}
              placeholder={type === "multipleChoice"
                  ? "GET, PUT, DELETE"
                  : "0, null, undefined, false, NaN, empty string, 0n (BigInt)"} />}
        </div>
      </form>

      <div className="bottom-actions">
        <button type="submit" form="editForm" ref={register}>Save</button>
        <button type="submit" form="editForm" ref={register}>Save and create another</button>
        <button>Cancel</button>
      </div>
      {isSubmitted ? <Redirect push to={`/deck/${deckName}`}></Redirect> : null}
    </div>
  );
};


export default CardEdit;

import { Deck } from '../models/decks.model';
import { Request, Response } from 'express';

exports.createDeck = async (req: Request, res: Response) => {
  try {

    const deckName = req.body;
    const newDeck = await Deck.create(deckName);
    res.status(201);
    res.send(newDeck);
  } catch (err) {
    res.status(500);
    res.send(`addManyCards threw an error: ${err}`);
  }
};

exports.deleteDeck = async (req: Request, res: Response) => {
  try {
    const deckID = req.body;
    await Deck.deleteOne({ _id: deckID });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    res.send('Could not delete document');
  }
};

exports.getDecks = async (req: Request, res: Response) => {
  console.log('RECEIVED GET DECKS REQUEST');
  try {
    const decks = await Deck.find();
    console.log('DECKS::::', decks);
    // const d = [{
    //   name:'Default Deck',
    //   id: 1,
    //   cards: [{
    //     type: 'card', text: 'card text',
    //     possibleAnswers: { type: ['1'], default: undefined },
    //     correctAnswer: '1'
    //   }]
    // }];
    res.status(200);
    // res.send(d);
    res.send(decks);
  } catch (err) {
    res.status(500);
    res.send(`Error retrieving decks: ${err}`);
  }
};


export default exports;
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
}

exports.getDecks = async (req: Request, res: Response) => {
  try {
    const decks = await Deck.find();
    res.send(decks);
  } catch (err) {
    res.status(500);
    res.send(`Error retrieving decks: ${err}`);
  }
};

export default exports;
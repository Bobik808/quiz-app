import { Card } from '../models/cards.model';
import { Deck } from '../models/decks.model';
import { Request, Response } from 'express';
import { CardType } from '../types/types';


exports.addManyCards = async (req: Request, res: Response) => {
  try {
    const cards = req.body.cards;
    const deck = await Deck.findOne({name: req.body.deck});
    deck.cards = [...deck.cards, ...cards];
    deck.save((err: string, doc: string) => {
      if (err) return console.log(`save threw an error: ${err}`);
      res.status(201);
      res.send(doc);
    });
  } catch (err) {
    res.status(500);
    res.send(`addManyCards threw an error: ${err}`);
  }
};

exports.createCard = async (req: Request, res: Response) => {
  try {
    console.log('WOOW LOOK AT MY DECK', req.body);
    const { card, deckName } = req.body;
    const deck = await Deck.findOne({ name: deckName });
    deck.cards = [...deck.cards, card];
    deck.save((err: string, doc: string) => {
      if (err) return console.log(`save threw an error: ${err}`);
      res.status(201);
      res.send(doc);
    });
  } catch (err) {
    res.status(500);
    res.send(`createCard threw an error: ${err}`);
  }
};

exports.editCard = async (req: Request, res: Response) => {
  try {
    const { card, deckName } = req.body;
    const deck = await Deck.findOne({ name: deckName });
    deck.cards.forEach((c: CardType) => {
      if (c._id.toString() === card._id) {
        c = Object.assign(c, card);
      }
    });
    deck.save((err: string, doc: string) => {
      if (err) return console.log(`save threw an error: ${err}`);
      res.status(201);
      res.send(doc);
    });
  } catch (err) {
    res.status(500);
    res.send(`editCard threw an error: ${err}`);
  }
};

exports.deleteCard = async (req: Request, res: Response) => {
  try {
    const { card, deckName } = req.body;
    const deck = await Deck.findOne({ name: deckName });
    deck.cards = deck.cards.filter((c: CardType) => c._id.toString() !== card._id);
    deck.save((err: string, doc: string) => {
      if (err) return console.log(`save threw an error: ${err}`);
      res.status(201);
      res.send(doc);
    });
  } catch (err) {
    res.status(500);
    res.send(`deleteCard threw an error: ${err}`);
  }
};




export default exports;
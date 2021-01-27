import express from 'express';
import card from './controllers/cards.controller';
import deck from './controllers/decks.controller';
import auth from './controllers/auth.controller';
import { authMiddleware } from './middleware/auth.middleware';
export const router = express.Router();

router.post('/addManyCards', card.addManyCards);
router.post('/createDeck', deck.createDeck);
router.post('/createCard', card.createCard);
router.post('/editCard', card.editCard);
router.post('/deleteCard', card.deleteCard);
router.get('/getDecks', authMiddleware, deck.getDecks);

// router.post('/login', authUser.login);
router.post('/register', auth.register);


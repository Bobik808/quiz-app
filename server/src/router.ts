import express from 'express';
import card from './controllers/cards.controller';
import deck from './controllers/decks.controller';
import auth from './controllers/auth.controller';
import { authMiddleware } from './middleware/auth.middleware';
export const router = express.Router();

router.post('/addManyCards', authMiddleware, card.addManyCards);
router.post('/createDeck', authMiddleware, deck.createDeck);
router.post('/createCard', authMiddleware, card.createCard);
router.post('/editCard', authMiddleware, card.editCard);
router.post('/deleteCard', authMiddleware, card.deleteCard);
router.get('/getDecks', authMiddleware, deck.getDecks);

// router.post('/login', authUser.login);
router.post('/register', auth.register);


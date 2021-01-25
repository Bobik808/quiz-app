import {DeckType} from '../types/types'

export const getDeckFromName = (deckName: string, decks: DeckType[]): DeckType => {
  const [selectedDeck] = decks.filter(deck => deck.name === deckName);
  return selectedDeck;
}
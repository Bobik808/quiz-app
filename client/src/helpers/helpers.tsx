<<<<<<< HEAD
import ApiClient from '../services/apiclient.service'
import {DeckType} from '../types/types'

export const getDeckFromName = (deckName: string, decks:DeckType[]): DeckType => {
  const [selectedDeck] = decks.filter(deck => deck.name === deckName);
  return selectedDeck;
}


=======
import {DeckType} from '../types/types'

export const getDeckFromName = (deckName: string, decks: DeckType[]): DeckType => {
  const [selectedDeck] = decks.filter(deck => deck.name === deckName);
  return selectedDeck;
}
>>>>>>> 287e146b50e856abe26572c7f2b8099d68b5ea80

import { DeckType, CardType } from '../types/types';
const localURL = 'http://localhost:3004';

type BodyType = {
  card?: CardType,
  deck?: DeckType,
  deckName?: string
}

type FetchArgsType = {
  method: string,
  headers?: {'Content-Type': string},
  body?: string,
}

const exports = {
  getDecks: () => {
    return fetchRequest(`getDecks`, 'GET');
  },

  editCard: (card: CardType, deckName: string, isNew: boolean) => {
    console.log(`edit request made, isNew: ${isNew}, card:${card}`);
    return isNew
      ? fetchRequest('createCard', 'POST', { card, deckName })
      : fetchRequest('editCard', 'POST', {card, deckName});
  },

  deleteCard: (card: CardType, deckName: string) => {
    console.log(`delete request made, card:${card}`);
    return fetchRequest('deleteCard', 'POST', { card, deckName });
  },

  editDeck: (deck: DeckType) => {
    
  }
}


const fetchRequest = (url: string, method: string, body?: BodyType) => {
  let init: FetchArgsType = {
    method: method
  }
  if (method === 'POST') {
    init.headers = {'Content-Type': 'application/json'};
    init.body = JSON.stringify(body);
  }

  return fetch(`${localURL}/${url}`, init)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => res.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    })
}

export default exports;
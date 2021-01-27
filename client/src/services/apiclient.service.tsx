import { DeckType, CardType } from '../types/types';
const localURL = 'http://localhost:3004';

type BodyType = {
  card?: CardType,
  deck?: DeckType,
  deckName?: string
}

type AuthData = {
  name?: string,
  email: string,
  password: string,
}


type FetchArgsType = {
  method: string,
  headers?: HeadersInit,
  body?: string,
  credentials?: "include",
}

const exports = {
  getDecks: (accessToken: string | null) => {
    return fetchRequest(`getDecks`, 'GET', {}, accessToken);
  },

  editCard: (card: CardType, deckName: string, isNew: boolean) => {
    console.log(`edit request made, isNew: ${isNew}, card:${card}`);
    return isNew
      ? fetchRequest('createCard', 'POST', { card, deckName })
      : fetchRequest('editCard', 'POST', { card, deckName });
  },

  deleteCard: (card: CardType, deckName: string) => {
    console.log(`delete request made, card:${card}`);
    return fetchRequest('deleteCard', 'POST', { card, deckName });
  },

  editDeck: (deck: DeckType) => {

  },

  deleteDeck: (deckName: string) => {
    console.log(`delete request made, deck:${deckName}`);
    return fetchRequest('deleteDeck', 'DELETE', { deckName });
  },

  login: (authState: AuthData) => {
    return fetchRequest('login', 'POST', authState)
  },

  register: (authState: AuthData) => {
    return fetchRequest('register', 'POST', authState)
  }
}


const fetchRequest = (url: string, method: string, body?: BodyType | AuthData, accessToken?:string | null ) => {
  let init: FetchArgsType = { method: method }
  if (method === 'POST') {
    init.headers = { 'Content-Type': 'application/json' };
    init.body = JSON.stringify(body);
  }
  if (url !== 'login' && url !== 'register') {
    init.credentials = 'include';
    init.headers  = {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + accessToken,
    };
  }

  return fetch(`${localURL}/${url}`, init)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(res => {
      console.log(res);
      return res.json()
    })
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    })
}

export default exports;



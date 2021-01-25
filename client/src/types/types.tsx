export interface CardSubmitType {
  _id: string,
  type: string,
  text: string,
  possibleAnswers: string[] | string,
  correctAnswer: string,
}

export interface CardType extends CardSubmitType {
  possibleAnswers: string[]
}

export type DeckType = {
  name: string,
  cards: CardType[]
};

export type urlParams = {
  deckName: string,
  cardID?: string
}

export type DeckProps = { decks: DeckType[] };
export type SingleDeckProp = { deck: DeckType };

export type Props = {
  updateDecks: () => void;
  getDeckFromName: (deckName: string) => DeckType;
  getCardFromID?: (deck: DeckType, id: string) => CardType;
  editCard?: (card: CardType, deckName: string, isNew: boolean) => void;
  deleteCard?: (card: CardType, deckName: string) => void;
  decks: DeckType[];
  refresh?: boolean;
}
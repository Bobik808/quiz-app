import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Navbar from './components/navbar.component';
import DeckList from './components/decklist.component';
import Deck from './components/deck.component';
import CardEdit from './components/cardedit.component';
import Quiz from './components/quiz.component';
import { DeckType, CardType } from './types/types';
import AuthForm from './components/authForm';
import ApiClient from './services/apiclient.service';
import {getSession} from './helpers/auth-pelpers'

//*
function App () {
  const [decks, setDecks] = useState<DeckType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(!!localStorage.getItem('access token') || false);

  useEffect(() => {
    const token = localStorage.getItem('access token');
    if (token) {
      setUserAuthenticated(true);
      console.log('userAuthenticated', userAuthenticated)
      ApiClient.getDecks(token)
        .then((deckList: DeckType[]) => setDecks(deckList))
    }
    console.log('userAuthenticated', userAuthenticated)
  }, [])

  const updateDecks = async () => {
    // console.log('decks before:', decks);
    let newDecks = [];
    newDecks = await ApiClient.getDecks(localStorage.getItem('access token'));
    // console.log('decks updated! newDecks:', newDecks);
    setDecks(newDecks);
    // console.log('decks after:', decks);
    setRefresh(!refresh);
  }

  const getDeckFromName = (deckName: string): DeckType => {
    const [selectedDeck] = decks.filter(deck => deck.name === deckName);
    return selectedDeck;
  }

  const getCardFromID = (deck: DeckType, id: string): CardType => {
    const [selectedCard] = deck.cards.filter(card => card._id === id);
    return selectedCard;
  }

  const editCard = async (card: CardType, deckName: string, isNew: boolean): Promise<void> => {
    await ApiClient.editCard(card, deckName, isNew);
  }

  const deleteCard = async (card: CardType, deckName: string): Promise<void> => {
    const deleteResult = await ApiClient.deleteCard(card, deckName);
    console.log('delete card triggered', card);
    console.log('deleteResult:', deleteResult);

  }

  console.log('Decks', decks);

  const renderApp = () => {
    return (
      <div className="App-body">
        <Switch>
          <Route path="/deck/:deckName/edit/:cardID">
            <CardEdit
              getDeckFromName={getDeckFromName}
              decks={decks}
              getCardFromID={getCardFromID}
              editCard={editCard}
              updateDecks={updateDecks}
            />
          </Route>
          <Route path="/deck/:deckName/quiz">
            {decks && decks.length > 0
              ? <Quiz
                getDeckFromName={getDeckFromName}
              />
              : <p>Loading...</p>}
          </Route>
          <Route path="/deck/:deckName">
            {decks && decks.length > 0
              ? <Deck
                decks={decks}
                getDeckFromName={getDeckFromName}
                deleteCard={deleteCard}
                updateDecks={updateDecks}
                refresh={refresh}
              />
              : <p>Loading...</p>}
          </Route>
          <Route exact path="/">
            {/* <DeckList decks={decks} /> */}
            {
              userAuthenticated && decks.length > 0
                ? <DeckList decks={decks} />
                : userAuthenticated && decks.length === 0
                  ? <p>Loading...</p>
                  : <Redirect to="/authenticate" />
            }
          </Route>
        </Switch>
      </div>
    )
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route path="/" render={(): any => {
          return getSession()
            ? renderApp()
            : <Redirect to="/authenticate">
            </Redirect>
        }}></Route>

        <Route path="/authenticate">
          <AuthForm />
        </Route>
      </BrowserRouter >
    </div >
  );
}

export default App;

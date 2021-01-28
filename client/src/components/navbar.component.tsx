import React from 'react';
import './components.scss';
import { Link } from 'react-router-dom';
import {getSession, logOut} from '../helpers/auth-pelpers'

const navbar = () => {

  return (
    <div className="navbar">
      <Link to={getSession() ? '/' : '/authenticate'}><h1>Quizzie</h1></Link>
      <div className="menu-items">
        <Link to={getSession() ? '/' : '/authenticate'}>Decks</Link>
      </div>
      <div className="menu-items">
        <Link onClick={logOut} to={getSession() ? '/' : '/authenticate'}>Sign out</Link>
      </div>
    </div>
  )
};

export default navbar;

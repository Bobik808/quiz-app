import React from 'react';
import './components.scss';
import { Link } from 'react-router-dom';

const navbar = () => (
  <div className="navbar">
    <Link to="/"><h1>Quizzie</h1></Link>
    <div className="menu-items">
      <Link to="/">Decks</Link>
    </div>
  </div>
);

export default navbar;

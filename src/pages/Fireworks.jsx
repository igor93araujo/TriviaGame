import React, { Component } from 'react';
import congrats from '../congrats.mp3';
import './Game.css';

export default class Fireworks extends Component {
  render() {
    return (
      <div className="fireWorksGifs">
        <img src="https://cliply.co/wp-content/uploads/2021/09/CLIPLY_372109170_FREE_FIREWORKS_400.gif" alt="fireworkgif" />
        <img src="https://cliply.co/wp-content/uploads/2021/09/CLIPLY_372109170_FREE_FIREWORKS_400.gif" alt="fireworkgif" />
        <img src="https://cliply.co/wp-content/uploads/2021/09/CLIPLY_372109170_FREE_FIREWORKS_400.gif" alt="fireworkgif" />
        <audio src={ congrats } autoPlay><track kind="captions" /></audio>
      </div>
    );
  }
}

import React, { Component } from 'react';
import sad from '../sadMusic.mp3';

export default class SadMusic extends Component {
  render() {
    return (
      <div>
        <audio src={ sad } autoPlay><track kind="captions" /></audio>
      </div>
    );
  }
}

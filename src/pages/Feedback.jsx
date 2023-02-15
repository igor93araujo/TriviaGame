import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import './Feedback.css';
// import savingRankingLocalStorage from '../components/Ranking';

// INICIAL_STATE = {
//   feebackMsg: '',
// };
class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      feebackMsg: '',
    };
    this.generateScoreFeeback = this.generateScoreFeeback.bind(this);
  }

  componentDidMount() {
    this.generateScoreFeeback();
    this.savingRankingLocalStorage();
  }

  getPlayers = () => {
    const allPlayers = localStorage.getItem('Ranking');
    return allPlayers ? JSON.parse(allPlayers) : [];
  };

  savingRankingLocalStorage = () => {
    const { player } = this.props;

    const playerObj = {
      name: player.name,
      score: player.score,
      picture: player.gravatarEmail,
    };
    const allPlayersRanking = this.getPlayers();
    localStorage.setItem('Ranking', JSON.stringify([...allPlayersRanking, playerObj]));
  };

  generateScoreFeeback = () => {
    const { player: {
      assertions, // aqui estava score, mas precisava ser numero de acertos, não pontuação
    } } = this.props;

    const scoreLine = 3;
    if (assertions < scoreLine) {
      this.setState({ feebackMsg: 'Could be better...' });
    } else {
      this.setState({ feebackMsg: 'Well Done!' });
    }
  };

  render() {
    const { player: {
      assertions,
      score,
      name,
      gravatarEmail,
    } } = this.props;
    const { feebackMsg } = this.state;
    return (
      <>
        <p data-testid="header-score" className="userScoreFb">
          { score }
        </p>
        <div className="feedbackConteiner">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            alt="Imagem gravatar"
            className={
              assertions > 2 ? 'wellDoneFbImg' : 'couldBeBetterFbImg'
            }
          />
          <h2 data-testid="header-player-name">
            { name }
          </h2>
          <h2
            data-testid="feedback-text"
            className={
              assertions > 2 ? 'wellDoneFb' : 'couldBeBetterFb'
            }
          >
            {feebackMsg}
          </h2>
          <div className="assertationFb">
            <h2>You have got</h2>
            <h2
              data-testid="feedback-total-question"
            >
              {assertions}
            </h2>
            <h2>of 5</h2>
          </div>
          <div className="assertationFb">
            <h2
              data-testid="feedback-total-score"
            >
              {score}
            </h2>
            <h2> points </h2>
          </div>
          <div className="feedbackBtns">
            <Link to="/">
              <button
                data-testid="btn-play-again"
                className="playAgainBtn"
              >
                Play Again
              </button>
            </Link>
            <Link to="/ranking">
              <button data-testid="btn-ranking" className="verRankingBtn">Ranking</button>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
    name: PropTypes.string,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  player: globalState.player,
});

export default connect(mapStateToProps)(Feedback);

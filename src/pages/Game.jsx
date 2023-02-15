import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineFieldTime } from 'react-icons/ai';
import MultipleChoice from '../components/MultipleChoice';
import Header from '../components/Header';
import { addAssertions, addScore } from '../redux/actions';
import './Game.css';
import Fireworks from './Fireworks';
import SadMusic from './SadMusic';

class Game extends React.Component {
  state = {
    results: [],
    question: {
      category: '',
      type: '',
      difficulty: '',
      question: '',
      correct_answer: '',
      incorrect_answers: [],
    },
    sortAnswer: [],
    questionPosition: 0,
    time: 30,
    isDisable: false,
    answerClass: false,
    fireWorks: false,
    sadSong: false,
  };

  componentDidMount() {
    this.getQuestion();
  }

  componentDidUpdate(props, state) {
    this.next(state);
    this.clear(state);
  }

  getQuestion = async () => {
    const API = 'https://opentdb.com/api.php?amount=5&token=';
    const getToken = localStorage.getItem('token');
    const responseAPI = await fetch(API + getToken);
    const responseJSON = await responseAPI.json();
    const responseErro = 3;
    if (responseJSON.response_code === responseErro) {
      localStorage.clear('token');
      const { history } = this.props;
      history.push('/');
    } else {
      const objectNull = {
        category: '',
        type: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answers: [],
      };
      this.setState({
        results: [objectNull, ...responseJSON.results],
      });
    }
  };

  verifyAnswer = ({ target }) => {
    const { time, question } = this.state;
    const questionSelect = target.innerHTML;
    clearInterval(this.killSpotWatch);
    this.setState({ answerClass: true, time: 0 });
    this.setScore(questionSelect, time, question);
  };

  setScore = (questionSelect, time, question) => {
    const { player, dispatch } = this.props;
    const { difficulty } = question;
    const scoreBase = 30;
    let { score, assertions } = player;
    const scoreDifficulty = { easy: 1, medium: 2, hard: 3,
    };
    if (questionSelect === question.correct_answer) {
      score += (scoreBase + (time * scoreDifficulty[difficulty]));
      dispatch(addScore(score));
      dispatch(addAssertions(assertions += 1));
      this.setState({ fireWorks: true, sadSong: false });
    } else {
      this.setState({ fireWorks: false, sadSong: true });
    }
  };

  nextQuestion = () => {
    this.setState({
      answerClass: false,
      fireWorks: false,
      sadSong: false,
    });
    const position = 5;
    const { questionPosition } = this.state;
    this.StartTime();
    this.stopWatch();
    if (questionPosition <= position) {
      this.generateQuestion();
    } else {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  next = (state) => {
    if (state.questionPosition < 1) {
      this.nextQuestion();
    }
  };

  clear = (state) => {
    const end = 1;
    if (state.time === end) {
      clearInterval(this.killSpotWatch);
      this.setState({
        isDisable: true,
      });
    }
  };

  stopWatch = () => {
    const ONE_SECUND = 1000;
    this.killSpotWatch = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        const secund = time - 1;
        this.setState({
          time: secund,
        });
      } else {
        clearInterval(this.killSpotWatch);
      }
    }, ONE_SECUND);
  };

  StartTime = () => {
    this.setState({
      time: 30,
      isDisable: false,
    });
  };

  generateQuestion = () => {
    const { results, questionPosition } = this.state;
    const question = results[questionPosition];
    const nextPosition = questionPosition + 1;
    const answer = [question.correct_answer, ...question.incorrect_answers];
    const sortAnswer = this.randomAnswer(answer);
    this.setState({
      question,
      questionPosition: nextPosition,
      sortAnswer,
      isDisable: false,
    });
  };

  randomAnswer = (answer) => {
    for (let index = 0; index < answer.length; index += 1) {
      const position = Math.floor(Math.random() * (index + 1));
      [answer[index], answer[position]] = [answer[position], answer[index]];
    }
    return answer;
  };

  render() {
    const {
      question,
      time,
      sortAnswer,
      isDisable,
      answerClass,
      fireWorks,
      sadSong,
    } = this.state;

    return (
      <div className="mainGame">
        <Header />
        <section className="gameConteiner">
          <div className="gameLeftBox">
            <p data-testid="question-category" className="questionCategory">
              { question.category }
            </p>
            <p data-testid="question-text" className="question-text">
              { question.question }
            </p>
            <div className="time-box">
              <AiOutlineFieldTime />
              <p>
                Time:
              </p>
              <p>{time}</p>
              <p>seconds</p>
            </div>
          </div>
          <div className="questions-box">
            {
              sortAnswer
                ? (

                  <MultipleChoice
                    verifyAnswer={ this.verifyAnswer }
                    answer={ sortAnswer }
                    correct={ question.correct_answer }
                    isDisabled={ isDisable }
                    answerClass={ answerClass }
                  />
                )
                : null
            }
            {
              answerClass || time === 0 ? (
                <button
                  type="button"
                  onClick={ this.nextQuestion }
                  data-testid="btn-next"
                  className="nextBtn"
                >
                  Next
                </button>) : null
            }
          </div>
        </section>
        { fireWorks && <Fireworks />}
        { sadSong && <SadMusic />}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  player: PropTypes.shape({
    score: PropTypes.number,
    assertions: PropTypes.number,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalSate) => ({
  player: globalSate.player,
});

export default connect(mapStateToProps)(Game);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MultipleChoice.css';

import '../pages/Game.css';

export default class MultipleChoice extends Component {
  setClass = (question, correct) => {
    const { answerClass } = this.props;
    if (answerClass) {
      if (question === correct) {
        return 'correctAnswer';
      }
      return 'wrongAnswer';
    }
  };

  render() {
    const { answer, correct, isDisabled, verifyAnswer } = this.props;
    return (
      <div data-testid="answer-options" className="questionsBtn">
        {
          answer.map((question, index) => (
            <button
              disabled={ isDisabled }
              type="button"
              key={ index }
              data-testid={
                question === correct
                  ? 'correct-answer'
                  : `wrong-answer-${index}`
              }
              onClick={ verifyAnswer }
              className={ this.setClass(question, correct) }
            >

              {question}
            </button>
          ))
        }
      </div>
    );
  }
}

MultipleChoice.propTypes = {
  answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  correct: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  verifyAnswer: PropTypes.func.isRequired,
  answerClass: PropTypes.bool.isRequired,
};

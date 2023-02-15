import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail, addName, addScore, fetchToken } from '../redux/actions';
import './Login.css';
import logoTrivia from '../logoTrivia.png';

class Login extends React.Component {
  state = {
    email: '',
    validEmail: false,
    name: '',
    validName: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(addScore(0));
  }

  verifyEmail = ({ target: { value } }) => {
    const validaEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(value);
    this.setState({
      validEmail: validaEmail,
      email: value,
    });
  };

  verifyName = ({ target: { value } }) => {
    const minLength = 0;
    const validaName = value.length > minLength;
    this.setState({
      validName: validaName,
      name: value,
    });
  };

  handleSettings = () => {
    const { history } = this.props;
    return history.push('/settings');
  };

  saveLocalStorage = (data) => {
    localStorage.setItem('token', data);
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const token = await dispatch(fetchToken());
    this.saveLocalStorage(token);
    const { email, name } = this.state;
    dispatch(addName(name));
    dispatch(addEmail(email));

    history.push('/game');
  };

  render() {
    const {
      email,
      validEmail,
      name,
      validName,
    } = this.state;

    return (
      <div className="loginPage">
        <img src={ logoTrivia } alt="logoTrivia" />
        <div className="loginFormPage">
          <form action="form">
            <p>Type you email and name for the ranking</p>
            <div className="loginInpts">
              <input
                type="email"
                name="email"
                id="email"
                value={ email }
                data-testid="input-gravatar-email"
                onChange={ this.verifyEmail }
                className="loginInput"
                placeholder="E-mail"
              />
              <input
                type="text"
                name="name"
                id="name"
                value={ name }
                data-testid="input-player-name"
                onChange={ this.verifyName }
                placeholder="Digite seu nome"
              />
            </div>
          </form>
          <button
            type="button"
            disabled={ (validEmail && validName) === false }
            onClick={ this.handleClick }
            data-testid="btn-play"
            className={ (validEmail && validName) === false
              ? 'loginBtnOff' : 'loginBtn' }
          >
            Play
          </button>
          <button
            onClick={ this.handleSettings }
            type="button"
            title="ConfigButton"
            data-testid="btn-settings"
            className="settings-btn"
          >
            Configuração
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);

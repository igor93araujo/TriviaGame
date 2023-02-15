import { screen } from '@testing-library/react';
import FeedBack from '../pages/Feedback';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('', () => {
  const playerMock = {
    name: 'Everson',
    gravataEmail: 'teste@teste.com',
    score: 20,
    assertions: 2,

  };
  const playerMock2 = {
    name: 'Everson',
    gravataEmail: 'teste@teste.com',
    score: 100,
    assertions: 5,
  };

  it('', () => {
    renderWithRouterAndRedux(<FeedBack />, { initialState: playerMock });
    const playerName = screen.getByTestId('header-player-name');

    const playerScore = screen.getByTestId('header-score');

    const assertions2 = screen.getByText(/could be better\.\.\./i);

    const point = 20;

    console.log(playerName);

    expect(playerName).toBeInTheDocument();
    expect(playerName).toHaveValue('Everson');
    expect(playerScore).toBeInTheDocument();
    expect(playerScore).toBe(point);
    expect(assertions2).toBeInTheDocument();
  });

  it('', () => {
    renderWithRouterAndRedux(<FeedBack />, { initialState: playerMock2 });

    const assertions5 = screen.getByTestId('feedback-text');

    expect(assertions5).toBeInTheDocument();
  });
});

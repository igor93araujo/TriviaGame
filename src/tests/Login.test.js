import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Cobertura de testes da tela de Login', () => {
  const cosntEmail = 'input-gravatar-email';
  const constName = 'input-player-name';
  const email = 'teste@teste.com';

  test('Verificando se os campos aparecem na tela', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId(cosntEmail);
    const nameInput = screen.getByTestId(constName);
    const playInput = screen.getByRole('button', {
      name: /play/i,
    });

    expect(emailInput).toBeDefined();
    expect(nameInput).toBeDefined();
    expect(playInput).toBeDefined();
    expect(playInput).toBeDisabled();
  });

  test('Verificando se botão Play é habilitado se dados corretos', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId(cosntEmail);
    const nameInput = screen.getByTestId(constName);
    const playInput = screen.getByRole('button', {
      name: /play/i,
    });
    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, email);
    userEvent.type(nameInput, 'John Doe');

    expect(playInput).toBeEnabled();
  });

  test('Verificando se botão Play continua desabilitado se dados incorretos', () => {
    renderWithRouterAndRedux(<App />);

    const wrongEmail = 'teste@teste.c';
    const wrongName = '';
    const rightEmail = email;

    const emailInput = screen.getByTestId(cosntEmail);
    const nameInput = screen.getByTestId(constName);
    const playInput = screen.getByRole('button', {
      name: /play/i,
    });

    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, wrongEmail);
    userEvent.type(nameInput, email);

    expect(playInput).toBeDisabled();

    userEvent.type(emailInput, rightEmail);
    userEvent.type(emailInput, wrongName);

    expect(playInput).toBeDisabled();
  });

  test('Verificando se botão "play" está desabilitado quando formulário vazio', () => {
    renderWithRouterAndRedux(<App />);

    expect(screen.getByTestId('btn-play')).toBeDisabled();
  });

  test('Quando inserimos somente valor nome, o botão fica desabilitado', () => {
    renderWithRouterAndRedux(<Login />);
    const nameInput = screen.getByTestId(constName);

    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'John Doe');
    expect(playBtn).toBeDisabled();
  });

  test('Quando inserido somente valor de e-mail, o botão fica desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const emailInput = screen.getByTestId(cosntEmail);

    const playBtn = screen.getByTestId('btn-play');
    userEvent.type(emailInput, email);
    expect(playBtn).toBeDisabled();
  });

  test('Verificando se ao clicar no botão "Play", ', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingButton = screen.getByTestId('btn-settings');

    userEvent.click(settingButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  test('Se usuario é encaminhado para pagina GAME ao clicar no botão play', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const nameInput = screen.getByTestId(constName);
    const emailInput = screen.getByTestId(cosntEmail);
    const playBtn = screen.getByRole('button', {
      name: /play/i,
    });

    userEvent.type(nameInput, 'John Doe');
    userEvent.type(emailInput, 'test@teste.com');

    userEvent.click(playBtn);
    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    });
  });
});

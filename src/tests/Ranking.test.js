import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../components/Ranking';

describe('Testando a tela de ranking', () => {

  const allPlayers = [{
    name: 'Everson',
    gravataEmail: 'teste@teste.com',
    score: 20,
    assertions: 2,
  },
  {
    name: 'igor',
    gravataEmail: 'teste@teste.com',
    score: 20,
    assertions: 2,
  },
  {
    name: 'Diogo',
    gravataEmail: 'teste@teste.com',
    score: 20,
    assertions: 2,
  }];

  const localStorageMock = (function () {
    let store = {};
  
    return {
      getItem(key) {
        return store[key];
      },
  
      setItem(key, value) {
        store[key] = value;
      },
  
      clear() {
        store = {};
      },
  
      removeItem(key) {
        delete store[key];
      },
  
      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, "localStorage", { value: localStorageMock });
  
  
  const setLocalStorage = () => {
    window.localStorage.setItem('Ranking', JSON.stringify(allPlayers));
  };
  const getLocalStorage = () => {
    window.JSON.parse.localStorage.getItem('Ranking');
  }; 

  it('Testa se há o texto Tela de Ranking na tela', () => {
    renderWithRouterAndRedux(<Ranking />);
  console.log(window.localStorage)
   setLocalStorage()
   getLocalStorage()

    const title = screen.getByTestId('ranking-title')
    expect(title).toBeInTheDocument();
  });
});

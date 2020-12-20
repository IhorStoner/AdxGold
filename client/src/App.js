import './App.css'
import { useAuth } from './hooks/useAuth'
import { AuthContext } from './context/AuthContext';
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Routes from './Routes'
import createStore from './redux/createStore'
import { Provider } from 'react-redux'

const store = createStore();

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token

  return (
    <Provider store={store}>
      <AuthContext.Provider  value={{ token, login, logout, userId, ready, isAuthenticated }}>
        <Router>
          <Routes />
        </Router>
      </AuthContext.Provider>
    </Provider>

  );
}

export default App;

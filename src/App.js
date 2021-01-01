import './App.css';
import { Provider } from 'react-redux'
import store from './store/store';
import AppRouter from './router/AppRouter';
import Navbar from './components/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Navbar/>
			<AppRouter/>
		</Provider>
  );
}

export default App

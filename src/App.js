import logo from './logo.svg';
import './App.css';
import SignIn from './pages/Signin';
import AllRoutes from './routes';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import  { preloginSelector } from './store/slices/preLoginSlice';

function App() {
  const {isLoading} = useSelector(preloginSelector)
  return (
    <div className="App">
      {isLoading &&  <Loader /> }
     
    <AllRoutes />
    </div>
  );
}

export default App;

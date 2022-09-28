import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Detail';
import LandingPage from './components/Landing';
import Form from './components/Form';


function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/videogames/:id' component={Details} />
      <Route exact path='/create' component={Form} />
    </BrowserRouter>
  );
}

export default App;

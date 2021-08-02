import SearchPage from './components/SearchPage';
import ItemDetail from './components/ItemDetail';
import DietPage from './components/DietPage';
// import Recipe from './components/Recipe';
import {Link} from 'react-router-dom'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {

  return(
    <div>
    <Router>
    <Link to={"/"}><h1>HomePage</h1></Link>
    <div className="App">
      <nav>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        {/* <Route path="/recipe" component={Recipe} /> */}
        <Route path="/recipe/:id" component={ItemDetail}/>
        <Route path="/diet" exact component={DietPage} />
      </Switch>
      </nav>
    </div>
    </Router>
    </div>
  )
}

export default App;

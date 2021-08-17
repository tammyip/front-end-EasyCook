import SearchPage from './components/SearchPage';
import RecipeDetail from './components/RecipeDetail';
import DietPage from './components/DietPage';
import Facebook from './components/Facebook';
import Favorites from './components/Favorites';
import Plans from './components/Plans';
import PlanDetail from './components/PlanDetail';
import NewRecipeForm from './components/NewRecipeForm';
import React, { useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './App.css';

const App = () => {
  // const BASE_URL = "https://inspiration-board-tashforce.herokuapp.com";
  // const BASE_URL = "http://localhost:5000"
  const BASE_URL = "https://backend2-easycook.herokuapp.com"
  const [users, setUsers] = useState([]);
  const [login, setLogin] = useState(false);
  const [errors, setErrors] = useState(null);

  // Create a new user
  const createNewUser = (userFieldDict) =>{
    axios.post(`${BASE_URL}/user`, userFieldDict)
      .then((response) =>{
        const newusers = [...users];
        newusers.push(response.data)
        setUsers(newusers);
        setLogin(true);
      })
      .catch(() => {
        setErrors("Fail to create a new user");
      });
  }

  const history = useHistory();

  return(
    <div className="App">
    <header className="App-header">
      <Router>
      <section className="header">
        <h1 className="site_name">EasyCook</h1>
        <Link to={"/"}><h1>Home</h1></Link>
        <Link to={"/diet"}><h1>Diet Plan</h1></Link> 
        {users.length > 0 && <Link to={`/${users[0].user_id}/favorites`}><h1>Favorites</h1></Link>}
        {users.length > 0 && <Link to={`/${users[0].user_id}/plans`}><h1>Meal Plans</h1></Link>}
        <Facebook createNewUser={createNewUser} history={history}/>
        </section>
    <div>{errors}</div>
      <main>
      <Switch>
        <Route path="/" exact render={(props) => <SearchPage {...props}/>}/>
        <Route path="/" exact component={SearchPage} />
        <Route path="/recipe/:id" component={(props) => <RecipeDetail {...props} users={users}/>}/>
        <Route path="/diet" exact component={DietPage} />
        <Route path="/:id/favorites" component={(props) => <Favorites {...props} users={users} login={login}/>}/>
        <Route path="/:id/plans" component={(props) => <Plans {...props}  users={users}/>}/>
        <Route path="/plans/:plan_id/recipes" exact component={PlanDetail} />
        <Route path="/:id/addrecipe/:recipe_id" exact component={(props) => <NewRecipeForm {...props}  users={users}/>}/>
      </Switch>
      </main>
    </Router>
    </header>
    </div>
  )
}

export default App;

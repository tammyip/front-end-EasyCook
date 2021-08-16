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
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [errors, setErrors] = useState(null);

  // Create a new user
  const createNewUser = (userFieldDict) =>{
    axios.post("http://localhost:5000/user", userFieldDict)
      .then((response) =>{
        const newusers = [...users];
        newusers.push(response.data)
        setUsers(newusers);
      })
      .catch(() => {
        setErrors("Fail to create a new user");
      });
  }

  // Add a new recipe to Favorites
  // const addToFavorites = (recipeFieldDict) =>{
  //   // axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/${users.user_id}/favorites`, recipeFieldDict)
  //   axios.post(`http://localhost:5000/user/${users[0].user_id}/favorites`, recipeFieldDict)
  //     .then((response) =>{
  //       const newrecipes = [...recipes];
  //       newrecipes.push(response.data)
  //       setRecipes(newrecipes);
  //     })
  //     .catch(() => {
  //       setErrors("Fail to add a new recipe");
  //     });
  // }

  const history = useHistory();

  return(
    <div>
    <Facebook createNewUser={createNewUser} history={history}/>
    <Router>
    <Link to={"/"}><h1>HomePage</h1></Link>
    <Link to={"/diet"}><h1>Diet Plan</h1></Link> 
    {users.length > 0 && <Link to={`/${users[0].user_id}/favorites`}><h1>Saved Favorites</h1></Link>}
    {users.length > 0 && <Link to={`/${users[0].user_id}/plans`}><h1>Meal Plans</h1></Link>}
    <div>{errors}</div>
    <div className="App">
      <Switch>
        <Route path="/" exact component={SearchPage} />
        <Route path="/recipe/:id" component={(props) => <RecipeDetail {...props} users={users}/>}/>
        <Route path="/diet" exact component={DietPage} />
        <Route path="/:id/favorites" component={(props) => <Favorites {...props} users={users}/>}/>
        <Route path="/:id/plans" component={(props) => <Plans {...props}  users={users}/>}/>
        <Route path="/plans/:plan_id/recipes" exact component={PlanDetail} />
        <Route path="/:id/addrecipe/:recipe_id" exact component={(props) => <NewRecipeForm {...props}  users={users}/>}/>
      </Switch>
    </div>
    </Router>
    </div>
  )
}

export default App;

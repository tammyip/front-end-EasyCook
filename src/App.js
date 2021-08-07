import SearchPage from './components/SearchPage';
import ItemDetail from './components/ItemDetail';
import DietPage from './components/DietPage';
import Facebook from './components/Facebook';
import Favorites from './components/Favorites';
// import Recipe from './components/Recipe';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  // const BASE_URL = "https://inspiration-board-tashforce.herokuapp.com";
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [errors, setErrors] = useState(null);

  // Create a new user
  const createNewUser = (userFieldDict) =>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, userFieldDict)
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
  const addToFavorites = (recipeFieldDict) =>{
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/${user_id}/favorites`, recipeFieldDict)
      .then((response) =>{
        const newrecipes = [...recipes];
        newrecipes.push(response.data)
        setRecipes(newrecipes);
      })
      .catch(() => {
        setErrors("Fail to add a new recipe");
      });
  }

  // Delete a recipe in Favorites
  const deleteFromFavorites = (recipe_id) =>{
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipe_id}`)
      .then(() =>{
        const allRecipes = [...recipes];
        let i = 0;
        for (const recipe of allRecipes){
          if (recipe_id === recipe.recipe_id){
            allRecipes.splice(i, 1)
            break;
          }
          i++;
        }
        setRecipes(allRecipes);
      })
      .catch(() => {
        setErrors("Fail to delete a recipe");
      });
  }

  return(
    <div>
    <Facebook />
    <Router>
    <Link to={"/"}><h1>HomePage</h1></Link>
    <Link to={"/diet"}><h1>Diet Plan</h1></Link>
    <div>{errors}</div>
    <div className="App">
      <nav>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        {/* <Route path="/recipe" component={Recipe} /> */}
        <Route path="/recipe/:id" component={ItemDetail}/>
        <Route path="/diet" exact component={DietPage} />
        <Route path="/:id/favorites" component={Favorites} />
      </Switch>
      </nav>
    </div>
    </Router>
    </div>
  )
}

export default App;

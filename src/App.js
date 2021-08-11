import SearchPage from './components/SearchPage';
import ItemDetail from './components/ItemDetail';
import DietPage from './components/DietPage';
import Facebook from './components/Facebook';
import Favorites from './components/Favorites';
import Fav from './components/Fav';
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
  // const [curUser, setcurUser] = useState([]);

  // Create a new user
  const createNewUser = (userFieldDict) =>{
    console.log(`${process.env.REACT_APP_BACKEND_URL}/user`)
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
  const addToFavorites = (recipeFieldDict) =>{
    console.log(users)
    // axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/${users.user_id}/favorites`, recipeFieldDict)
    axios.post(`http://localhost:5000/user/${users[0].user_id}/favorites`, recipeFieldDict)
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
    // axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${recipe_id}`)
    axios.delete(`http://localhost:5000/favorites/${recipe_id}`)
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

    // Show all recipes in an user's Favorites
    // const showFavorites = () => {
    //   console.log(users)
    //   // axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${users.user_id}/favorites`)
    //   axios.get(`http://localhost:5000/user/${users[0].user_id}/favorites`)
    //   .then((response) => {
    //     const allRecipes = [...recipes];
    //     allRecipes.push(response.data)
    //     setRecipes(response.data.recipes);
    //   })
    //   .catch(() => {
    //     setErrors("Fail to show saved recipes");
    //   });
    // }

  return(
    <div>
    <Facebook createNewUser={createNewUser}/>
    <Router>
    <Link to={"/"}><h1>HomePage</h1></Link>
    <Link to={"/diet"}><h1>Diet Plan</h1></Link> 
    {users.length > 0 && <Link to={`/${users[0].user_id}/favorites`}><h1>Saved Favorites</h1></Link>}
    <div>{errors}</div>
    <div className="App">
      <Switch>
        <Route path="/" exact component={SearchPage} />
        {/* <Route path="/recipe/:id" component={ItemDetail}/> */}
        <Route path="/recipe/:id" component={(props) => <ItemDetail {...props} addToFavorites={addToFavorites} />}/>
        <Route path="/diet" exact component={DietPage} />
        {/* <Route path="/:id/favorites" exact component={Fav} /> */}
        <Route path="/:id/favorites" component={(props) => <Favorites {...props} deleteFromFavorites={deleteFromFavorites} 
        users = {users}
        />}
        />
      </Switch>
    </div>
    </Router>
    </div>
  )
}

export default App;

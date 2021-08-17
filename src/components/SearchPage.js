import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import { useHistory } from "react-router-dom";

function SearchPage () {

    const APP_ID = '1d5e85ae';
    const APP_KEY = '4878708fa2e477084834d032c7e9d5c9';
  
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const history = useHistory();
  
    useEffect(() =>{
      getRecipes();
    }, [query, history]);
    // getRecipes();
    // const getRecipes = async () =>{
    //   const cachedHits = localStorage.getItem(query);
    //   if (cachedHits){
    //     setRecipes({ hits: JSON.parse(cachedHits) });
    //   } else {
    //   axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    //   .then((response) =>{
    //     setRecipes(response.data.hits);
    //     const cachedHits = localStorage.getItem(response.data.hits);
    //     console.log(cachedHits)
    //   })
    //   .catch(() => {
    //     console.log('error!');
    //   });
    //   }
    // };

  //   useEffect(() =>{
  //     console.log("AAAAAAAAAAAAAA")
  //     getRecipes();
  //  },[]);
    // console.log("AAAAAAAAAAAAAA")
    const getRecipes = async () =>{
      if (history.location.state){
        console.log("I am back")
        setRecipes(history.location.state);
      } else {
      axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      .then((response) =>{
        setRecipes(response.data.hits);
      })
      .catch(() => {
        console.log('error!');
      });
      }
    };

    const updateSearch = e => {
      setSearch(e.target.value)
    }

    const routeChange = () => {
        let path = `/?query=${search}`;
        history.push(path);
        setQuery(search);
    }

    // whenever I submit the search form, I run this function
    const getSearch = e =>{
      e.preventDefault();
      setQuery(search);
      setSearch('');
      routeChange();
    }

    // get the recipe ID
    const extractIdFromUri = (uri) => {
      return uri.split('#recipe_').pop()
  }

return (
    <div>
      <form onSubmit = {getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch} />
      <button className="search-button" type="submit">Search</button>
    </form>
    <div className="recipes">
    <section className="favMeals">
    {recipes.map(recipe => (
      <Recipe
      key={recipe.recipe.uri}
      title={recipe.recipe.label}
      image={recipe.recipe.image}
    //   id={recipe.recipe.uri.split('#recipe_').pop()}
      id = {extractIdFromUri(recipe.recipe.uri)}
      ingredients={recipe.recipe.ingredients}
      recipes={recipes}
      history={history}
      />
    ))}
    </section>
    </div>
    </div>
  )
}

export default SearchPage;
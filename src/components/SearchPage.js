import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import { useHistory } from "react-router-dom";
// import { Image } from 'semantic-ui-react';
import cook from '../images/cook02.jpg';

function SearchPage () {

    const APP_ID = '1d5e85ae';
    const APP_KEY = '4878708fa2e477084834d032c7e9d5c9';
  
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [mainpic, setMainpic] = useState(cook);
    const history = useHistory();
  
    // useEffect(() =>{
    //   getRecipes();
    //   setMainpic(mainpic);
    // }, [query, history, mainpic]);

    useEffect(() =>{
      getRecipes();
      // showImage();
    }, [query, history, mainpic]);

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

    //don't need this function mainpic is updated using state and your useEffect
    // const showImage = () =>{
    //   return (<img src={mainpic} />)
    // }

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
      setMainpic('');
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
    {/* <Image src='https://i.pinimg.com/564x/02/ac/ae/02acaed47cacaa668ba57f18ab86ab80.jpg' alt="upload-image" /> */}
    {/* {showImage} */}
    <img src={mainpic} className="mainpic" />
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
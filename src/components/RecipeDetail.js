import React, { useState, useEffect } from 'react';
import SingleIngredient from './SingleIngredient';
import { useHistory} from 'react-router-dom';
import axios from 'axios';

function RecipeDetail(props) {

    useEffect(() => {
        fetchItem();
    }, []);

    const [recipes, setRecipes] = useState([]);
    const [item, setItem] = useState(null);
    const [errors, setErrors] = useState(null);
    const user_status = localStorage.getItem('logged in');
    const history = useHistory();

    const fetchItem = async () =>{
        const APP_ID = '1d5e85ae';
        const APP_KEY = '4878708fa2e477084834d032c7e9d5c9';
        const fetchItem = await fetch(
            `https://api.edamam.com/api/recipes/v2/${props.match.params.id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
        const item = await fetchItem.json();
        setItem(item);
    };

    if (item === null){
        return null;
    }

    // Add a new recipe to Favorites
    const addToFavorites = (recipeFieldDict) =>{
      if (user_status){
        axios.post(`https://backend2-easycook.herokuapp.com/user/${props.users[0].user_id}/favorites`, recipeFieldDict)
          .then((response) =>{
          const newrecipes = [...recipes];
          newrecipes.push(response.data)
          setRecipes(newrecipes);
          alert('🥑 Added to Favorite! 🥑')
        })
        .catch(() => {
          setErrors("Fail to add a new recipe");
        });
        } else {
          alert("💡 Please log in 💡")
        }
    }
    const addToPlanRedirect = () =>{
      if (user_status){
        history.push(`/${props.users[0].user_id}/addrecipe/${props.match.params.id}`)
      } else {
        alert("💡 Please log in 💡")
    }
  } 

    const backPage= () =>{
      history.goBack()
      fetchItem();
    }

    return (
        <div className="recipe-detail">
            <h1>{item.recipe.label}</h1>
            <img src={item.recipe.image} alt="" className="one-recipe"/>
            <p>Calories: {Math.round(item.recipe.calories)}</p>
            <p className="ingredients">{item.recipe.ingredients.map(ingredient =>(
                <li>
                    <SingleIngredient
                    key={item.recipe.uri} 
                    ingredient = {ingredient}/>
                </li>
            ))}</p>
            <p className="website"> 🌟 Cooking Direction:
              <span><a href={item.recipe.url} target="_blank" rel="noreferrer" className="recipe_link">{item.recipe.url}</a></span>
            </p>
            <button onClick={() => addToFavorites(item.recipe)}>Add to Favorites</button>
            <button onClick={addToPlanRedirect}>Add to Plan</button>
            <div
            className="fb-share-button"
            data-href={item.recipe.url}
            data-layout="button_count"
            data-size="large"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.facebook.com/sharer/sharer.php?u=${item.recipe.url}`}
              className="fb_share"
            >
              🍔 Share to Facebook 🍔
            </a>
          </div>
        </div>
    );
}

export default RecipeDetail;

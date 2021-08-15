import React, { useState, useEffect } from 'react';
import SingleIngredient from './SingleIngredient';
import { useHistory} from 'react-router-dom';

function RecipeDetail(props) {
    const history = useHistory();

    // const routeChange = () => {
    //     let path = `/?query=${match.search}`;
    //     history.push(path);
    // }
  // console.log(props)
    useEffect(() => {
        fetchItem();
        // console.log(match);
    }, []);

    const [item, setItem] = useState(null);

    const fetchItem = async () =>{
        const APP_ID = '1d5e85ae';
        const APP_KEY = '4878708fa2e477084834d032c7e9d5c9';
        const fetchItem = await fetch(
          // `https://api.edamam.com/api/recipes/v2/${match.params.id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
            `https://api.edamam.com/api/recipes/v2/${props.match.params.id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
        const item = await fetchItem.json();
        setItem(item);
        console.log(item);
    };

    if (item === null){
        return null;
    }

    const addToFavClick = ()  =>{
        console.log(item)
        props.addToFavorites(item.recipe);
        console.log("added to db")
    }

    // let recipe_id=recipe.uri.split('#recipe_').pop()
    // Redirect to page of adding recipe to a plan
    const redirect = () =>{
      history.push(`/${props.users[0].user_id}/addrecipe/${props.match.params.id}`)
    }

  // Add a new recipe to Favorites
  //   const addToFavorites = (recipeFieldDict) =>{
  //     // axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/${props.users[0].user_id}/favorites`, recipeFieldDict)
  //     axios.post(`http://localhost:5000/user/${props.users[0].user_id}/favorites`, recipeFieldDict)
  //     .then((response) =>{
  //       const newrecipes = [...recipes];
  //       newrecipes.push(response.data)
  //       setRecipes(newrecipes);
  //     })
  //     .catch(() => {
  //       setErrors("Fail to add a new recipe");
  //     });
  // }

    return (
        <div>
            <button onClick={history.goBack}>Back</button>
            <h1>{item.recipe.label}</h1>
            <img src={item.recipe.image} alt=""/>
            <p>Calories: {Math.round(item.recipe.calories)}</p>
            <p>{item.recipe.ingredients.map(ingredient =>(
                <li>
                    <SingleIngredient
                    key={item.recipe.uri} 
                    ingredient = {ingredient}/>
                </li>
            ))}</p>
            <p className="website"> Cooking Direction:
              <span><a href={item.recipe.url} target="_blank" rel="noreferrer">{item.recipe.url}</a></span>
            </p>
            {/* <button onClick={addToFavorites(item.recipe)}>Add to Favorites</button> */}
            <button onClick={addToFavClick}>Add to Favorites</button>
            <button onClick={redirect}>Add to Plan</button>
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
              className="fb-xfbml-parse-ignore"
            >
              Share to Facebook
            </a>
          </div>
        </div>
    );
}

export default RecipeDetail;

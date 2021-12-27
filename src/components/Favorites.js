import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Favorites = ({users}) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [errors, setErrors] = useState(null);
    const user_status = localStorage.getItem('logged in');

// Displaying all favorite recipes
    useEffect(() => {
        if (user_status){
        axios.get(`https://backend2-easycook.herokuapp.com/user/${users[0].user_id}/favorites`)
          .then((response) => {
              const allRecipes = [...favRecipes]
              allRecipes.push(response.data)
              setfavRecipes(response.data.recipes);
          })
          .catch(() => {
            setErrors("Fail to show saved recipes");
          });
        }
      },[]);
    
// Delete a recipe in Favorites
    const deleteFromFavorites = (recipe_id) =>{
        axios.delete(`https://backend2-easycook.herokuapp.com/recipes/${recipe_id}`)
        .then(() =>{
            const allRecipes = [...favRecipes];
            let i = 0;
            for (const recipe of allRecipes){
                if (recipe_id === recipe.recipe_id){
                    allRecipes.splice(i, 1)
                    break;
                }
                i++;
        }
        setfavRecipes(allRecipes);
      })
      .catch(() => {
        setErrors("Fail to delete a recipe");
      });
  }
    if (favRecipes.length > 0){
        return(
            <section className="favMeals">
                {favRecipes.map(favRecipe => (
                <article className="favRecipe"> 
                <h1>{favRecipe["title"]}</h1>
                <img src={favRecipe["image"]} alt=""/>
                <button type="button"
                onClick={(e) => {
                e.preventDefault();
                window.open(favRecipe["url"]);
                }}> Link to recipe</button>
                <button onClick={()=>deleteFromFavorites(favRecipe["recipe_id"])}>Delete</button>
                </article>
                ))}
            </section>
        );
      } else {
          return "No saved recipe";
      }  
}

export default Favorites;
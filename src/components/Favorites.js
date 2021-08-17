import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favorites.css';
import {Link} from 'react-router-dom'

const Favorites = ({users, login}) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [errors, setErrors] = useState(null);
    const user_status = localStorage.getItem('logged in');

// Displaying all favorite recipes
    useEffect(() => {
        if (user_status){
        axios.get(`https://backend2-easycook.herokuapp.com/user/${users[0].user_id}/favorites`)
          .then((response) => {
              console.log("All my saved recipes")
              console.log(response.data)
              const allRecipes = [...favRecipes]
              allRecipes.push(response.data)
              setfavRecipes(response.data.recipes);
            //   setfavRecipes(response.data);
              console.log(favRecipes)
          })
          .catch(() => {
            setErrors("Fail to show saved recipes");
          });
        }
      },[]);
    
// Delete a recipe in Favorites
    const deleteFromFavorites = (recipe_id) =>{
    // axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${recipe_id}`)
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
                <p>{favRecipe["title"]}</p>
                <img src={favRecipe["image"]} alt=""/>
                {/* <a href={favRecipe["url"]} class="button" target="_blank" rel="noreferrer">Link to recipe</a> */}
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
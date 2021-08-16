import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Favorites.css';

const Favorites = ({users}) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [errors, setErrors] = useState(null);

// Displaying all favorite recipes
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${users[0].user_id}/favorites`)
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
      },[]);
    
// Delete a recipe in Favorites
    const deleteFromFavorites = (recipe_id) =>{
    // axios.delete(`${process.env.REACT_APP_BACKEND_URL}/favorites/${recipe_id}`)
        axios.delete(`http://localhost:5000/recipes/${recipe_id}`)
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
            <div>
                {favRecipes.map(favRecipe => (
                <div className="favRecipe"> 
                <p>{favRecipe["title"]}</p>
                <img src={favRecipe["image"]} alt=""/>
                <p>Link to recipe:</p>
                <a href={favRecipe["url"]} target="_blank" rel="noreferrer">{favRecipe["url"]}</a>
                <p> </p>
                <button onClick={()=>deleteFromFavorites(favRecipe["recipe_id"])}>DELETE</button>
                </div>
                ))}
            </div>
        );
      } else {
          return "No saved recipe";
      }  
}

export default Favorites;
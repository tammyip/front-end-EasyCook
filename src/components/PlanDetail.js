import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
// useParams for line 15 to grab the plan_id and the id in route path in app.js

const PlanContent = () => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [plans, setPlans] = useState([]);
    const [errors, setErrors] = useState(null);
    const { plan_id } = useParams();

// Show all recipes saved in a plan
    useEffect(() => {
        axios.get(`http://localhost:5000/plans/${plan_id}/recipes`)
        .then((response) => {
            console.log("All recipes in this plan")
            console.log(response.data)
            const allRecipes = [...favRecipes]
            allRecipes.push(response.data)
            setfavRecipes(response.data.recipes);
      })
      .catch(() => {
        setErrors("Fail to show recipes in this plan");
      });
  },[]);
    
// Delete a recipe in a plan
    const deleteFromPlan = (recipe_id) =>{
    // axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipes/${recipe_id}`)
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

// Delete a meal plan
const deletePlan = (plan_id) =>{
    // axios.delete(`${process.env.REACT_APP_BACKEND_URL}/${plan_id}`)
        axios.delete(`http://localhost:5000/plans/${plan_id}`)
        .then(() =>{
            const allPlans = [...plans];
            let i = 0;
            for (const plan of allPlans){
                if (plan_id === plan.plan_id){
                    allPlans.splice(i, 1)
                    break;
                }
                i++;
        }
        setPlans(allPlans);
      })
      .catch(() => {
        setErrors("Fail to delete a meal plan");
      });
    }

    if (favRecipes.length > 0){
        return(
            <div>
                <h2>My recipes in this meal plan</h2>
                <button onClick={() => deletePlan(plans["plan_id"])}>DELETE PLAN</button>
                {favRecipes.map(favRecipe => (
                <div>
                <h3>{favRecipe["title"]}</h3>
                <img src={favRecipe["image"]} alt=""/>
                <p>Link to recipe: </p>
                <a href={favRecipe["url"]} target="_blank" rel="noreferrer">{favRecipe["url"]}</a>
                <button onClick={()=>deleteFromPlan(favRecipe["recipe_id"])}>Delete Recipe</button>
                </div>
                ))}
            </div>
        );
      } else {
          return "No saved recipe in this meal plan";
      }  
}

export default PlanContent;
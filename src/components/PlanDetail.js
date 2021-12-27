import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useHistory} from "react-router-dom";

const PlanContent = ({users}) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [plans, setPlans] = useState([]);
    const [errors, setErrors] = useState(null);
    const { plan_id } = useParams();
    const history = useHistory();

// Show all recipes saved in a plan
    useEffect(() => {
        axios.get(`https://backend2-easycook.herokuapp.com/plans/${plan_id}/recipes`)
        .then((response) => {
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

// Delete a meal plan
const deletePlan = (plan_id) =>{
        axios.delete(`https://backend2-easycook.herokuapp.com/plans/${plan_id}`)
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
        history.push(`/user/${users[0].user_id}/plans`);
      })
      .catch(() => {
        setErrors("Fail to delete a meal plan");
      });
    }

    if (favRecipes.length >= 0){
        return(
            <div>
            <button onClick={() => deletePlan(plan_id)}>DELETE PLAN</button>
            <section className="favMeals">
                {favRecipes.map(favRecipe => (
                    <article className="favRecipe">
                    <h3>{favRecipe["title"]}</h3>
                    <img src={favRecipe["image"]} alt=""/>
                    <button type="button"
                    onClick={(e) => {
                    e.preventDefault();
                    window.open(favRecipe["url"]);
                    }}> Link to recipe</button>
                    <button onClick={()=>deleteFromPlan(favRecipe["recipe_id"])}>Delete</button>
                    </article>
                ))}
            </section>
            </div>
        );
      } else {
          return "No saved recipe in this meal plan";
      }  
}

export default PlanContent;
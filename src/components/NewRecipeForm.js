import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";

const NewRecipeForm = (props) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [plans, setPlans] = useState([]);
    const [item, setItem] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [errors, setErrors] = useState(null);
    const { plan_id } = useParams();
    const history = useHistory();

    console.log(props)
// Displaying all meal plans of an user
    useEffect(() => {
        fetchItem();
        axios.get(`https://backend2-easycook.herokuapp.com/user/${props.users[0].user_id}/plans`)
          .then((response) => {
            //   console.log(response.data)
              const allPlans = [...plans, ...response.data.plans]
              setPlans(allPlans);
            //   console.log(allPlans)
            //   setPlans(response.data);
            //   console.log(plans)
          })
          .catch(() => {
            setErrors("Fail to show plans");
          });
      },[]);

    const fetchItem = async () =>{
        const APP_ID = '1d5e85ae';
        const APP_KEY = '4878708fa2e477084834d032c7e9d5c9';
        const fetchItem = await fetch(
          // `https://api.edamam.com/api/recipes/v2/${match.params.id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
            `https://api.edamam.com/api/recipes/v2/${props.match.params.recipe_id}?type=public&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
        const item = await fetchItem.json();
        setItem(item);
        console.log(item);
    };

    if (item === null){
        console.log("it's null")
        return null;
    }

    // Show all recipes for the selected plan
    const onClickPlan = (plan) => {
    // update "selected plan"
        setSelectedPlan(plan);
        axios.get(`https://backend2-easycook.herokuapp.com/plans/${plan.plan_id}/recipes`)
        .then((response) => {
            const allRecipes = [...favRecipes]
            allRecipes.push(response.data)
            setfavRecipes(response.data.recipes);
        })
        .catch(() => {
            setErrors("Fail to show recipes in this plan");
        });
    }

// Add a recipe to a plan
    const addToPlan = (recipeFieldDict) =>{
    // axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/${plans.plan_id`, recipeFieldDict)
        axios.post(`https://backend2-easycook.herokuapp.com/plans/${selectedPlan.plan_id}`, recipeFieldDict)
        .then((response) =>{
            const newrecipes = [...favRecipes];
            newrecipes.push(response.data)
            setfavRecipes(newrecipes);
            console.log("added recipe to plan")
            history.push(`/plans/${selectedPlan.plan_id}/recipes`);
        })
        .catch(() => {
            setErrors("Fail to add a new recipe");
        });
    }

    return(
        <div>
            <h3>✨PICK A PLAN✨</h3>
            {plans.map(plan => (
                <p className="pick_plan_name" key={plan.plan_id} onClick={() => onClickPlan(plan) }>
                {plan.plan_name}
                </p>           
                // <div key={plan.plan_id}>
                // <h3>{plan["plan_name"]}</h3>
                // {/* <img src={favRecipe["image"]} alt=""/> */}
                // <button onClick={()=>addToPlan(item.recipe)}>Add Recipe</button>
                // </div>
            ))}
            {/* <h3>SELECTED PLAN</h3> */}
            <div className="myplan">
            <div>{selectedPlan?.plan_name}</div>
            <button onClick={()=>addToPlan(item.recipe)}>Add Recipe</button>
            </div>
        </div>
    );
}

export default NewRecipeForm;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import NewPlanForm from './NewPlanForm';

const Plans = ({users}) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [plans, setPlans] = useState([]);
    const [errors, setErrors] = useState(null);
    const [toggle, setToggle] = useState(true);

// Displaying all meal plans of an user
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${users[0].user_id}/plans`)
          .then((response) => {
              console.log("All my saved meal plans")
              console.log(response.data)
              const allPlans = [...plans]
              allPlans.push(response.data)
              setPlans(response.data.plans);
            //   setfavRecipes(response.data);
              console.log(plans)
          })
          .catch(() => {
            setErrors("Fail to show saved meal plans");
          });
      },[]);

// Create a new plan
    const createNewPlan = (planFieldDict) =>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/boards`, planFieldDict)
        .then((response) =>{
            const newplans = [...plans];
            newplans.push(response.data)
            setPlans(newplans);
        })
        .catch(() => {
            setErrors("Fail to create a new plan");
        });
  }

// Hide the create plan form
    const toggler = () =>{
        setToggle(!toggle);
    }

    const buttonText = toggle === true ? "Hide New Plan Form" : "Show New Plan Form";

    let newPlan;
    if (toggle) {
        newPlan = <NewPlanForm setPlans={setPlans} createNewPlan={createNewPlan}/>
    } else{
        newPlan = null;
    }

// Add a recipe to a plan
    const addToPlan = (recipeFieldDict) =>{
    // axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/${users.user_id}/favorites`, recipeFieldDict)
        axios.post(`http://localhost:5000/user/${plans.plan_id}`, recipeFieldDict)
        .then((response) =>{
            const newrecipes = [...favRecipes];
            newrecipes.push(response.data)
            setfavRecipes(newrecipes);
        })
        .catch(() => {
            setErrors("Fail to add a new recipe");
        });
    }

    if (plans.length > 0){
        return(
            <div>
                <div>
                <p>CREATE A NEW PLAN</p>
                {newPlan}
                <button onClick={toggler}>{buttonText}</button>
                </div>
                {plans.map(plan => (
                <div>
                <Link to={`/plans/${plan.plan_id}/recipes`} className="btn btn-primary">{plan["plan_name"]}</Link>
                </div>
                ))}
            </div>
        );
      } else {
          return "No saved plan";
      }  
}

export default Plans;
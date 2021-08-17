import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import NewPlanForm from './NewPlanForm';

const Plans = ({users}) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [plans, setPlans] = useState([]);
    const [errors, setErrors] = useState(null);
    const [toggle, setToggle] = useState(false);
    const user_status = localStorage.getItem('logged in');

// Displaying all meal plans of an user
    useEffect(() => {
        if (user_status){
        axios.get(`https://backend2-easycook.herokuapp.com/user/${users[0].user_id}/plans`)
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
        }
      },[]);

// Create a new plan
    const createNewPlan = (planFieldDict) =>{
        axios.post(`https://backend2-easycook.herokuapp.com/user/${users[0].user_id}/plans`, planFieldDict)
        .then((response) =>{
            const newplans = [...plans];
            newplans.push(response.data)
            console.log(response.data)
            setPlans(newplans);
            console.log("created a new plan")
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


        return(
            <div>
                <div className="plan">
                <h3>🥢CREATE NEW PLAN🥢</h3>
                {newPlan}
                <button onClick={toggler}>{buttonText}</button>
                </div>
                <div className="myplan">
                <h3>🍤 MY PLANS 🍤</h3>
                {plans.map(plan => (
                <p>
                {/* <Link to={`/plans/${plan.plan_id}/recipes`} className="btn btn-primary">{plan["plan_name"]}</Link> */}
                {/* <Link to={`/plans/${plan.plan_id}/recipes`}>{plan["plan_name"]}</Link> */}
                 <a href={`/plans/${plan.plan_id}/recipes`}>{plan["plan_name"]}</a>
                </p>
                ))}
                </div>
            </div> 
        )
      }  


export default Plans;
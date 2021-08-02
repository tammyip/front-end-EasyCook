import React, { useState, useEffect } from 'react';
import DietPlan from './DietPlan';

function DietPage() {

    const APP_KEY = 'b59c0d82ab16431794430b3a34a36070';

    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);

    function handleChange(e) {
        setCalories(e.target.value);
    }

    function getMealData() {
        fetch(
            `https://api.spoonacular.com/mealplanner/generate?apiKey=${APP_KEY}&timeFrame=day&targetCalories=${calories}`
            )
        .then((response) => response.json())
        .then((data) => {
            setMealData(data);
            console.log(data)
        })
        .catch(() => {
            console.log("error");
        });
    }

    return(
        <div className="DietPage">
            <section className="controls">
                <input
                type="number"
                placeholder="Calories (e.g. 2000)"
                onChange={handleChange}
                />
            </section>
            <button onClick={getMealData}>Get Daily Meal Plan</button>
            {mealData && <DietPlan mealData={mealData}/>}
        </div>
    )
}

export default DietPage;
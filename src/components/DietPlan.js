import React from 'react';
import DietMeal from './DietMeal';
import './DietPage.css';

const DietPlan = ({mealData}) => {

    const nutrients = mealData.nutrients;

    return(
        <main>
            <section className="nutrients">
                <h1>Nutrition Facts</h1>
                <ul>
                    <li>Calories: {nutrients.calories.toFixed(0)}</li>
                    <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)}</li>
                    <li>Fat: {nutrients.fat.toFixed(0)}</li>
                    <li>Protein: {nutrients.protein.toFixed(0)}</li>
                </ul>
           </section>
           <section className="meals">
               {mealData.meals.map(meal => {
                    return <DietMeal key={meal.id} meal={meal} />
                })}
           </section>
        </main>
    );
}

export default DietPlan;

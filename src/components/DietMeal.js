import React, { useState, useEffect } from 'react';

function Meal({meal}){
    const [imageUrl, setImageUrl] = useState("");

    const APP_KEY = 'b59c0d82ab16431794430b3a34a36070';

    useEffect(() => {
        fetch(
          `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${APP_KEY}&includeNutrition=false`
        )
          .then(response => response.json())
          .then(data => {
            setImageUrl(data.image)
          })
          .catch(() => {
            console.log("error")
          })
      }, [meal.id])

    return (
        <article>
            <h1>{meal.title}</h1>
            <img src={imageUrl} alt="recipe" />
            <ul>
                <li>Preparation time: {meal.readyInMinutes} minutes</li>
                <li>Number of servings: {meal.servings}</li>
            </ul>
            <a href={meal.sourceUrl} target="_blank" rel="noreferrer">Go to Recipe</a>
        </article>
    )
}

export default Meal;
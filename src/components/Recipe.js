import React from 'react';
// import {Link} from 'react-router-dom'

const Recipe = ({id,title,image,recipes,history}) => {

    const view_recipe = () => {
        let path = `/recipe/${id}`;
        history.push(path,recipes);
        console.log(history)
    }
    return(
            <article className="favRecipe"> 
            <h1>{title}</h1>
            <img src={image} alt=""/>
            <button onClick={view_recipe}>View Recipe</button>
            </article>
    );
}

export default Recipe;

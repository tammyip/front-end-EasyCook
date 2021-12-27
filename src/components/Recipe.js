import React from 'react';

const Recipe = ({id,title,image,recipes,history}) => {

    const view_recipe = () => {
        let path = `/recipe/${id}`;
        history.push(path,recipes);
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

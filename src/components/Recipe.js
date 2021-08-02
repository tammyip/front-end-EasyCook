import React from 'react';
import {Link} from 'react-router-dom'

const Recipe = ({id,title,image}) => {
    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt=""/>
            <Link to={`/recipe/${id}`}><h1>View Recipe</h1></Link>
            {/* <button className="recipe_buttons">
                <Link to={`/recipe/${title}`}>View Recipe </button> </Link> */}
        </div>
    );
}

export default Recipe;

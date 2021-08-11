import React from 'react';
import {Link, BrowserRouter} from 'react-router-dom'

const Favorites = ({id,title,image,deleteFromFavorites}) => {

    const deleteClick = ()  =>{
        deleteFromFavorites(id);
    }
    return(
        <div>
            <h1>{title}</h1>
            <img src={image} alt=""/>
            <BrowserRouter>
            <Link to={`/recipe/${id}`}><h1>View Recipe</h1></Link>
            </BrowserRouter>
            <button onClick={deleteClick}>DELETE</button>
        </div>
    );
}

export default Favorites;
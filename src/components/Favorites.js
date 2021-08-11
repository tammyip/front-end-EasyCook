import {Link, BrowserRouter} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = ({deleteFromFavorites,users}) => {

    const [favRecipes, setfavRecipes] = useState([]);
    const [errors, setErrors] = useState(null);

// Displaying all favorite recipes
    useEffect(() => {
        axios.get(`http://localhost:5000/user/${users[0].user_id}/favorites`)
          .then((response) => {
              console.log("All my saved recipes")
              console.log(response.data)
              setfavRecipes(response.data);
              console.log(favRecipes)
          })
          .catch(() => {
            setErrors("Fail to show saved recipes");
          });
      },[]);
    
    // const deleteClick = ()  =>{
    //     deleteFromFavorites(id);
    // }
    // return(
    //     <div>
    //         <p>"Hello"</p>
    //         <p>{recipes[0]["title"]}</p>
    //         <p>{recipes[0]["image"]}</p>
    //         <Link to={recipes[0]["url"]}><h1>View Recipe</h1></Link>
    //         {/* <button onClick={deleteClick}>DELETE</button> */}
    //     </div>
    // );
    if (favRecipes.length > 0){
        return(
            <div>
                <p>"Hello"</p>
                <p>{favRecipes[0]["title"]}</p>
                <p>{favRecipes[0]["image"]}</p>
                <Link to={favRecipes[0]["url"]}><h1>View Recipe</h1></Link>
                {/* <button onClick={deleteClick}>DELETE</button> */}
            </div>
        );
      } else {
          return "No saved recipe";
      }  
}

export default Favorites;
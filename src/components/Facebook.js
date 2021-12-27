import React, { useState, useCallback } from 'react';
import FacebookLoginWithButton from 'react-facebook-login';
import { useHistory } from "react-router-dom";

const Facebook = (props) => {

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
  
    const responseFacebook = (response) => {
      setData(response);
      if (response.accessToken) {
        setLogin(true);
        // Create a new user in database
        props.createNewUser(response);
        localStorage.setItem('logged in', 'True');
        const user_status = localStorage.getItem('logged in');
      } else {
        setLogin(false);
      }
    }

    const history = useHistory();

    const logout = () => {
        setLogin(false);
        setData({});
        localStorage.removeItem('logged in');
        history.push('/');
    }

    const componentClicked = () => {
        console.log('clicked')
    };

    return(

        <div className ="container" style={{ width: '500px' }}>
      
            { !login &&
            <FacebookLoginWithButton
                appId="573769120411678"
                autoLoad={true}
                fields="name,email"
                onClick={componentClicked}
                callback={responseFacebook}
                icon="fa-facebook"
    />
            }
       
          { login &&
              <div className="fb-login">
              <p className="fb-name">Hi, {data.name}!</p>
              <button onClick={logout} className="logout_btn"> Logout</button>
              </div>
          }
  
      </div>
    )
  }
  
  export default Facebook;
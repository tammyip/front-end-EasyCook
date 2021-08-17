import React, { useState, useCallback } from 'react';
// import { Card } from 'react-bootstrap';
// import FacebookLogin from 'react-facebook-login';
import FacebookLoginWithButton from 'react-facebook-login';
import { useHistory } from "react-router-dom";

const Facebook = (props) => {

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
  
    const responseFacebook = (response) => {
      console.log(response);
      setData(response);
      // setPicture(response.picture.data.url);
      if (response.accessToken) {
        setLogin(true);
        // Create a new user in database
        props.createNewUser(response);
        localStorage.setItem('logged in', 'True');
        const user_status = localStorage.getItem('logged in');
        console.log(user_status)
      } else {
        setLogin(false);
      }
    }

    const history = useHistory();

    const logout = () => {
        setLogin(false);
        setData({});
        localStorage.removeItem('logged in');
        // setPicture('');
        // window.location.assign("https://localhost:3000");
        history.push('/');
    }

    const componentClicked = () => {
        console.log('clicked')
        // console.log(data)
        // props.createNewCard(data);
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
            {/* { login &&
              <Image src={picture} roundedCircle />
            } */}
       
          { login &&
              <div className="fb-login">
              <p className="fb-name">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hi, {data.name}!</p>
              <button onClick={logout} className="logout_btn"> Logout</button>
              </div>
          }
  
      </div>
    )
  }
  
  export default Facebook;
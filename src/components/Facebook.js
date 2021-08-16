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
        // console.log("new user created")
      } else {
        setLogin(false);
      }
    }

    const history = useHistory();

    const logout = () => {
        setLogin(false);
        setData({});
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
              <div>
              <p>Hi, {data.name}!</p>
              <button onClick={logout} className="logout_btn"> Logout</button>
              </div>
          }
  
      </div>
    )
  }
  
  export default Facebook;
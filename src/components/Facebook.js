import React, { useState, useCallback } from 'react';
import { Card, Image } from 'react-bootstrap';
// import FacebookLogin from 'react-facebook-login';
import FacebookLoginWithButton from 'react-facebook-login';
import { useHistory } from "react-router-dom";

const Facebook = (props) => {

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');
  
    const responseFacebook = (response) => {
      console.log(response);
      setData(response);
      setPicture(response.picture.data.url);
      if (response.accessToken) {
        setLogin(true);
        // Create a new user in database
        props.createNewUser(response);
        console.log("new user created")
      } else {
        setLogin(false);
      }
    }

    // const history = useHistory();

    const logout = () => {
        setLogin(false);
        setData({});
        setPicture('');
        // window.location.assign("https://localhost:3000");
        // props.history.push('');
    }

    const componentClicked = () => {
        console.log('clicked')
        // console.log(data)
        // props.createNewCard(data);
    };

    return(
      <div>
        <Card className ="container" style={{ width: '600px' }}>
          <Card.Header>
            { !login &&
            //   <FacebookLogin
            //     appId="573769120411678"
            //     autoLoad={true}
            //     fields="name,email,picture"
            //     scope="public_profile,user_friends"
            //     onClick = {()=>console.log("clicked")}
            //     callback={responseFacebook}
            //     icon="fa-facebook"
            //     onFailure={console.error} />
            <FacebookLoginWithButton
                appId="573769120411678"
                autoLoad={true}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                icon="fa-facebook"
    />
            }
            {/* { login &&
              <Image src={picture} roundedCircle />
            } */}
          </Card.Header>
          { login &&
            <Card.Body>
              <Card.Title>Hi, {data.name}!</Card.Title>
              <button onClick={logout} className="logout_btn"> Logout</button>
            </Card.Body>
          }
        </Card>
      </div>
    )
  }
  
  export default Facebook;
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';

const Facebook = () => {

    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');
  
    const responseFacebook = (response) => {
      console.log(response);
      setData(response);
      setPicture(response.picture.data.url);
      if (response.accessToken) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    }

    const logout = () => {
        console.log("trigger logout")
        setLogin(false);
        setData({});
        setPicture('');
    }
  
    return(
      <div>
        <Card className ="container" style={{ width: '600px' }}>
          <Card.Header>
            { !login &&
              <FacebookLogin
                appId="573769120411678"
                autoLoad={true}
                fields="name,email,picture"
                scope="public_profile,user_friends"
                callback={responseFacebook}
                icon="fa-facebook" />
            }
            { login &&
              <Image src={picture} roundedCircle />
            }
          </Card.Header>
          { login &&
            <Card.Body>
              <Card.Title>Hi, {data.name}!</Card.Title>
              <button onClick={logout} className="logout_btn"> Logout</button>
              <Card.Text>
                {data.email}
              </Card.Text>
            </Card.Body>
          }
        </Card>
      </div>
    )
  }
  
  export default Facebook;
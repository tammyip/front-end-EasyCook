import SearchPage from './components/SearchPage';
import ItemDetail from './components/ItemDetail';
import DietPage from './components/DietPage';
// import Facebook from './components/Facebook';
// import Recipe from './components/Recipe';
import {Link} from 'react-router-dom'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { Card, Image } from 'react-bootstrap';
import React, { useState } from 'react';


const App = () => {

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



  return(
    <div>
      <Card style={{ width: '600px' }}>
        <Card.Header>
          { !login && 
            <FacebookLogin
              appId="562118384400275"
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
            <Card.Title>{data.name}</Card.Title>
            <Card.Text>
              {data.email}
            </Card.Text>
          </Card.Body>
        }
      </Card>
    {/* <Facebook/> */}
    <Router>
    <Link to={"/"}><h1>HomePage</h1></Link>
    <Link to={"/diet"}><h1>Diet Plan</h1></Link>
    <div className="App">
      <nav>
      <Switch>
        <Route path="/" exact component={SearchPage} />
        {/* <Route path="/recipe" component={Recipe} /> */}
        <Route path="/recipe/:id" component={ItemDetail}/>
        <Route path="/diet" exact component={DietPage} />
      </Switch>
      </nav>
    </div>
    </Router>
    </div>
  )
}

export default App;

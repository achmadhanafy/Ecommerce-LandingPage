import React, {useEffect} from "react";
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe('pk_test_51Jajm6ELeTbskFEg8zausInJHChrVWP0tcGHdpllF5YGKejh3zmTpVE6TPA5xZLpW4EHD9pBPMOJfYN1ADd3cX4y000fqqFI4w');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    //will only run when the app component loads..
    auth.onAuthStateChanged(authUser => {
      console.log('THe User is >>>',authUser);

      if (authUser ){
        //the user jus loggen in/ the use was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        // the use is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path="/orders">
            <Header/>
            <Orders/>
          </Route>
        <Route path="/login">
            <Login/>
          </Route>
        <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

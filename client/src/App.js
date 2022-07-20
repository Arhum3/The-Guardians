import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import empregister from "./components/auth/empregister";
import Login from "./components/auth/Login";
import emplogin from "./components/auth/emplogin";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import forgetPassword from "./components/auth/forgetPassword";
import ResetPassword from "./components/auth/ResetPassword";
import addEmployee from "./components/CrudOperations/addEmployee";
import SelfService from "./components/CrudOperations/SelfService";
import displayData from "./components/CrudOperations/displayData";
import displayEditInfo from "./components/CrudOperations/displayEditInfo";
import recruit from "./components/CrudOperations/recruit";
import initiateClearance from "./components/CrudOperations/initiateClearance";
import ResetPasswordEmp from "./components/auth/ResetPasswordEmp";
import "./App.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import finalizeClearance from "./components/CrudOperations/finalizeClearance";
import finalizeInventory from "./components/CrudOperations/finalizeInventory";
import accounts from "./components/CrudOperations/accounts";
import finalizeAccounts from "./components/CrudOperations/finalizeAccounts";
import inventory from "./components/CrudOperations/inventory";
import Resigned from "./components/auth/Resigned"
import leaveForm from "./components/CrudOperations/leaveForm"
import finalizeLeave from "./components/CrudOperations/finalizeLeave"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path= "/empregister" component= {empregister} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/emplogin" component= {emplogin} />
            <Route exact path="/forgetPassword" component={forgetPassword} />
            <Route exact path="/ResetPassword" component={ResetPassword} />
            <Route exact path ="/addEmployee" component={addEmployee} />
            <Route exact path ="/displayData" component={displayData} />
            <Route exact path ="/SelfService" component={SelfService} />
            <Route exact path ="/displayEditInfo/:_id" component= {displayEditInfo}/>
            <Route exact path ="/initiateClearance" component={initiateClearance}/>
            <Route exact path ="/ResetPasswordEmp" component={ResetPasswordEmp}/>
            <Route exact path ="/recruit" component={recruit}/>
            <Route exact path ="/finalizeClearance" component={finalizeClearance}/>
            <Route exact path ="/finalizeAccounts" component={finalizeAccounts}/>
            <Route exact path ="/accounts" component={accounts}/>
            <Route exact path ="/inventory" component={inventory}/>
            <Route exact path ="/finalizeInventory" component={finalizeInventory}/>
            <Route exact path ="/Resigned" component={Resigned}/>
            <Route exact path ="/leaveForm" component={leaveForm}/>
            <Route exact path ="/finalizeLeave" component={finalizeLeave}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

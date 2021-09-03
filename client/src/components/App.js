import React, { Component } from "react";
import { Navbar, Login, Signin, Home, Setting,Profile,Page404 } from "./";
import jwt_decode from "jwt-decode";
import { fetchAll } from "../actions/posts";
import { authenticateUser, logout } from "../actions/auth";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = (PrivateRouteProps) => {
  const { path, isLoggedIn, component: Component } = PrivateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchAll());
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (user.exp * 1000 < new Date().getTime()) this.props.dispatch(logout());
      else {
        console.log("answer", user);
        this.props.dispatch(
          authenticateUser({
            email: user.email,
            name: user.name,
            _id: user._id,
            selectedFile: user.selectedFile,
            friends: user.friends,
            friendRequest: user.friendRequest,
          })
        
        );
      }
    }
  }
  render() {
    const { auth } = this.props;
   
    return (
      <div className="root">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/setting" component={Setting} />
            <PrivateRoute
              path="/setting"
              component={Setting}
              isLoggedIn={auth.isLoggedIn}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signin} />
            <PrivateRoute
              path="/user/:userId"
              component={Profile}
              isLoggedIn={auth.isLoggedIn}
            />
            <Route component={Page404}/>
          </Switch>
        </Router>
      </div>
    );
  }
}
function mapstateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapstateToProps)(App);

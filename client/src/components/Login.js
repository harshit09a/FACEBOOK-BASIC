import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login, clearAuthState} from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      password: "",
      email: "",
    };
  }
  componentWillUnmount()
  {
    this.props.dispatch(clearAuthState());
  }
  handelSubmit = (e) => {
    //console.log(this.state);
    e.preventDefault();
    const { password, email } = this.state;
    if (password && email) this.props.dispatch(login(this.state));
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (isLoggedIn) {
      return <Redirect to={from} />; //equivalent to {{pathname:"/"}} or we can directly give to = "/"
    }

    return (
      <div className="row d-flex">
        <div className="col-md hide">
          <img
            src="images/connect.png"
            alt=""
            className="hide-input"
            style={{ marginTop: "30%", marginLeft: "10%" }}
            
          />
        </div>
        <div className="col hide-login" style={{marginLeft:"20%"}}>
          <h1 style={{ marginTop: "10%", marginLeft: "15%" }} className="hide-login">Login</h1>
          {error && (
            <div
              className="alert alert-primary"
              role="alert"
              style={{
                textAlign: "center",
                marginRight: "20%",
                padding:"1%",
                marginBottom: "0%",
              }}
            >
              {error}
            </div>
          )}
          <form style={{ marginRight: "10%" }}>
            <div className="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                style={{ width: "70%" }}
                value={this.state.email}
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                style={{ width: "70%" }}
                id="exampleInputPassword1"
                value={this.state.password}
                onChange={(e) => {
                  this.setState({ password: e.target.value });
                }}
                required
              />
            </div>

            {!inProgress && (
              <button className="btn btn-primary" onClick={this.handelSubmit}>
                Login
              </button>
            )}
            {inProgress && (
              <button
                className="btn btn-primary"
                onClick={this.handelSubmit}
                disabled={inProgress}
              >
                Loging in .....
              </button>
            )}
          </form>
        </div>
      </div>
    );
  }
}
function mapstateToPrps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapstateToPrps)(Login);

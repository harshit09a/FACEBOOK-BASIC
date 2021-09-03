import React, { Component } from "react";
import FileBase from "react-file-base64";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup ,clearAuthState} from "../actions/auth";

class Signin extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      selectedFile: "",
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handelSubmit = (e) => {
    //console.log(this.state);
    e.preventDefault();
    const { password, confirmPassword, email, name } = this.state;
    if (password && confirmPassword && name && email)
      this.props.dispatch(signup(this.state));
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    if (isLoggedIn) {
      return <Redirect to={from} />; //equivalent to {{pathname:"/"}} or we can directly give to = "/"
    }
    return (
      <div className="row d-flex">
        <div className="col hide">
          <img
            src="images/connect.png"
            alt=""
            className="hide-input"
            style={{ marginTop: "30%", marginLeft: "10%" }}
          />
        </div>
        <div className="col hide-signup">
          <h1 style={{ marginTop: "5%", marginLeft: "20%" }}>Sign up</h1>
          {error && (
            <div
              className="alert alert-primary"
              role="alert"
              style={{
                textAlign: "center",
                marginRight: "20%",
                
                padding: "1%",

                marginBottom: "0%",
              }}
            >
              {error}
            </div>
          )}
          <form style={{ marginRight: "10%" }}>
            <div className="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.name}
                style={{ width: "70%" }}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" for="selectFile">
                Select User DP
              </label>
              <br />
              <FileBase
                type="file"
                className="form-control"
                id="selectFile"
                multiple={false}
                onDone={({ base64 }) => this.setState({ selectedFile: base64 })}
              />
              <br />
              <label
                className="form-label"
                for="selectFile"
                style={{ marginLeft: "5%" }}
              >
                or
              </label>
              <br />

              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="past user DP url"
                aria-describedby="emailHelp"
                style={{ width: "70%" }}
                onChange={(e) => {
                  this.setState({ selectedFile: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
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
            <div className="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                style={{ width: "70%" }}
                id="exampleInputPassword1"
                value={this.state.confirmPassword}
                onChange={(e) => {
                  this.setState({ confirmPassword: e.target.value });
                }}
                required
              />
            </div>

            {!inProgress && (
              <button className="btn btn-primary" onClick={this.handelSubmit}>
                Signup
              </button>
            )}
            {inProgress && (
              <button
                className="btn btn-primary"
                onClick={this.handelSubmit}
                disabled={inProgress}
              >
                Siging up .....
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

export default connect(mapstateToPrps)(Signin);

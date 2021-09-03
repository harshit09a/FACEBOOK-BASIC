import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../actions/auth";
import { fetchUser } from "../actions/search";

import { FriendRequest } from "./";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_input: "",
    };
  }
  handelLogout = () => {
    this.props.dispatch(logout());
    return <Redirect to="/login" />;
  };
  handelSearch = (e) => {
    this.setState({ search_input: e.target.value });
    this.props.dispatch(fetchUser(e.target.value));
  };
  //navbar-dark bg-primary
  render() {
    const { isLoggedIn, user } = this.props.auth;
    const { results } = this.props;
    console.log(results + "search reult");
    return (
      <nav className="navbar navbar-expand-lg   root-navbar">
        <div className="container-fluid">
          <Link to="/">
            <img src="images/connect1.png" className="nav-hide" style={{display:"inline-block"}} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon">
              <i class="fas fa-sliders-h"></i>
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="d-flex"
              className="col-md-3  search-container nav-search"
              sm="3"
             
            >
              <img
                className="search-icon"
                src={"https://image.flaticon.com/icons/svg/483/483356.svg"}
                alt="search-icon"
              />
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
               
                onChange={this.handelSearch}
              />
              {results.length > 0 && this.state.search_input.length > 0 && (
                <div className="search-results">
                  <ul>
                    {results.map((result, i) => {
                      return (
                        <li className="search-results-row" key={i}>
                          <Link to={`/user/${result._id}`}>
                            <img
                              src={result.selectedFile}
                              onError={(e) => {
                                e.target.onError = null;
                                e.target.src =
                                  "https://image.flaticon.com/icons/svg/2154/2154651.svg";
                              }}
                              alt="user-dp"
                            />
                            <span>{result.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                   
                  </ul>
                </div>
              )}
            </form>
            <div className="col d-flex nav-action" sm="5" >
              {isLoggedIn && (
                <div className="user">
                  <Link to="/Setting">
                    <img
                      alt="User Image"
                      src={user.selectedFile}
                      id="user-dp"
                      onError={(e) => {
                        e.target.onError = null;
                        e.target.src =
                          "https://image.flaticon.com/icons/svg/2154/2154651.svg";
                      }}
                    />

                    <span className="navbar-text" style={{color:"black"}}>{user.name}</span>
                  </Link>
                </div>
              )}
              {isLoggedIn && (
                <div style={{ marginLeft: "10%" }}>
                  <FriendRequest />
                </div>
              )}
              <div
                className="nav-links"
                style={{ marginTop: "8px", marginLeft: "20%" }}
              >
                {!isLoggedIn && (
                  <Link to="/login">
                    <span
                      className="navbar-text "
                      style={{ marginRight: "10%" }}
                    >
                      Login
                    </span>
                  </Link>
                )}
                {!isLoggedIn && (
                  <Link to="signup">
                    <span
                      className="navbar-text "
                      style={{ marginRight: "10%" }}
                    >
                      Signup
                    </span>
                  </Link>
                )}
                {isLoggedIn && (
                  <div style={{ paddingTop: "18%" }}>
                    <span className="navbar-text" onClick={this.handelLogout}>
                      LogOut
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    results: state.search.results,
  };
}

export default connect(mapStateToProps)(Navbar);
////style={{ marginLeft: "10%" }}

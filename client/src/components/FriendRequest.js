import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";

class FriendRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handelOpen = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { auth } = this.props;
    return (
      <div>
        <div style={style.nav}>
          <div style={style.cartIconContainer}>
            <img
              style={style.CartIcon}
              src="images/friends.png"
              alt="cart"
              onClick={this.handelOpen}
            />
            <span style={style.cartCount} onClick={this.handelOpen}>
              {auth.user.friendRequest.length}
            </span>
            {this.state.open ? (
              <div style={{ position: "relative",right:"80px"}}>
                <div className="friendDropDownAction" style={{ width: "400%" }}>
                  <ul class="list-group" style={{ width: "120%" }}>
                    <li class="list-group-item"><h4>Friend Requests</h4></li>
                    {auth.user.friendRequest.length == 0 && <li class="list-group-item">No friend Request found</li>}
                    {auth.user.friendRequest.map((friend) => <li class="list-group-item">
                      <Link className="friends-item" to={`/user/${friend._id}`}>
                        <div style={{ display: "flex", marginTop: "2%", marginLeft: "8%" }} onClick={this.handelOpen}>

                        <div className="post-avatar">
                          <img
                            src={friend.selectedFile}
                            alt="user-pic"
                            onError={(e) => {
                              e.target.onError = null;
                              e.target.src =
                                "https://image.flaticon.com/icons/svg/2154/2154651.svg";
                            }}
                          />
                        </div>
                          <div className="friends-name" style={{ marginTop: "4%" }}>{friend.name}</div>

                      </div>
                      </Link>
                    </li>)}
                    
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
const style = {
  CartIcon: {
    height: 32,
    marginRight: 20,
  },
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: " 4px 8px",
    position: "absolute",
    right: 0,
    top: -9,
  },
  nav: {
    height: 70,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cartIconContainer: {
    position: "relative",
  },
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(FriendRequest);

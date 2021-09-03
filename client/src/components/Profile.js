import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions/profile";
import { FriendsList, PostFriend } from "./";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import {
  addFriend,
  unsendRequest,
  acceptRequest,
  unfriend,
} from "../actions/profile";

class Profile extends Component {
  // constructor(props)
  // {
  //     super(props);
  //     this.state={
  //         isfriend:false,
  //         accept_friend:false,
  //     }
  // }
  componentDidMount() {
    const { match } = this.props;

    if (match.params.userId) {
      console.log(match);
      this.props.dispatch(fetchUser(match.params.userId));
    }
  }
  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;

    const {
      match: { params: currentParams },
    } = this.props;

    if (
      prevParams &&
      currentParams &&
      prevParams.userId !== currentParams.userId
    ) {
      this.props.dispatch(fetchUser(currentParams.userId));
    }
  }
  is_friend = () => {
    let val = false;
    this.props.user.friends.forEach((friend) => {
      if (friend._id == this.props.match.params.userId) {
        // this.setState({ isfriend: true });
        val = true;
        return val;
      }
    });
    // this.setState({ isfriend: false });
    return val;
  };
  acceptfriend = () => {
    const id = this.props.match.params.userId;
    let val = false;

    this.props.user.friendRequest.forEach((friend) => {
      if (friend._id == id) {
        // this.setState({ accept_friend: true });
        val = true;
        return true;
      }
    });
    // this.setState({ accept_friend: false });
    return val;
  };
  requestPending = () => {
    if (!this.props.profile.inProgress) {
      let val = false;
      const id = this.props.user._id;
      console.log(this.props.profile);
      const friendRequest = this.props.profile.user.friendRequest;
      friendRequest.forEach((friend) => {
        if (id == friend._id) {
          val = true;
          return true;
        }
      });
      return val;
    }
  };
  addFriend = () => {
    this.props.dispatch(
      addFriend(this.props.match.params.userId, this.props.user._id)
    );
  };
  unsendRequest = () => {
    this.props.dispatch(
      unsendRequest(this.props.match.params.userId, this.props.user._id)
    );
  };
  acceptRequest = () => {
    this.props.dispatch(
      acceptRequest(this.props.match.params.userId, this.props.user._id)
    );
  };
  unfriend = () => {
    this.props.dispatch(
      unfriend(this.props.match.params.userId, this.props.user._id)
    );
  };
  render() {
    const { profile, user, posts } = this.props;
    if (this.props.match.params.userId == user._id) {
      return <Redirect to="/setting" />;
    }
    if (profile.inProgress) {
      return <h1>Loading.....</h1>;
    }

    const isfriend = this.is_friend();
    const accept_friend = this.acceptfriend();
    const request_Pending = this.requestPending();

    return (
      <div className="settings container">
        <div className="img-container" style={{ height: "200px" }}>
          <img
            alt="User Image"
            src={profile.user.selectedFile}
            id="user-dp"
            onError={(e) => {
              e.target.onError = null;
              e.target.src =
                "https://image.flaticon.com/icons/svg/2154/2154651.svg";
            }}
          />
        </div>
        <h2 style={{ textAlign: "center" }}>{profile.user.name}</h2>
        {accept_friend ? (
          // <h2 style={{ textAlign: "center" }} onClick={this.acceptRequest}>Accept Friend Request</h2>
          <h2 style={{ textAlign: "center" }} onClick={this.acceptRequest}>
            <button type="button" class="btn btn-primary">
              Accept Request
            </button>
          </h2>
        ) : request_Pending ? (
          // <h2 style={{ textAlign: "center" }} onClick={this.unsendRequest}>cancel sending Request</h2>
          <h2 style={{ textAlign: "center" }} onClick={this.unsendRequest}>
            <button type="button" class="btn btn-primary">
              Cancel Request
            </button>
          </h2>
        ) : isfriend ? (
          <h2 style={{ textAlign: "center" }} onClick={this.unfriend}>
            <button type="button" class="btn btn-primary">
              Remove Friend
            </button>
          </h2>
        ) : (
          <h2 style={{ textAlign: "center" }} onClick={this.addFriend}>
            <button type="button" class="btn btn-primary">
              Add Friend
            </button>
          </h2>
        )}
        <div className="row">
          <div className="col-4 hide-home">
            <FriendsList friends={this.props.profile.user.friends} />
          </div>
          <div className="col">
            {posts.map((post, index) => {
              if (post.creator == this.props.match.params.userId) {
                return (
                  <div className="col" key={index}>
                    <PostFriend post={post} />
                  </div>
                );
              } else return null;
            })}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    user: state.auth.user,
    posts: state.posts,
  };
}
export default connect(mapStateToProps)(Profile);

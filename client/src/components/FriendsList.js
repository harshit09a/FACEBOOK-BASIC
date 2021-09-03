import React,{Component} from "react";
import { FriendsListItem } from "./";
import {connect} from "react-redux";

export default class FriendsList extends Component{

    render()
    {
        const {friends}=this.props;
  return (
    <div className="friends-list post-background" style={{position:"sticky",top:"0"}}>
      <div className="header">Friends</div>

      {friends && friends.length === 0 && (
        <div className="no-friends">No friends found!</div>
      )}

      {friends &&
        friends.map((friend) => (
          <FriendsListItem friend={friend} key={friend._id} />
        ))}
    </div>
  );
    }
};
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

 connect(mapStateToProps)(FriendsList);

import React from "react";
import { Link } from "react-router-dom";

function FriendsListItem(props) {
  return (
    <div style={{ display: "flex",marginTop:"2%",marginLeft:"8%"}}>
      <Link className="friends-item" to={`/user/${props.friend._id}`}>
      <div className="friends-img">
        <img
          src={props.friend.selectedFile}
          alt="user-pic"
          onError={(e) => {
            e.target.onError = null;
            e.target.src =
              "https://image.flaticon.com/icons/svg/2154/2154651.svg";
          }}
        />
      </div>
      <div className="friends-name" style={{marginTop:"4%"}}>{props.friend.name}</div>
      </Link>
    </div>
  );
}

export default FriendsListItem;

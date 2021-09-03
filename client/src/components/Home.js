import React, { Component } from "react";
import { CreatePost, Post,FriendsList,Sidebar} from "./";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editId: null,
    };
  }
  setEditId = (_id) => {
    this.setState({ editId: _id });
  };
  render() {
    const { isLoggedIn } = this.props.auth;
    const { posts } = this.props;
    console.log(this.state.editId, "home");
    return (
      <>
        <div className="row " >
          <div className="col col-sm-0 col-md-3 hide-home"><Sidebar/></div>
          <div className="col  col-sm-12 col-md-6">
            {isLoggedIn && (
              <CreatePost
                editId={this.state.editId}
                setEditId={this.setEditId}
              />
            )}
            {posts.map((post) => (
              <div className="col" key={post.creator}>
                <Post post={post} setEditId={this.setEditId} />
              </div>
            ))}
          </div>
          <div className="col  hide col-md-3 hide-home" style={{marginTop:"5%"}}>
            {isLoggedIn&&<FriendsList friends={this.props.auth.user.friends}/>}
          </div>
        </div>
      </>
    );
  }
}
function mapstateToProps(state) {
  return {
    auth: state.auth,
    posts: state.posts,
  };
}
export default connect(mapstateToProps)(Home);

import React, { Component } from "react";
import { connect } from "react-redux";
import {deleteComment,likeComment}from "../actions/posts";
import {Link} from "react-router-dom";

class Comments extends Component {
  constructor(props) {
    super(props);
  }
  handleCommentLike = () => {this.props.dispatch(likeComment(this.props.postId,this.props.comment._id))};
  handeleteCommentDelete=()=>{this.props.dispatch(deleteComment(this.props.postId,this.props.comment._id));}
  render() {
    const { user, comment, isLoggedIn } = this.props;
    console.log(comment);
    let isCommentLikedByUser = comment.likes.includes(user._id);

    return (
      <div className="row">
        <div className="col-md-1">
          <Link className="friends-item" to={`user/${comment.author.id}`}>
          <div className="post-avatar">
            <img
              src={comment.author.userDp}
              onError={(e) => {
                e.target.onError = null;
                e.target.src =
                  "https://image.flaticon.com/icons/svg/2154/2154651.svg";
              }}
              alt="user-pic"
            />
            
            
          </div>
          </Link>
        </div>
       
        <div className=" col-sm-8 col-md-10" style={{ marginLeft: "2%" }}>
          <div className="post-comment-item post-background">
            <div className="post-comment-header">
              <Link className="friends-item" to={`user/${comment.author.id}`}>
              <span className="post-comment-author">
                {comment.author.username}
              </span>
              </Link>
            </div>
            

            <div className="post-comment-content">{comment.text}</div>
            <div className="post-comment-header post-background">
              <span
                onClick={this.handleCommentLike}
                className="post-comment-time"
              >
                {isCommentLikedByUser ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/1076/1076984.svg"
                    alt="like post"
                  />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                )}
              </span>

              <span className="post-comment-likes">
                | {comment.likes.length} likes
              </span>
              {isLoggedIn && user._id == comment.author.id && (
                <span
                  className="post-comment-likes  cursor"
                  onClick={this.handeleteCommentDelete}
                >
                  <i class="fas fa-trash-alt"></i> delete
                </span>
              )}
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return {
    user: auth.user,
    isLoggedIn: auth.isLoggedIn,
  };
}

export default connect(mapStateToProps)(Comments);

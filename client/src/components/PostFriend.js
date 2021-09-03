import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import {Comments } from "./";
import { likePost, addComment } from "../actions/posts";

class PostFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: "",
            hidden: false,
        }
    }
    handelLikeClick = () => {
        if (this.props.auth.isLoggedIn)
            this.props.dispatch(likePost(this.props.post._id));
    };
    handleAddComment = (e) => {
        if (this.props.auth.isLoggedIn) {
            if (e.key === "Enter") {
                this.setState({ comment: "" });
                this.props.dispatch(addComment(this.state, this.props.post._id));
            }
        }
    }
    render() {
        const {
            message,
            name,
            creator,
            selectedFile,
            userDp,
            createdAt,
            likes,
            _id,
            comments
        } = this.props.post;
        console.log(this.props.post);
        const { auth, setEditId } = this.props;
        let isPostLikedByUser = likes.includes(auth.user._id);

        return (
            <div className="post-wrapper post-background ">
                <div className="post-header">
                    <div className="post-avatar">
                        <Link to={`/user/${creator}`}>
                            <img
                                src={userDp}
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src =
                                        "https://image.flaticon.com/icons/svg/2154/2154651.svg";
                                }}
                                alt="user-pic"
                            />
                        </Link>

                        <div>
                            <Link to={`/user/${creator}`}>
                                <span className="post-author" style={{ textDecoration: "none" }}>{name}</span>
                            </Link>

                            <span className="post-time">{moment(createdAt).fromNow()}</span>

                        </div>
                        
                    </div>

                    <div className="post-content">{message}</div>
                    {selectedFile && (
                        <div style={{ marginTop: "10px" }}>
                            {" "}
                            <img
                                src={selectedFile}
                                onError={(e) => {
                                    e.target.style.visibility = "hidden";
                                }}
                                alt="content-img"
                                style={{ width: "100%", height: "400px" }}
                            />{" "}
                        </div>
                    )}

                    <div className="post-actions">
                        <button className="post-like no-btn" onClick={this.handelLikeClick}>
                            {isPostLikedByUser ? (
                                <i class="fas fa-thumbs-up" style={{ color: "blue" }}></i>
                            ) : (
                                    <i class=" far fa-thumbs-up" style={{ color: "blue" }}></i>
                                )}
                            <span>{likes.length}</span>
                        </button>

                        <div
                            className="post-comments-icon"
                            onClick={() => {
                                this.setState({ hidden: !this.state.hidden });
                            }}
                        >
                            <span style={{ marginRight: "3px" }}>Comment</span>
                            <img
                                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                                alt="comments-icon"
                            />
                            <span>{comments.length}</span>
                        </div>
                    </div>
                    {auth.isLoggedIn && this.state.hidden && (
                        <div className="post-comment-box">
                            <input
                                placeholder="Start typing a comment"
                                onChange={(e) => {
                                    this.setState({ comment: e.target.value });
                                }}
                                onKeyPress={this.handleAddComment}
                                value={this.state.comment}
                            />
                        </div>
                    )}

                    {this.state.hidden && (
                        <div className="post-comments-list">
                            {comments.map((comment) => (
                                <Comments comment={comment} key={comment._id} postId={_id} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps)(PostFriend);

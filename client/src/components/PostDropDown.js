import React, { Component } from "react";
import { deletePost } from "../actions/posts";
import { connect } from "react-redux";
class PostDropDown extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
    };
  }
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  handelDelete = () => {
    this.props.dispatch(deletePost(this.props.postId));
    this.setState({ showMenu: !this.state.showMenu });
  };
  render() {
    const { postId, setEditId } = this.props;
    return (
      <div className="postDropDownLength postDropDownLength-hide">
        <button
          onClick={() => this.setState({ showMenu: !this.state.showMenu })}
          className="postButton"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>

        {this.state.showMenu ? (
          <div style={{ position: "relative" }}>
            <div className="postDropDownAction">
              <ul class="list-group" style={{ width: "120%" }}>
                <li
                  class="list-group-item"
                  onClick={() => {
                    setEditId(postId);
                    this.scrollToTop();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <i class="fas fa-edit"></i>Edit
                </li>
                <li class="list-group-item" onClick={this.handelDelete}>
                  <i class="fas fa-trash-alt"></i>Delete
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(PostDropDown);

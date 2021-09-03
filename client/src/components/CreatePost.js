import React, { Component } from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import FileBase from "react-file-base64";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost,editPost } from "../actions/posts";
class CreatePost extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      modal: false,
      name: "",

      selectedFile: "",
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.editId !== this.props.editId&&this.props.editId!=null) {
      const post = this.props.posts.filter(
        (post) => post._id === this.props.editId
      );
      console.log(post);
      this.setState({
        message: post[0].message,
        selectedFile:post[0].selectedFile,
        modal: true,
      });
    }
  }
  handelSubmit = async (e) => {
    e.preventDefault();
    //console.log(this.props.auth.user);
    await this.setState({
      name: this.props.auth.user.name,
    });
    //console.log(this.state);
    if(this.props.editId==null)
    {
    this.props.dispatch(createPost(this.state));
    }
    else
    {
      this.props.dispatch(editPost(this.state,this.props.editId));
      this.props.setEditId(null);

    }
    this.setState({ message: "", selectedFile: "", modal: !this.state.modal});
  };
  toggleModal = () => {
    this.setState({ modal: !this.state.modal, message: "", selectedFile: ""});
    this.props.setEditId(null);

    console.log(this.state.modal);
  };
  render() {
    let { modal, message, selectedFile } = this.state;
    const { user } = this.props.auth;
    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }

    return (
      <>
        <button onClick={this.toggleModal} className="btn-modal">
          <div className="user d-flex">
            <Link to="/Setting">
              <img
                alt="User Image"
                src={user.selectedFile}
                id="user-dp"
                style={{
                  height: "40px",
                  borderRadius: "50%",
                  position: "relative",
                  right: "5px",
                }}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src =
                    "https://image.flaticon.com/icons/svg/2154/2154651.svg";
                }}
              />
            </Link>
            {/* <fieldset   >
              <input
                className="form-control form-control-plaintext text-white-50 form-rounded"
                style={{
                 
                 
                  textAlign:"center",
                  marginLeft: "4%",
                }}
                placeholder="Create Post"
              />
            </fieldset> */}
            <div
              style={{ paddingTop: "1%" }}
              className="button-handel text-muted"
            >
              What's on your mind? {user.name}
            </div>
          </div>
        </button>

        {modal && (
          <div className="moda">
            <div onClick={this.toggleModal} className="overlay"></div>
            <div className="modal-content">
              <h2>{this.props.editId==null?"Create Post":"Edit Post"}</h2>
              <hr />
              <div>
                <img
                  alt="User Image"
                  src={user.selectedFile}
                  id="user-dp"
                  style={{
                    height: "40px",
                    borderRadius: "50%",
                    position: "relative",
                    right: "5px",
                  }}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src =
                      "https://image.flaticon.com/icons/svg/2154/2154651.svg";
                  }}
                />
                <span className="fw-bold">{user.name}</span>
              </div>
              <form class="row g-3">
                <div
                  class="input-group"
                  style={{ marginTop: "4%", marginBottom: "4%" }}
                >
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    rows="4"
                    cols="50"
                    placeholder={`What's on your mind? ${user.name}`}
                    value={message}
                    onChange={(e) => {
                      this.setState({ message: e.target.value });
                    }}
                  ></textarea>
                  <div class="col-12 border mt-1">
                    <label for="inputEmail4" class="form-label text-muted">
                      Upload Image
                    </label>

                    <div className="row">
                      <div className="col col-4">
                        <FileBase
                          type="file"
                          className="form-control"
                          id="selectFile"
                          multiple={false}
                          onDone={({ base64 }) =>
                            this.setState({ selectedFile: base64 })
                          }
                        />
                      </div>
                      <div className="col-2" style={{ textAlign: "center" }}>
                        or
                      </div>
                      <div class="col-6">
                        <input
                          type="text"
                          class="form-control"
                          id="inputEmail4"
                          placeholder="past url"
                          value={selectedFile}
                          onChange={(e) => {
                            this.setState({ selectedFile: e.target.value });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <button
                      style={{ width: "100%", marginTop: "2%" }}
                      class="btn btn-primary"
                      onClick={this.handelSubmit}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>

              <button className="close-modal" onClick={this.toggleModal}>
                <CloseRoundedIcon />
                {/* <i
                  style={{ boxShadow: "none", color: "gray" }}
                  className="fas fa-times"
                ></i> */}
              </button>
            </div>
          </div>
        )}
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
export default connect(mapstateToProps)(CreatePost);

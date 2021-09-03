import React, { Component } from "react";
import { connect } from "react-redux";
import { clearAuthState, editUser } from "../actions/auth";
import FileBase from "react-file-base64";
import { Redirect } from "react-router-dom";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.auth.user.name,
      password: "",
      confirmPassword: "",
      editMode: false,
      selectedFile: "",
    };
  }
  handelChange = (fieldName, val) => {
    this.setState({ [fieldName]: val });
  };
  handelSave = () => {
    const { password, confirmPassword, name, selectedFile } = this.state;

    const select = selectedFile || this.props.auth.user.selectedFile;
    const _id = this.props.auth.user._id;
    this.props.dispatch(
      editUser({ name, password, confirmPassword, _id, selectedFile: select })
    );
    this.setState({ editMode: false });
  };
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  render() {
    const { editMode } = this.state;

    const { user, error, isLoggedIn } = this.props.auth;

    if (!isLoggedIn) return <Redirect to="/login" />;
    return (
      <div className="settings container">
        <div className="img-container" style={{ height: "200px" }}>
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
        </div>
        <h2 style={{ textAlign: "center" }}>{user.name}</h2>

        {error && (
          <div
            className="alert alert-danger"
            style={{
              padding: "0",
              width: "50%",
              textAlign: "center",
              marginTop: "2%",
              marginLeft: "25%",
            }}
          >
            {error}
          </div>
        )}
        {error === false && (
          <div
            className="alert alert-success"
            style={{
              padding: "0",
              width: "50%",
              textAlign: "center",
              marginTop: "2%",
              marginLeft: "25%",
            }}
          >
            Successful updated profile
          </div>
        )}

        {/* <form> */}
        <fieldset disabled>
          <div className="mb-3 form-group row">
            <label className="text-secondary col-sm-2 col-form-label">
              Email:
            </label>
            <div class="col-sm-10">
              <input
                className="form-control form-control-plaintext"
                style={{
                  border: "none",
                  width: "50%",
                  paddingTop: "0",
                  marginLeft: "1%",
                }}
                value={user.email}
              />
            </div>
          </div>
        </fieldset>
        <div className="mb-3 form-group row">
          <label className="text-secondary col-sm-2 col-form-label">
            Name:
          </label>
          <div class="col-sm-10">
           
              <fieldset disabled>
                <input
                  className="form-control form-control-plaintext"
                  style={{
                    border: "none",
                    width: "50%",
                    paddingTop: "0",
                    marginLeft: "1%",
                  }}
                  value={user.name}
                />
              </fieldset>
           
          </div>
        </div>
        {editMode && (
          <div className="mb-3 form-group row">
            <label className="text-secondary col-sm-2 col-form-label">
              New password:
            </label>

            <div class="col-sm-10">
              <input
                type="password"
                className="form-control form-control"
                style={{ width: "50%", paddingTop: "0", marginLeft: "1%" }}
                onChange={(e) => {
                  this.handelChange("password", e.target.value);
                }}
                value={this.state.password}
              />
            </div>
          </div>
        )}
        {editMode && (
          <div className="mb-3 form-group row">
            <label className="text-secondary col-sm-2 col-form-label">
              Confirm password
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                className="form-control form-control"
                style={{ width: "50%", paddingTop: "0", marginLeft: "1%" }}
                onChange={(e) => {
                  this.handelChange("confirmPassword", e.target.value);
                }}
                value={this.state.confirmPassword}
              />
            </div>
          </div>
        )}
        {editMode && (
          <div className="mb-3 form-group row">
            <label className="text-secondary col-sm-2 col-form-label">
              {" "}
              Select User DP
            </label>
            <div class="col-sm-10">
              <FileBase
                type="file"
                className="form-control"
                id="selectFile"
                multiple={false}
                onDone={({ base64 }) => this.setState({ selectedFile: base64 })}
              />
              <fieldset disabled>
                <input
                  className="form-control form-control-plaintext"
                  style={{
                    border: "none",
                    width: "5%",
                    paddingTop: "0",
                    marginLeft: "1%",
                    marginTop: "1%",
                    marginBottom: "1%",
                  }}
                  value="OR"
                />
              </fieldset>
              <input
                type="text"
                className="form-control form-control"
                style={{ width: "50%", paddingTop: "0", marginLeft: "1%" }}
                onChange={(e) => {
                  this.handelChange("selectedFile", e.target.value);
                }}
                placeholder="PASTE URL OF DP"
              />
            </div>
          </div>
        )}
        <div style={{ margin: "1%" }}>
          {editMode ? (
            <button
              className="btn btn-primary"
              style={{ border: "0%" }}
              onClick={this.handelSave}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => {
                this.handelChange("editMode", true);
              }}
            >
              Edit Proile
            </button>
          )}
          {editMode && (
            <button
              className="btn btn-outline-secondary"
              style={{ marginLeft: "1%" }}
              onClick={() => {
                this.handelChange("editMode", false);
              }}
            >
              go Back
            </button>
          )}
        </div>
        {/* </form> */}
      </div>
    );
  }
}
function mapPropsToState({ auth }) {
  return {
    auth,
  };
}
export default connect(mapPropsToState)(Setting);

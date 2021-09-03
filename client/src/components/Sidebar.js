import React, { Component } from "react";

export default class Sidebar extends Component {
  render() {
    return (
      <div
        style={{
          height: "100vh",
          position: "sticky",
          top: "0",
        }}
      >
        <div className="sidebar-list post-background">
          <div style={{ display: "flex", marginTop: "2%", marginLeft: "8%" }}>
            <ul style={{ padding: "0px" }}>
              <li className="sidebar-item">
                <p>
                  <i
                    class="far fa-address-book"
                    style={{ color: "#42ada4" }}
                  ></i>{" "}
                  contact
                </p>
              </li>
              <li className="sidebar-item">
                <p>
                  <i class="fas fa-users" style={{ color: "#a22ba6" }}></i>{" "}
                  Groups
                </p>
              </li>
              <li className="sidebar-item">
                <p>
                  <i class="fas fa-hotel" style={{ color: "#a63b2b" }}></i>{" "}
                  MarketPlace
                </p>
              </li>{" "}
              <li className="sidebar-item">
                <p>
                  <i class="fab fa-youtube" style={{ color: "#a62b2b" }}></i>{" "}
                  Watch
                </p>
              </li>{" "}
              <li className="sidebar-item">
                <p>
                  <i class="far fa-clock" style={{ color: "#2b93a6" }}></i>{" "}
                  Memories
                </p>
              </li>{" "}
              <li className="sidebar-item">
                <p>
                  <i class="fas fa-bookmark" style={{ color: "#596466" }}></i>{" "}
                  Saved
                </p>
              </li>{" "}
              <li className="sidebar-item">
                <p>
                  <i class="fas fa-images" style={{ color: "#665964" }}></i>{" "}
                  Pages
                </p>
              </li>{" "}
              <li className="sidebar-item">
                <p>
                  <i
                    class="fas fa-calendar-alt"
                    style={{ color: "#355394" }}
                  ></i>{" "}
                  Events
                </p>
              </li>{" "}
              <li className="sidebar-item">
                <p>
                  <i class="fas fa-gamepad" style={{ color: "#35943a" }}></i>{" "}
                  Jobs
                </p>
              </li>{" "}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

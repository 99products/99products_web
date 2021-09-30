import React from "react";
import "./style.css";
import {MDBBtn, MDBIcon} from "mdb-react-ui-kit";

export default function Banner(props) {
  return (
    <div className="banner">
      <div className="logo_container">
        <img src={`./assets/logo.jpeg`} className="img-fluid logo" />
        <h1 className="logo-text">99 Products</h1>
      </div>
      <div className="info_container">
        <span className="title">A Decentralized Autonomous Organization</span>
        <span className="sub_title">
          Feel free to add an app in progress and update it when it goes live
        </span>
          <MDBBtn
            className="share_idea-btn"
            target="_blank"
            onClick={props.onClick}
          >
            <MDBIcon fas icon="box-open" size={"lg"} />
            <span className="submit_idea_label">Unleash Your Idea</span>
          </MDBBtn>
      </div>
    </div>
  );
}

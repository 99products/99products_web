import React, {Component} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader
} from "mdbreact";

const Modal = (props) => {
  return (
    <MDBContainer>
      <MDBModal
        isOpen={props.isOpen}
        toggle={props.closeModal}
        centered={true}
        overflowScroll={false}
      >
        <MDBModalHeader toggle={props.closeModal}>
          {props.ideaObj?.title}
        </MDBModalHeader>
        <MDBModalBody>
          <div>{props.ideaObj?.description}</div>
        </MDBModalBody>
      </MDBModal>
    </MDBContainer>
  );
};

export default Modal;

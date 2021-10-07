import React, {Component} from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const Modal = (props) => {
  return (
    <MDBContainer>
      <MDBModal isOpen={props.isOpen} toggle={props.closeModal} centered={true} overflowScroll={false}>
        <MDBModalHeader toggle={props.closeModal}>
          {props.ideaObj?.Title}
        </MDBModalHeader>
        <MDBModalBody>
          <div>{props.ideaObj?.Description}</div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={props.closeModal}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Edit</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
  );
};

export default Modal;

import React, {useState} from "react";
import "./style.css";
import FormInput from "../Components/FormInput";
import {formInputIds, componentDetails} from "./formComponentDetails";
import {MDBBtn} from "mdbreact";
import firebaseHelper from "../Utils/firebaseHelper";
import {useAlert} from "react-alert";

const Form = () => {
  const [showError, setErrorStatus] = useState(false);
  const alert = useAlert();
  const formResultsHolder = {};

  const validateFormData = () => {
    return Object.keys(formResultsHolder).some(
      (key) => formResultsHolder[key].length === 0
    );
  };

  const onSubmit = () => {
    const showError = validateFormData();
    setErrorStatus(showError);

    if (!showError) {
      const result = firebaseHelper.insertDataToFirebase(formResultsHolder);
      result && alert.success("Your idea details are submitted successfully!!");
    }
  };
  const clearForm = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eeeaf7",
      }}
    >
      <div className="instruction-container">
        <h2>Ideas</h2>
        <p>
          Whats your idea.
          <br />
          <br />
          Please note:
          <br />
          1. Make sure you did one basic validation if idea already exists
          <br />
          2. At 99products, we target only small to medium ideas which can be
          completed max in 6 months. so any big ideas, or which involves more
          operational work than tech is not encouraged
        </p>
      </div>
      {formInputIds.map((formInputId, index) => {
        const detailsObj = componentDetails[formInputId];
        return (
          <FormInput
            key={index}
            id={formInputId}
            title={detailsObj.title}
            type={detailsObj.type}
            hintText={detailsObj.hintText}
            options={detailsObj?.options || undefined}
            resultsHolder={formResultsHolder}
          />
        );
      })}
      <div style={{display: showError ? "flex" : "none", width: "600px"}}>
        <span style={{color: "red"}}>
          * Please do fill all the fields to proceed.
        </span>
      </div>
      <div className="footer">
        <MDBBtn color="primary" onClick={onSubmit}>
          Submit
        </MDBBtn>
      </div>
    </div>
  );
};

export default Form;

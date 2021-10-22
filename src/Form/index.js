import React, {useState, useRef} from "react";
import {useLocation} from "react-router";
import "./style.css";
import FormInput from "../Components/FormInput";
import {formInputIds, componentDetails} from "../Utils/formComponentDetails";
import {MDBBtn} from "mdbreact";
import firebaseHelper from "../Utils/firebaseHelper";
import {useAlert} from "react-alert";

const Form = (props) => {
  const [showError, setErrorStatus] = useState(false);
  const alert = useAlert();
  const location = useLocation();

  let formResultsHolder = useRef(location.state?.ideaObj || {});

  const validateFormData = () => {
    const formData = formResultsHolder.current;
    for (const key in formData) {
      if (componentDetails[key]?.isMandatory && formData[key].length === 0) {
        return false;
      }
    }
    return true;
  };

  const onSubmit = () => {
    const isValid = validateFormData();
    setErrorStatus(!isValid);
    if (isValid) {
      const formData = formResultsHolder.current;
      const isNewRecord = formData?.id ? formData?.id.length === 0 : true;
      const result = isNewRecord
        ? firebaseHelper.insertDataToFirebase(formData)
        : firebaseHelper.updateDataToFirebase(formData);
      result &&
        alert.success(
          `Your idea details are ${
            isNewRecord ? "submitted" : "updated"
          } successfully!!`
        );
    }
  };

  const homeBtnClick = () => {
    props.history.push("/");
  }

  const clearForm = () => {};

  return (
    <div className="form-content-holder" style={{overflow: "auto"}}>
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
            displayLabels={detailsObj?.displayLabels || undefined}
            options={detailsObj?.options || undefined}
            isMandatory={detailsObj.isMandatory}
            resultsHolder={formResultsHolder.current}
          />
        );
      })}
      {showError && (
        <div style={{width: "600px"}}>
          <span style={{color: "red"}}>
            * Please do fill all the fields to proceed.
          </span>
        </div>
      )}
      <div className="footer">
        <MDBBtn color="primary" onClick={homeBtnClick}>
          Home
        </MDBBtn>
        <MDBBtn color="primary" onClick={onSubmit}>
          Submit
        </MDBBtn>
      </div>
    </div>
  );
};

export default Form;

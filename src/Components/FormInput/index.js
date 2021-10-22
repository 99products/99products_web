import "./style.css";
import {MDBInput} from "mdbreact";
import RadioButton from "../RadioButton";
import "mdbreact/dist/css/mdb.css";

const FormInput = (props) => {
  const getSecondaryComp = (type, hintText) => {
    props.resultsHolder[props.id] =
      props.resultsHolder[props.id] || (type !== 3 ? "" : props.options[0]);
    switch (type) {
      case 1:
        return (
          <MDBInput
            id={props.id}
            valueDefault={props.resultsHolder[props.id]}
            hint={hintText}
            onBlur={(e) => onBlur(e)}
          />
        );
      case 2:
        return (
          <MDBInput
            id={props.id}
            valueDefault={props.resultsHolder[props.id]}
            type="textarea"
            hint={hintText}
            onBlur={(e) => onBlur(e)}
          />
        );
      case 3:
        return (
          <RadioButton
            id={props.id}
            defaultIndex={props.options.indexOf(props.resultsHolder[props.id])}
            displayLabels={props.displayLabels}
            options={props.options}
            onSelectionChange={onSelectionChange}
          />
        );
    }
  };

  const onBlur = (e) => {
    const {id, value} = e.target;
    props.resultsHolder[id] = value;
  };

  const onSelectionChange = (value, id) => {
    props.resultsHolder[id] = value;
  };

  return (
    <div className="form-container">
      <span>
        {props.title}
        <span style={{color: "red"}}>{props.isMandatory ? " *" : ""}</span>
      </span>
      {getSecondaryComp(props.type, props.hintText)}
    </div>
  );
};

export default FormInput;

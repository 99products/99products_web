import "./style.css";
import {MDBInput} from "mdbreact";
import RadioButton from "../RadioButton";
import "mdbreact/dist/css/mdb.css";

const FormInput = (props) => {
  const getSecondaryComp = (type, hintText) => {
    switch (type) {
      case 1:
        props.resultsHolder[props.id] = "";
        return (
          <MDBInput id={props.id} hint={hintText} onBlur={(e) => onBlur(e)} />
        );
      case 2:
        props.resultsHolder[props.id] = "";
        return (
          <MDBInput
            id={props.id}
            type="textarea"
            hint={hintText}
            onBlur={(e) => onBlur(e)}
          />
        );
      case 3:
        props.resultsHolder[props.id] = props.options[0];
        return (
          <RadioButton
            id={props.id}
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
      <span>{props.title}</span>
      {getSecondaryComp(props.type, props.hintText)}
    </div>
  );
};

export default FormInput;

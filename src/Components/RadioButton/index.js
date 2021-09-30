import React, {useEffect, useState} from "react";
import "mdbreact/dist/css/mdb.css";
import "./style.css";

const RadioButton = (props) => {
  const [radio, setRadio] = useState(0);
  const {options, onSelectionChange} = props;

  const onChange = (index) => {
    setRadio(index);
    onSelectionChange(options[index],props.id);
  };

  const createRadioButton = (index, text) => {
    return (
      <div key={props.id + index} style={{display: "flex", alignItems: "center"}}>
        <input
          style={{margin: 10}}
          type="radio"
          checked={radio === index ? true : false}
          id={props.id + index}
          value={text}
          onChange={() => onChange(index)}
        />
        <label htmlFor={props.id + index}>{text}</label>
      </div>
    );
  };

  return (
    <div className="radio-button-group">
      {options &&
        options.map((option, index) => {
          return createRadioButton(index, option);
        })}
    </div>
  );
};

export default RadioButton;

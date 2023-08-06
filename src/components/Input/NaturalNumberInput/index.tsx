import React from "react";
import StyledInput from "../StyledInput";

const NaturalNumberInput = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (props.onChange) {
      if (newValue.match("^[0-9]*$")) {
        props.onChange(e);
      }
    }
  };

  return <StyledInput {...props} onChange={onChange} />;
};

export default NaturalNumberInput;

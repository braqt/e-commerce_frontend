import React from "react";

import styles from "./index.module.css";

const StyledInput = ({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={styles.input} {...props} />;
};

export default StyledInput;

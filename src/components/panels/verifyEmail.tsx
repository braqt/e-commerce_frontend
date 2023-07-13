import React from "react";

interface Props {
  email: string;
  onClickButton: () => void;
}

const VerifyEmailPanel = ({ email, onClickButton }: Props) => {
  return (
    <div>
      <div>Verify Email</div>
      <b>{email}</b>
      <button onClick={onClickButton}>Resend Email</button>
    </div>
  );
};

export default VerifyEmailPanel;

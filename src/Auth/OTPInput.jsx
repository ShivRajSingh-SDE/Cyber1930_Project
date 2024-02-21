import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Login.css";

const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;

    // Ensure input is a number
    if (/[^0-9]/.test(value)) {
      return;
    }

    setOtp(value);
    onChange(value);
  };

  return (
    <div className=" ">
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={length}
        value={otp}
        onChange={handleChange}
        className=" w-[full] rounded-2xl drop-shadow-2xl shadow-2xl bg-[#00fff246] p-2"
      />
    </div>
  );
};

OTPInput.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OTPInput;

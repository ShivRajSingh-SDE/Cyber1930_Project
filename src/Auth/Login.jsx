import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSubmitted, setOtpSubmitted] = useState(false);

  const handleGetOTP = async () => {
    try {
      if (!otpSubmitted) {
        const generatedOTP = generateOTP();
        setOtp(generatedOTP);

        // Use the existing generate-otp endpoint to save OTP on the server
        const response = await axios.post(
          "http://localhost:5000/generate-otp",
          {
            email,
            otp: generatedOTP,
          }
        );

        console.log("Response from /generate-otp:", response.data);

        if (response.data === "OTP sent successfully") {
          setOtpSubmitted(true);
          setAlertMessage("OTP sent successfully!");
          handleShowAlert();
        } else {
          setAlertMessage("User not found! Try Register");
          handleShowAlert();
        }
      }
    } catch (error) {
      setAlertMessage("An error occurred");
      handleShowAlert();
      console.error("Error in handleGetOTP:", error);
    }
  };

  useEffect(() => {
    // Clear the alert after 3000ms
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showAlert]);

  useEffect(() => {
    if (alertMessage) {
      handleShowAlert();
    }
  }, [alertMessage]);

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
        otp,
      });

      console.log("Response from server:", response.data);

      if (response.data === "exist") {
        localStorage.setItem("userEmail", email);
        setAlertMessage("Logged in successfully!");

        navigate("/");
        window.location.reload();
      } else if (response.data === "not exist") {
        setAlertMessage("User not found or incorrect password");
        setShowAlert(true);
        handleShowAlert(true);
        navigate("/register");
      } else if (response.data.trim() === "invalid OTP") {
        setAlertMessage("Incorrect OTP. Please try again.");
        setShowAlert(true);
        handleShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Wrong details");
      console.error(error);
    }
  }

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  const handleForgotPassword = () => {
    navigate("/forgot");
  };

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  return (
    <div className="md:p-10 p-1  flex-col justify-center items-center flex  drop-shadow-2xl shadow-2xl shadow-black">
      <div className="login-container bg-[#86e5dee4] justify-center items-center flex flex-col p-5">
        <p className="login-title my-10 text-[30px]">Log In</p>
        <form onSubmit={submit}>
          <div className="form-group flex flex-col">
            <label htmlFor="LoggingEmailAddress">Email Address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              id="LoggingEmailAddress"
              className="login-input"
              type="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="loggingPassword">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              id="loggingPassword"
              className="login-input"
              type="password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="otp">OTP</label>
            <div className=" flex  flex-row justify-between items-center ">
              <input
                onChange={(e) => setOtp(e.target.value)}
                placeholder="OTP"
                id="otp"
                className="login-input "
                type="text"
              />
              <button
                type="button"
                className=" bg-[#00eeff52]   rounded-2xl m-1 drop-shadow-2xl shadow-2xl"
                onClick={handleGetOTP}
              >
                Get OTP
              </button>
            </div>
          </div>

          <div className="submit-button">
            <button type="submit" className="login-button">
              Submit
            </button>
          </div>
        </form>
        <div className="login-links ">
          <Link to="/register" className="login-link mr-10">
            or sign up
          </Link>

          <div
            onClick={handleForgotPassword}
            className="login-link cursor-pointer"
          >
            Forgot Password
          </div>
        </div>
      </div>

      {showAlert && <Alert message={alertMessage} onClose={handleCloseAlert} />}
    </div>
  );
};

export default Login;

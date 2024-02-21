import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert/Alert";

const Reg = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Clear the alert after 3000ms
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Clear the timeout on component unmount or if the alert is closed
    return () => clearTimeout(timeout);
  }, [showAlert]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        email,
        password,
        name,
      });

      if (response.data === "exist") {
        setAlertMessage("User Already exists");
        setShowAlert(true);
      } else if (response.data === "not exist") {
        localStorage.setItem("userEmail", email);
        navigate("/");
        window.location.reload();
        setAlertMessage("Registrations Done");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Wrong Details");
      setShowAlert(true);
      console.error(error);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate("/");
  };

  return (
    <div className="p-10">
      <div className="login-container bg-[#86e5dee4] justify-center items-center flex flex-col p-5">
        <p className="login-title my-10 text-[30px]">SignUp</p>
        <form onSubmit={submit} className=" w-[100%]">
          <div
            className="reg-form-group flex flex-col p-4
        "
          >
            <label htmlFor="RegEmailAddress">Email Address</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              id="RegEmailAddress"
              type="email"
              className="p-2"
            />
          </div>

          <div
            className="reg-form-group flex flex-col p-4
        "
          >
            <label htmlFor="regPassword">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              id="regPassword"
              type="password"
              className="p-2"
            />
          </div>

          <div
            className="reg-form-group flex flex-col p-4
        "
          >
            <label htmlFor="regName">Name</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              id="regName"
              className="p-2"
              type="text"
            />
          </div>

          <div
            className="reg-form-group flex flex-col p-4
        "
          >
            <button type="submit w-[80%]">Submit</button>
          </div>
        </form>
        <div className="reg-links">
          <Link className="text" to="/login">
            or Already have Account? <span className="text-[blue]">Login</span>
          </Link>
        </div>
      </div>
      {showAlert && <Alert message={alertMessage} onClose={handleCloseAlert} />}
    </div>
  );
};

export default Reg;

import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

import {
  AiOutlineSlackSquare,
  AiOutlineSlack,
  AiOutlineMenuUnfold,
  AiOutlineMenu,
  AiFillMail,
  AiFillPhone,
} from "react-icons/ai";

import img3 from "../assets/pic1.jpg";
import img2 from "../assets/pic2.jpg";
import img4 from "../assets/pic3.png";
import img1 from "../assets/pic4.png";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdmin2, setIsAdmin2] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const handleLogin = () => {
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      localStorage.removeItem("userEmail");
      alert("Logged out successfully!");
      window.location.reload();
    } else {
      navigate("/login");
      window.location.reload();
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);

    if (userEmail) {
      fetch(`http://localhost:5000/users/${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data && data.roleadmin === "police") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);

    if (userEmail) {
      fetch(`http://localhost:5000/users/${userEmail}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data && data.roleadmin === "banker") {
            setIsAdmin2(true);
          } else {
            setIsAdmin2(false);
          }
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  // useEffect(() => {
  //   const userEmail = localStorage.getItem("userEmail");
  //   fetch(`http://localhost:5000/users/${userEmail}`)
  //     .then((response) => response.json())

  //     .catch((error) => console.error("Error fetching user data:", error));
  // }, []);

  return (
    <div className=" ">
      <div
        className="header-container 
      mx-auto p-3 bg-[#ffffff18] rounded-b-2xl    sticky z-50 top-0 flex justify-between items-center duration-300  rounded-br-3xl rounded-bl-3xl"
      >
        {toggle ? (
          <AiOutlineSlackSquare
            onClick={toggleMenu}
            className="md:hidden block text-[50px] text-[#000000]"
          />
        ) : (
          <AiOutlineSlack
            onClick={toggleMenu}
            className="md:hidden block text-[50px] text-[#000000]"
          />
        )}

        <div className="hidden md:flex   text-[white] justify-center items-center flex-row gap-2 text-[16px] font-bold">
          <img
            className=" h-[40px] rounded-2xl drop-shadow-xl shadow-2xl "
            src="https://image.lexica.art/full_webp/34d33fda-58af-4d36-8bba-c4e7c9203f56"
          ></img>
          <h1 className=" text-2xl text-[white] font-serif">Cyber Aid Line</h1>
        </div>

        <div className="hidden md:flex    text-[white] justify-center items-center flex-row gap-5 text-[16px] font-bold">
          <div className=" justify-around flex space-x-2">
            <button
              onClick={handleLogin}
              className="bg-[#2bfff457] rounded-2xl p-3 drop-shadow-2xl shadow-2xl"
            >
              {localStorage.getItem("userEmail") ? "Logout" : "Login"}
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className="admin bg-[#2bfff457] rounded-2xl p-3 drop-shadow-2xl shadow-2xl"
              >
                Admin
              </Link>
            )}
            {isAdmin2 && (
              <Link
                to="/details"
                className="admin bg-[#2bfff457] rounded-2xl p-3 drop-shadow-2xl shadow-2xl"
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        <ul
          className={`responsive md:hidden text-black fixed w-[100%] h-[100%] top-20 bg-white justify-center items-center flex-row gap-5 text-[16px] font-bold ${
            toggle ? "left-[0]" : "left-[-100%]"
          }`}
        >
          <li
            onClick={toggleMenu}
            className="p-3 hover:scale-110 duration-300 ease-in-out justify-center flex hover:text-[#4f47c5]"
          >
            <div
              onClick={toggleMenu}
              to="main"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Home
            </div>
          </li>
          <li
            onClick={toggleMenu}
            className="p-3 hover:scale-110 duration-300 ease-in-out justify-center flex hover:text-[#4f47c5]"
          >
            <div
              onClick={toggleMenu}
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              About Me
            </div>
          </li>
          <li
            onClick={toggleMenu}
            className="p-3 hover:scale-110 duration-300 ease-in-out justify-center flex hover:text-[#4f47c5]"
          >
            <div
              onClick={toggleMenu}
              to="experience"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Experience
            </div>
          </li>
          <li
            onClick={toggleMenu}
            className="p-3 hover:scale-110 duration-300 ease-in-out justify-center flex hover:text-[#4f47c5]"
          >
            <div
              onClick={toggleMenu}
              to="Project"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Project
            </div>
          </li>
          <li
            onClick={toggleMenu}
            className="p-3 hover:scale-110 duration-300 ease-in-out justify-center flex bg-[white] rounded-2xl text-[black] hover:text-[#4f47c5]"
          >
            <a
              onClick={toggleMenu}
              href="https://drive.google.com/file/d/1q4v0DQFQah3rBiRzL0-VRezWob5miEC3/view"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>

      <div className=" bg-[#ffffff25]  hidden p-2 max-w-[95%] rounded-b-2xl  md:flex items-start   mx-auto">
        <ul className="  flex flex-start space-x-4 p-1">
          <li className=" p-2 w-[40px] justify-center items-center  flex bg-[white] rounded-2xl drop-shadow-2xl hover:scale-105 ease-in-out">
            <Link to="/" className="">
              <AiFillHome />
            </Link>
          </li>
          <li className=" p-2  bg-[white] rounded-2xl drop-shadow-2xl hover:scale-105 ease-in-out">
            <Link to="/awareness">Awareness</Link>
          </li>

          <li className=" p-2  bg-[white] rounded-2xl drop-shadow-2xl hover:scale-105 ease-in-out">
            <Link to="/status">Application Track</Link>
          </li>

          <li className=" p-2  bg-[white] rounded-2xl drop-shadow-2xl hover:scale-105 ease-in-out">
            <Link to="/verify">Check For Fraud</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

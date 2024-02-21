import React, { useState, useEffect } from "react";
import video from "../assets/bg.mp4";
import Header from "./header";
import Alicecrosel from "./Alicecrosel";
import Chatbox from "./Chatbox";
import Dummy from "../Aware/Dummy";
import Uimain from "./uimain";

export default function Main() {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to the backend
      const response = await fetch(
        "https://yogapeth.onrender.com/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (response.ok) {
        console.log("Form data submitted successfully");
        alert("Thanks For Reaching US");
        setSubmitted(true);

        setForm({ name: "", mobile: "", message: "" });
      } else {
        console.error("Error submitting form data to backend");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    const video = document.getElementById("bg-video");

    if (video) {
      video.addEventListener("loadeddata", () => {
        setVideoLoaded(true);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener("loadeddata", () => {
          setVideoLoaded(true);
        });
      }
    };
  }, []);

  return (
    <div>
      <div className="max-w-[full]  ">
        <div className="">
          <Uimain />
        </div>

        <div>
          <Chatbox />
        </div>
      </div>
    </div>
  );
}

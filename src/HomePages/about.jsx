import {
  AiOutlineStrikethrough,
  AiOutlinedivedin,
  AiFillGithub,
  AiFillMail,
  AiFillPhone,
} from "react-icons/ai";
import React from "react";
import Form from "../Pages/Form";
import Chatbox from "./Chatbox";
import Chatbotmain from "./Chatbotmain";

export default function about() {
  return (
    <div className="md:flex text-[black]  justify-center   h-[auto]  flex-row mt-6 max-w-[full] mx-auto">
      {/* <Form /> */}
      {/* <Chatbox /> */}
      <Chatbotmain />
    </div>
  );
}

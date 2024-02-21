import React, { useState, useRef } from "react";
import Form from "../Pages/Form";
import RuleBook from "../HomePages/Subchat/Rule";
import video from "../assets/video.mp4";
import Dummy from "../Aware/Dummy";

const Chatbotmain = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const videoRef = useRef();

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="chatsupport  md:w-[70%] p-2 rounded-2xl space-y-2 ">
      <div className=" bg-[#ffffff1f]  text-white flex-col  p-3 rounded-2xl my-2 drop-shadow-2xl shadow-2xl flex items-start">
        <h1 className=" items-center flex justify-center w-full text-[#1df5eaf5] text-3xl my-4 underline">
          Cyber Crime Reporting Portal
        </h1>
        <h1 className=" text-left font-serif text-xl">
          This portal is an initiative of Government of India to facilitate
          victims/complainants to report cyber crime complaints online. This
          portal caters to complaints pertaining to cyber crimes only with
          special focus on cyber crimes against women and children. Complaints
          reported on this portal are dealt by law enforcement agencies/ police
          based on the information available in the complaints.
          <br></br> It is imperative to provide correct and accurate details
          while filing complaint for prompt action. Please contact local police
          in case of an emergency or for reporting crimes other than cyber
          crimes. National police helpline number is 112. National women
          helpline number is 181 and Cyber Crime Helpline is 1930.
        </h1>
      </div>

      <div className="items-center my-2  flex flex-col space-y-2">
        <div className="flex flex-row text-white justify-around w-full">
          <button
            className="bg-[#00f7ff71] hover:scale-105 ease-in-out p-3 rounded-2xl drop-shadow-2xl shadow-2xl"
            onClick={() => handleOptionClick("ruleBook")}
          >
            Rule Book
          </button>
          <button
            className="bg-[#00f7ff71] hover:scale-105 ease-in-out p-3 rounded-2xl drop-shadow-2xl shadow-2xl"
            onClick={() => handleOptionClick("cyberReport")}
          >
            Cyber Report
          </button>
        </div>
      </div>

      <div className="min-h-[40vh] justify-center items-center flex flex-col">
        <div className=" bg-[#ffffff5e] w-full max-w-[70%] my-5 rounded-2xl">
          {selectedOption === "ruleBook" && <RuleBook />}
          {selectedOption === "cyberReport" && <Form />}
        </div>
      </div>

      <div>
        <Dummy />
      </div>
    </div>
  );
};

export default Chatbotmain;

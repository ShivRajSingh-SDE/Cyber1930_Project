import React, { useState } from "react";
import Form from "../Pages/Form";
import RuleBook from "../HomePages/Subchat/Rule";

import "./Chatbox.css"; // Import your stylesheet for styling
import Dummy from "../Aware/Dummy";

const Chatbox = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleChatbox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chatbox-container z-50  ${isOpen ? "open" : "closed"} `}>
      <div
        className="chatbox-header flex-wrap  justify-between w-[97%] flex items-center"
        onClick={toggleChatbox}
      >
        <div className=" p-2">
          <img
            className=" h-[20px]"
            src="https://imgs.search.brave.com/fpDJnblTQP9ufZHzGdxa3x_VuJThi7EKnjUC9fJj80c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4y/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvZS1jb21tZXJj/ZS1saW5lLTQtMS8x/MDI0L3N1cHBvcnQ0/LTY0LnBuZw"
          ></img>
        </div>

        <div className="  ">{isOpen ? "Close" : "Open"}</div>
      </div>
      {/* <Dummy /> */}

      <div>
        {isOpen && (
          <div className="chatbox-content items-center flex flex-col  h-[15vh] space-y-2">
            <p>Choose an option</p>
            <div className=" flex flex-row justify-around  w-full ">
              <button
                className=" bg-[#00f7ff71] p-3 rounded-2xl drop-shadow-2xl shadow-2xl"
                onClick={() => handleOptionClick("ruleBook")}
              >
                Rule Book
              </button>
              <button
                className=" bg-[#00f7ff71] p-3 rounded-2xl drop-shadow-2xl shadow-2xl"
                onClick={() => handleOptionClick("cyberReport")}
              >
                Cyber Report
              </button>
            </div>
          </div>
        )}
      </div>

      <div className=" ">
        {isOpen && (
          <div className="chatbox-messages  ">
            {selectedOption === "ruleBook" && <RuleBook />}
            {selectedOption === "cyberReport" && <Form />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbox;

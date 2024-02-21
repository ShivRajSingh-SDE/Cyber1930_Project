import React, { useState, useRef, useEffect } from "react";

const RuleBased = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const steps = [
    {
      sender: "bot",
      message: "Hello! How can I help you today?",
      options: ["Option 1", "Option 2", "Option 3"],
    },
    {
      sender: "user",
      message: "", // User's response will go here
    },
    {
      sender: "bot",
      message: "", // Bot's follow-up question will go here based on user's choice
      options: [], // Options for the next step will go here
    },
    // Add more steps as needed
  ];

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = (message) => {
    const newMessage = {
      sender: "user",
      message: message,
    };

    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

   
    setCurrentStep((prevStep) => prevStep + 1);
  };

 
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Get the current step information
  const currentStepInfo = steps[currentStep];

  // Render options if available, otherwise render input for user's response
  const renderUserInput = () => {
    if (currentStepInfo.options && currentStepInfo.options.length > 0) {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select an Option:
            <select
              value={userInput}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            >
              <option value="" disabled>Select an option</option>
              {currentStepInfo.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={() => handleSendMessage(userInput)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Response:
            <input
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </label>
          <button
            onClick={() => handleSendMessage(userInput)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          >
            Next
          </button>
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto mt-8 my-5">
      <h1 className="text-3xl font-bold mb-4">Rule-Based Chatbot</h1>

      <div
        className="bg-gray-200 p-4 rounded-md max-w-[500px] mx-auto mb-4 overflow-y-auto"
        style={{ maxHeight: "400px" }}
        ref={chatContainerRef}
      >
        {chatHistory.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === "bot" ? "text-blue-700" : "text-gray-700"}`}>
            <strong>{message.sender === "user" ? "You:" : "Chatbot:"}</strong> {message.message}
          </div>
        ))}
      </div>

      {currentStepInfo && (
        <div className="mb-4">
          <div className={`mb-2 ${currentStepInfo.sender === "bot" ? "text-blue-700" : "text-gray-700"}`}>
            <strong>{currentStepInfo.sender === "user" ? "You:" : "Chatbot:"}</strong> {currentStepInfo.message}
          </div>
          {renderUserInput()}
        </div>
      )}
    </div>
  );
};

export default RuleBased;

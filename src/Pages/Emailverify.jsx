import React, { useState } from "react";
import axios from "axios";

const Emailverify = () => {
  const [formData, setFormData] = useState({
    from: "",
    subject: "",
    salutation: "Dear Sir/Madam",
    body: "",
    hasAttachment: false,
  });

  const [verificationResult, setVerificationResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/fraud-analyze",
        formData
      );
      setVerificationResult(response.data.result);
      console.log("Data sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center flex-col justify-center ">
      <form className="bg-white p-8 drop-shadow-xl shadow-md w-96 rounded-2xl">
        <label className="block mb-4">
          From:
          <input
            className="border w-full p-2 mt-2"
            type="email"
            name="from"
            value={formData.from}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-4">
          Subject:
          <input
            className="border w-full p-2 mt-2"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-4">
          Salutation:
          <input
            className="border w-full p-2 mt-2"
            type="text"
            name="salutation"
            value={formData.salutation}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-4">
          Body:
          <textarea
            className="border w-full p-2 mt-2"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-4">
          Has Attachment:
          <input
            type="checkbox"
            name="hasAttachment"
            checked={formData.hasAttachment}
            onChange={handleChange}
          />
        </label>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          type="button"
          onClick={handleSubmit}
        >
          Validate and Send
        </button>
      </form>

      {verificationResult !== null && (
        <div className="mt-4">
          {verificationResult ? (
            <p className="text-red-500">
              This email sender might be spam or fraudulent.
            </p>
          ) : (
            <p className="text-green-500">
              The email sender is likely legitimate.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Emailverify;

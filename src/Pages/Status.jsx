import React, { useState, useEffect } from "react";
import axios from "axios";

const Status = () => {
  const [idInput, setIdInput] = useState("");
  const [formEntry, setFormEntry] = useState(null);

  const handleIdInputChange = (e) => {
    setIdInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5000/form-entries/${idInput}`
      );
      setFormEntry(response.data);
    } catch (error) {
      console.error("Error fetching form entry:", error);
      setFormEntry(null);
    }
  };

  return (
    <div className="container max-w-[40%] mx-auto mt-8 my-5">
      <form onSubmit={handleSubmit} className="rounded-2xl bg-gray-100 p-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Enter Form ID:
          <input
            type="text"
            value={idInput}
            onChange={handleIdInputChange}
            className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue mt-4"
        >
          Get Form Status
        </button>
      </form>

      {formEntry && (
        <div className="mt-4 rounded-2xl bg-white drop-shadow-xl shadow-xl justify-center max-w-[500px] mx-auto items-center flex flex-col p-4">
          <h2 className="text-xl font-bold mb-2">Form Entry Status</h2>
          <table className="table-auto w-full">
            <tbody>
              <tr className="border-b">
                <td className="font-bold py-2">Your Token ID:</td>
                <td className="py-2">{formEntry.id}</td>
              </tr>
              <tr className="border-b">
                <td className="font-bold py-2">Status:</td>
                <td className="py-2">{formEntry.status}</td>
              </tr>
              <tr>
                <td className="font-bold py-2">Description:</td>
                <td className="py-2">{formEntry.description}</td>
              </tr>

              <tr>
                <td className="font-bold py-2">Police Doc's:</td>
                <td className="py-2">
                  <a
                    href={formEntry.description2}
                    className=" text-[blue]"
                    target="_blank"
                  >
                    Link
                  </a>
                </td>
              </tr>

              <tr>
                <td className="font-bold py-2">Judge Doc's:</td>
                <td className="py-2">
                  <a
                    href={formEntry.descriptionNew}
                    className=" text-[blue]"
                    target="_blank"
                  >
                    Link
                  </a>
                </td>
              </tr>

              <tr>
                <td className="font-bold py-2">Judge Status:</td>
                <td className="py-2">{formEntry.status2}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Status;

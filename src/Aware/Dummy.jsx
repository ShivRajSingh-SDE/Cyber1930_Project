import React from "react";
import mainimg from "./mainimg.png";
import COMIC from "./COMIC.png";
import "./app.css";

const Dummy = () => {
  // State for modal visibility
  const [modalVisible, setModalVisible] = React.useState(false);

  // Open modal function
  const openModal = (imageSrc) => {
    setModalVisible(true);
    document.getElementById("modal-image").src = imageSrc;
  };

  // Close modal function
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="font-comfortaa text-white">
      <div className="title max-w-[1100px]  mx-auto">
        <h1 className=" md:text-2xl text-xl font-serif my-5 ">
          Protecting Yourself Against Potential Threats in the Cyber World
        </h1>
        <hr />
        <marquee
          id="flag"
          className="  rounded-2xl m-2 drop-shadow-2xl shadow-xl"
        >
          <img src={mainimg} className=" h-[300px]  w-[300px]" alt="Main" />
        </marquee>
        <div className=" md:text-2xl text-xl font-serif my-5 text-[#1fada6f5]">
          "Cybercrime is the greatest threat to every company in the world." -
          <span className=" text-white">MUKESH CHOUDHARY</span>
        </div>
        <hr />

        <br />
      </div>
    </div>
  );
};

export default Dummy;

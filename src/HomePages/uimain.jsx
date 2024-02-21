import React from "react";
import { AiOutlineBarChart, AiOutlineAreaChart } from "react-icons/ai";

const uimain = () => {
  return (
    <div className=" md:h-[100vh] h-auto md:flex flex-row   ">
      <div className="  h-full  md:w-[50%]   text-left p-5 flex text-white  flex-col  justify-start ">
        <div className=" w-[80%] mx-auto  flex flex-col justify-center space-y-5 items-center h-full">
          <h1 className=" flex float-left w-full md:text-7xl text-5xl  ">
            <span className=" text-[#1fada6f5] -translate-x-2">Helpline </span>
            1930
          </h1>
          <h1 className=" text-2xl font-serif">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
            qui accusantium rerum praesentium quidem maxime corporis earum,
            labore soluta voluptates enim voluptate nam magni, sint et
            doloremque alias? Nulla, corporis.
          </h1>

          <div className=" flex flex-row justify-around w-full ">
            <div className=" flex flex-row justify-center items-center gap-2 bg-[#ffffff23] drop-shadow-xl shadow-xl  p-2 rounded-2xl ">
              <AiOutlineBarChart className=" md:text-7xl text-5xl text-[#1fada6f5]" />
              <div className=" md:text-2xl">
                <h1>Financial Fraud </h1>
                <p>95000</p>
              </div>

              <h1>2022-2023</h1>
            </div>

            <div className=" flex flex-row justify-center items-center gap-2 bg-[#ffffff23] drop-shadow-xl shadow-xl  p-2 rounded-2xl ">
              <AiOutlineAreaChart className=" md:text-7xl text-5xl text-[#1fada6f5]" />
              <div className=" md:text-2xl">
                <h1>Job Scams</h1>
                <p>97745</p>
              </div>

              <h1>2022-2023</h1>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:w-[50%]  h-full flex items-center  justify-center  ">
        <img
          className=" md:scale-125 md:-translate-y-10"
          src="https://i.imgur.com/ZUn0hNI.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default uimain;

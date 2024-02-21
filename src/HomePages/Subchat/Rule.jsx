import { Rules } from "./Rules";

import React, { useState } from "react";

const Rule = () => {
  const [extraVisibleStates, setExtraVisibleStates] = useState(
    Rules.map(() => false)
  );

  const handleMainClick = (index) => {
    setExtraVisibleStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <div className=" mt-8">
      {Rules.map((item, index) => (
        <div key={index}>
          <div
            onClick={() => handleMainClick(index)}
            className="justify-between m-2 p-4 rounded-xl bg-[#ffffff] flex"
          >
            <div>{item.head}</div>
            <div className="main duration-300 ease-in-out animate-bounce">
              ⬇️
            </div>
          </div>
          {extraVisibleStates[index] && (
            <div className=" font-serif text-[14px] bg-[#21f8ff2a] rounded-lg p-3 duration-300 ease-in-out">
              {item.child}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Rule;

import React from "react";
import RegionAdder from "./RegionAdder";
const page = () => {
  return (
    <div className="flex mt-20  w-full flex-col justify-center  ">
      <div className="text-3xl font-extrabold w-full mt-[-15px] text-center">
        CUSTOM REGION
      </div>
      <RegionAdder></RegionAdder>
    </div>
  );
};

export default page;

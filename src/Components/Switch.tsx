import React from "react";
interface Props {
  isswitchon: boolean;
  setswitch: React.Dispatch<React.SetStateAction<boolean>>;
}
const InputSwitch = ({ isswitchon, setswitch }: Props) => {
  return (
    <div>
      <div
        className="flex absolute w-18 h-8 rounded-full bg-neutral-700 shadow-md/70 shadow-black cursor-pointer "
        onClick={() => setswitch(!isswitchon)}
      >
        <div
          className={
            isswitchon
              ? "flex absolute w-6 rounded-full top-1 left-11 transition-all duration-300  z-90 bg-black h-6"
              : "flex absolute w-6 rounded-full top-1 left-1  transition-all duration-300 z-90 bg-black h-6"
          }
        ></div>
      </div>
    </div>
  );
};

export default InputSwitch;

import React from "react";
interface Props {
  Icon: React.JSX.Element;
  isitpassed: boolean;
  setisitpassed: React.Dispatch<React.SetStateAction<boolean>>;
}
const MenuWrapper = ({ Icon, isitpassed, setisitpassed }: Props) => {
  return (
    <div className="fixed z-70">
      <div>
        <button
          className={
            isitpassed
              ? "w-[100vw] h-[100vh] bg-black/40 z-70 fixed top-0 backdrop-blur-sm left-0"
              : "none"
          }
          onClick={() => {
            console.log("aaa");
            setisitpassed(false);
          }}
        ></button>
        {Icon}
      </div>
    </div>
  );
};

export default MenuWrapper;

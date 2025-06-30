import React from "react";
interface Props {
  isswitchon: boolean;
  setswitch: React.Dispatch<React.SetStateAction<boolean>>;
}
const Switch = ({ isswitchon, setswitch }: Props) => {
  return (
    <>
      <div
        className="flex absolute w-18 h-8 rounded-full bg-neutral-700 shadow-md/70 shadow-black cursor-pointer "
        onClick={() => setswitch(!isswitchon)}
      >
        <div
          className={
            isswitchon
              ? "flex absolute w-6 rounded-full top-1 left-11 transition-all duration-300  z-90 bg-black h-6 justify-center items-center"
              : "flex absolute w-6 rounded-full top-1 left-1  transition-all duration-300 z-90 bg-black h-6 justify-center items-center"
          }
        >
          {!isswitchon ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                fill="rgb(255,255,255)"
              />
              <path
                d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                fill="rgb(255,255,255)"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 12H21M3 12C3 16.9706 7.02944 21 12 21M3 12C3 7.02944 7.02944 3 12 3M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M12 21C4.75561 13.08 8.98151 5.7 12 3M12 21C19.2444 13.08 15.0185 5.7 12 3"
                stroke="rgb(255,255,255)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </div>
      </div>
    </>
  );
};

export default Switch;

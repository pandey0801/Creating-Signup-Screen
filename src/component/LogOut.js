import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { logAction } from './store/Login';
import logAction from "../component/store/LogStatus";

export default function LogOut() {
  // https://media.istockphoto.com/id/1008861200/photo/stack-of-one-hundred-dollars-notes.jpg?s=612x612&w=0&k=20&c=Q5Dl6Giw7iWOSWgjy5fnkEyRCTgxT8cJyFIAbOMo7TA=
const url = "https://media.istockphoto.com/id/826588658/video/woman-fanning-through-large-stack-of-usa-currency.mp4?s=mp4-640x640-is&k=20&c=vcrfA5LkqHo9RNZ_1UUxJgas0_PCgwFDU04QwEj7W88=";
  const dispatch = useDispatch();

  const history = useHistory();

  const LogOutSwitch = () => {
    dispatch(logAction.logOut());

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    console.log("log out");

    // history.replace('/login');
    history.replace("/login");
  };
  return (
    // <div className="bg-red-300">
    //   <button
    //     className=" flex justify-center border border-2 border-red-400 text-red-600 px-2 "
    //     onClick={LogOutSwitch}
    //   >
    //     LogOut
    //   </button>
    // </div>

    <div className="relative h-screen">
    {/* Background video */}
    <video
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
      src={url}
      autoPlay
      loop
      muted
    />

    {/* Overlay with content */}
    <div className="relative z-10 flex justify-center items-center h-full bg-black bg-opacity-50">
      <button
        className="border border-2 border-red-400 text-red-600 px-4 py-2 bg-white bg-opacity-75 rounded hover:bg-opacity-100"
        onClick={LogOutSwitch}
      >
        LogOut
      </button>
    </div>
  </div>
  );
}

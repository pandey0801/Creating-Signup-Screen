import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { logAction } from './store/Login';
import logAction from "../component/store/LogStatus";

export default function LogOut() {
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
    <div>
      <button
        className=" flex justify-center border border-2 border-red-300 text-red-600 px-2 "
        onClick={LogOutSwitch}
      >
        LogOut
      </button>
    </div>
  );
}

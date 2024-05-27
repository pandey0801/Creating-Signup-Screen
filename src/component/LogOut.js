import React from 'react'
import { useHistory } from 'react-router-dom';

export default function LogOut() {

    const history = useHistory();

    const LogOutSwitch =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        console.log('log out');

        // history.replace('/login');
        history.replace('/login');
      }
  return (
    <div>
        <button className=' flex justify-center border border-2 border-red-300 text-red-600 px-2 ' onClick={LogOutSwitch}>
            LogOut
        </button>
    </div>
  )
}

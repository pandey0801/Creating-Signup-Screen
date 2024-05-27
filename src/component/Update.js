import React, { useState } from "react";
import { FaYoutube, FaInstagram, FaSpotify } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoPlanetSharp } from "react-icons/io5";
import { useRef } from "react";
import LogOut from "./LogOut";

export default function Update() {
  const name = useRef();
  const profile = useRef();
  const [Change, setChange] = useState(false);
  const [print, Setprint] = useState([]);
  const token = localStorage.getItem('token');
  console.log(token);

  const swithcHandle = () => {
    setChange((perState) => !perState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('im click ');
    // console.log(name.current.value);
    // console.log(profile.current.value);

    const dataSet = {
      name: name.current.value,
      profile: profile.current.value,
    };

    fetch("https://react-http-af8d1-default-rtdb.firebaseio.com/profile.json", {
      method: "POST",
      body: JSON.stringify(dataSet),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        console.log(res.json());
        console.log(res.isToken);
        // localStorage.setItem("token",res.isToken)
      } else {
        console.log("error");
      }
    });
  };


//  const fetchData = ()=>{

//   if (!token) {
//     console.error("No token found");
//     return;
//   }

//   fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw',
//     {
//       method:"POST",
//       // body: token
//       body: JSON.stringify({
//         idToken: token
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }).then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("Failed to fetch data.");
//       }
//     }).then((data) => {
//       console.log(data);
//     }).catch((error) => {
//       console.error("Error:", error.message);
//       if (error.data) {
//         console.error("Error details:", error.data);
//       }
//     });

  
//  }


const fetchData = ()=>{

  if (!token) {
    console.error("No token found");
    return;
  }

  fetch('https://react-http-af8d1-default-rtdb.firebaseio.com/profile.json',
    {
      method:"GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Failed to fetch data.");
      }
    }).then((data) => {
      console.log(data);
      const dataArray = Array.isArray(data) ? data : Object.values(data);

      Setprint(dataArray);
      console.log(dataArray)
    }).catch((error) => {
      console.error("Error:", error.message);
      if (error.data) {
        console.error("Error details:", error.data);
      }
    });  
 }

 //email verification 
 const sendVerificationEmail = () => {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: token
        }),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to send verification email.');
        }
      }).then((data) => {
        console.log('Verification email sent:', data);
      }).catch((error) => {
        console.error('Error sending verification email:', error);
      });
};


  return (
    <div>
      <div className="flex justify-between border-solid border-b-2 border-black border-bottom-1">
        <div>
          <h1>Welcome to Expense Tracker</h1>
        </div>

        <div>
          <button type="button" onClick={swithcHandle}>
            you'r profile is incomplet{" "}
            <span className="text-blue-700">Complet now</span>
          </button>
        </div>

        <div>
          <LogOut/>
        </div>
      </div>

      {Change && (
        <div className="flex justify-between border-solid border-b-2 border-black border-bottom-1 p-5">
          <div>
            <div>
              <h1>Contact details</h1>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <FaGithub />
                <label htmlFor="name" className="font-medium m-3">
                  Enter name
                </label>
                <input
                  className="border-solid border-2 border-black rounded-sm"
                  ref={name}
                ></input>
              </div>
            </div>

            <div>
              <button
                className="border-solid rounded-sm bg-red-200 text-white px-3"
                type="button"
                onClick={handleSubmit}
              >
                Update
              </button>
            </div>
          </div>

          <div>
            <div>
              <button
                className="border-solid border-2 border-red-600 text-red-600 rounded-sm bg-white px-3 m-3"
                onClick={swithcHandle}
              >
                cancel
              </button>
            </div>

            <div className="flex items-center mb-3">
              <IoPlanetSharp />
              <label htmlFor="name" className="font-medium m-3">
                Profile photo URL
              </label>
              <input
                className=" border-black rounded-sm border-solid border-2 m-2"
                ref={profile}
              ></input>
            </div>
          </div>
        </div>
      )}

      <div>
        <button type='button' onClick={fetchData}>fetch data</button>
        <div>
          {print.map((item, index) => (
            <div key={index}>
              <p>Name: {item.name}</p>
              <p>Profile: {item.profile}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button type="button" onClick={sendVerificationEmail}>Send Verification Email</button>
      </div>

    </div>
  );
}

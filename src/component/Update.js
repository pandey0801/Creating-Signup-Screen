import React, { useState } from 'react'
import { FaYoutube, FaInstagram, FaSpotify } from 'react-icons/fa';
import { FaGithub } from "react-icons/fa";
import { IoPlanetSharp } from "react-icons/io5";
import { useRef } from 'react';



export default function Update() {

    const name = useRef();
    const profile = useRef();
    const [Change, setChange]  = useState(false);

    const swithcHandle = () =>
        {
            setChange((perState) => !perState);
        }

    const handleSubmit = (event) =>
        {
            event.preventDefault();
            // console.log('im click ');
            // console.log(name.current.value);  
            // console.log(profile.current.value);

            const dataSet = {
                name: name.current.value,
                profile: profile.current.value,
            }

            fetch('https://react-http-af8d1-default-rtdb.firebaseio.com/profile.json',
                {
                    method: 'POST',
                    body: JSON.stringify(dataSet),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                }
            ).then((res)=>{
                if(res.ok)
                    {
                        console.log(res.json())
                    }
                    else
                    {
                        console.log('error')
                    }
            })


        }
  return (
    <div>

        <div className='flex justify-between border-solid border-b-2 border-black border-bottom-1'>
            <div>
                <h1>Welcome to Expense Tracker</h1>
            </div>

            <div>
                <button type='button' onClick={swithcHandle}>you'r profile is incomplet <span className='text-blue-700'>Complet now</span></button>
            </div>

        </div >

{Change &&(
        <div className='flex justify-between border-solid border-b-2 border-black border-bottom-1 p-5'>
            <div>
                <div>
                <h1>Contact details</h1>
                </div>
            

            <div>
          
                <div className='flex items-center mb-3'> 
                <FaGithub/>
                <label htmlFor='name' className='font-medium m-3'>Enter name</label>
                <input className='border-solid border-2 border-black rounded-sm'
                ref={name}></input>
                </div>

            </div>
            

            <div>
            <button className='border-solid rounded-sm bg-red-200 text-white px-3'
            type='button'
            onClick={handleSubmit}
            >Update</button>
            </div>

            </div>
            

            <div>
                <div>
                <button className='border-solid border-2 border-red-600 text-red-600 rounded-sm bg-white px-3 m-3'
                onClick={swithcHandle}
                >cancel</button>
                </div>

                <div className='flex items-center mb-3'>
                <IoPlanetSharp/>
                <label htmlFor='name' className='font-medium m-3'>Profile photo URL</label>
                <input className=' border-black rounded-sm border-solid border-2 m-2'
                ref={profile}></input>
                </div>

            </div>

        </div>
)}
    </div>
   
  )
}

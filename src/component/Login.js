import React, { useState } from 'react'
import { useRef } from 'react';

function Login() {

    const email = useRef('');
    const password1 = useRef('');
    const password2 = useRef('');

    const [isLogIn, setIsLogIn] = useState(true);

    const switchMood =()=>{
        setIsLogIn((perState) => !perState);
    }

    const handleSubmit = (event) =>
        {
            event.preventDefault()

            const pas1 = password1.current.value;
            const pas2 = password2.current.value;
            const enteredEmail = email.current.value;

            // console.log(pas1, pas2);
            if(pas1===pas2)
                {
                    console.log('login');

                    let url;
                    if(isLogIn)
                        {
                            // log in
                            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw';
                        }
                        else{
                            //Singin
                            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw';
                        }

                    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: pas1,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = 'Authentication failed!';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        console.log('idToken:', data.idToken);
        // You can now use the idToken for further API requests or store it as needed.
        // Example: Storing the token in local storage
        const token = data.idToken;
        // localStorage.setItem('token', token);
  
        // authCtx.login(data.idToken);
        // history.replace('/');
      })
      .catch(err => {
        alert(err.message);
      });
        
                }

                else{
                    alert('password mismatch');
                    password1.current.value = '';
                    password2.current.value = '';
                }

                
            console.log(email.current.value);
            console.log(password1.current.value);

           
        }

  return (
<>

<div className='flex flex-col justify-center items-center bg-gray-100 min-h-screen'>
    <div className='bg-white w-96 p-8 rounded-lg shadow-lg m-9 h-[28rem] '>

        {isLogIn?<h1 className='text-2xl mb-8 text-bold text-center'>Log in</h1>:<h1 className='text-2xl mb-8 text-bold text-center'>Sing-Up</h1>}

        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
            <label htmlFor='email' className='display-block text-sm font-medium text-gray-700 mb-2'>Email</label>
            <input type ='email' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 '
            ref={email}></input>
            </div>


            <div className='mb-4'>
            <label htmlFor='password' className='display-block text-sm font-medium text-gray-700 mb-2'>Enter password</label>
            <input type = 'password' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 '
            ref={password1}></input>
            </div>

            
            <div className='mb-4'>
            <label htmlFor='password' className='display-block text-sm font-medium text-gray-700 mb-2'>Conform password</label>
            <input type = 'password' className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 '
            ref={password2}></input>
            </div>


            <div className='mb-4'>
            {isLogIn && <button type='submit' class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">log in</button>}
            {!isLogIn && <button type='submit' class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">Sing Up</button>}           
            </div>
        </form>

</div>

<div className='mb-4'>
{/* <button type="button" class="w-80 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Teal to Lime</button> */}

<button class=" w-80 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-green-800 dark:text-gray-600 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
onClick={switchMood}>
<span class="w-80 relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-700 dark:bg-green-200 rounded-md group-hover:bg-opacity-0">
Have an account? Login 
</span>
</button>
</div>
</div>

</>
  )
}

export default Login;

// import React, { useState, useRef } from 'react';

// function Login() {
//   const email = useRef('');
//   const password1 = useRef('');
//   const password2 = useRef('');

//   const [isLogIn, setIsLogIn] = useState(true);

//   const switchMood = () => {
//     setIsLogIn((prevState) => !prevState);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const pas1 = password1.current.value;
//     const pas2 = password2.current.value;
//     const enteredEmail = email.current.value;

//     if (pas1 === pas2) {
//       console.log('login');

//       let url;
//       if (isLogIn) {
//         // Login URL
//         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw';
//       } else {
//         // Sign-up URL
//         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKgJHQ2FKkDZ_JHWUlBCBL1I1Ry-bSEOw';
//       }

//       fetch(url, {
//         method: 'POST',
//         body: JSON.stringify({
//           email: enteredEmail,
//           password: pas1,
//           returnSecureToken: true
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//         .then(res => {
//           if (res.ok) {
//             return res.json();
//           } else {
//             return res.json().then(data => {
//               let errorMessage = 'Authentication failed!';
//               if (data && data.error && data.error.message) {
//                 errorMessage = data.error.message;
//               }
//               throw new Error(errorMessage);
//             });
//           }
//         })
//         .then(data => {
//           console.log('idToken:', data.idToken);
//           // Store the token or use it as needed
//         })
//         .catch(err => {
//           alert(err.message);
//         });
//     } else {
//       alert('Passwords do not match!');
//       password1.current.value = '';
//       password2.current.value = '';

//     }

//     console.log('Email:', email.current.value);
//     console.log('Password:', password1.current.value);
//   };

//   return (
//     <div className='flex flex-col justify-center items-center bg-gray-100 min-h-screen'>
//       <div className='bg-white w-96 p-8 rounded-lg shadow-lg m-9 h-[28rem]'>
//         <h1 className='text-2xl mb-8 font-bold text-center'>
//           {isLogIn ? 'Log In' : 'Sign Up'}
//         </h1>

//         <form onSubmit={handleSubmit}>
//           <div className='mb-4'>
//             <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
//             <input
//               type='email'
//               className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2'
//               ref={email}
//               required
//             />
//           </div>

//           <div className='mb-4'>
//             <label htmlFor='password1' className='block text-sm font-medium text-gray-700 mb-2'>Enter password</label>
//             <input
//               type='password'
//               className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2'
//               ref={password1}
//               required
//             />
//           </div>



//           {!isLogIn && (
//             <div className='mb-4'>
//               <label htmlFor='password2' className='block text-sm font-medium text-gray-700 mb-2'>Confirm password</label>
//               <input
//                 type='password'
//                 className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2'
//                 ref={password2}
//                 required
//               />
//             </div>
//           )}

//           <div className='mb-4'>
//             <button
//               type='submit'
//               className='w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2'
//             >
//               {isLogIn ? 'Log In' : 'Sign Up'}
//             </button>
//           </div>
//         </form>
//       </div>

//       <div className='mb-4'>
//         <button
//           type='button'
//           className='w-80 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
//           onClick={switchMood}
//         >
//           {isLogIn ? 'Create an account' : 'Have an account? Log In'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Login;

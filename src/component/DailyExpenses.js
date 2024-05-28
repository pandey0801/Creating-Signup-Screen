
// import React from "react";

// export default function DailyExpenses() {
//   return (
//     <div>
//       <form>
//         <label htmlFor="money">
//           Enter Money
//           <input type="text" id="money" name="money" />
//         </label>
//         <br />

//         <label htmlFor="description">
//           Enter Description
//           <input type="text" id="description" name="description" />
//         </label>
//         <br />

//         <label htmlFor="category">Category:</label>
//         <select id="category" name="category">
//           <option value="Food">Food</option>
//           <option value="Petrol">Petrol</option>
//           <option value="Salary">Salary</option>
//           <option value="Vegetable">Vegetable</option>
//         </select>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";

export default function DailyExpenses() {

    const [money,setMoney] = useState('');
    const [des,setDes] = useState('');
    const [cat,setCat] = useState('Food');
    const [data,setData] = useState([])

    const submitHandle = (e) =>
        {
            // e.preventDefault; 
            e.preventDefault();
            // console.log(money, des, cat);
            setData([...data, {money, des, cat}]);
           

            setMoney('');
            setDes('');
            // setCat('');
        }

        console.log(data);
        

       
    
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md" onSubmit={submitHandle}>
        <div className="mb-4">
          <label htmlFor="money" className="block text-gray-700 font-bold mb-2">
            Enter Money
          </label>
          <input
            type="text"
            name="money"
            value={money}
            onChange={(e)=>{setMoney(e.target.value)}}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Enter Description
          </label>
          <input
            type="text"
            name="description"
            vale={des}
            onChange={(e)=>{setDes(e.target.value)}}

            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">
            Category
          </label>
          <select
            name="category"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>{setCat(e.target.value)}}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>
        
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
        </div>
      </form>

      <div className="mt-6 w-full max-w-md">
        {data.map((expense, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
            <p className="text-gray-700"><strong>Money:</strong> {expense.money}</p>
            <p className="text-gray-700"><strong>Description:</strong> {expense.des}</p>
            <p className="text-gray-700"><strong>Category:</strong> {expense.cat}</p>
          </div>
          ))}
          </div>
    </div>
    
  );
}


/*
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import expensesActions from "../component/store/exp";
import { themeActions } from "../component/store/Theme";

export default function DailyExpenses() {
  const [money, setMoney] = useState("");
  const [des, setDes] = useState("");
  const [cat, setCat] = useState("Food");
  const [editingKey, setEditingKey] = useState(null);

  const dispatch = useDispatch();
  // const allexp = useDispatch((state)=>state.expenses);
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const premiumActive = useSelector((state) => state.expenses.premiumActive);

  const theme = useSelector((state) => state.themeUse.isDarkMode);
  console.log(theme); //{isDarkMode: false}

  // console.log(expenses);
  // console.log(totalAmount);
  // console.log(premiumActive);

  const submitHandle = (e) => {
    e.preventDefault();
    const newData = { money, des, cat };

    if (editingKey) {
      fetch(
        `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker/${editingKey}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      )
        .then((res) => res.json())
        .then(() => {
          // console.log(newData); //{money: '2000', des: 'samosh', cat: 'Food'} update value
          // console.log(editingKey); //-NzIz6d_p1zbwqDH96ge
          dispatch(
            expensesActions.updateExpense({ ...newData, key: editingKey })
          );
          setMoney("");
          setDes("");
          setCat("Food");
          setEditingKey(null);
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      fetch(
        "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      )
        .then(
          (
            res //Reads and parses the response body as JSON, returning a promise that resolves to the parsed data.
          ) => res.json()
          // console.log(res); // Response {type: 'cors', url: 'https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker.json', redirected: false, status: 200, ok: true, …}
          // console.log(res.json()); // Promise {<pending>}
        )
        //Works with the parsed data to perform further operations. data is vareable
        .then((data) => {
          // console.log(data); //{name: '-NzMHBTKLM-w8wcFn-E8'}
          dispatch(expensesActions.addExpense({ ...newData, key: data.name }));
          setMoney("");
          setDes("");
          setCat("Food");
        })
        .catch((error) => console.error("Error saving data:", error));
    }
  };

  const deleteExpense = (key) => {
    fetch(
      `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker/${key}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          // console.log(key); //-NzMGueYmKqrRIyDSKGI
          dispatch(expensesActions.deleteExpense(key));
        } else {
          throw new Error("Failed to delete data.");
        }
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const getData = () => {
    fetch(
      "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          // console.log(res.json()); //Promise {<pending>}
          return res.json();
        } else {
          throw new Error("Failed to fetch data.");
        }
      })
      .then((data) => {
        // console.log(data);  //-NzIz6d_p1zbwqDH96ge: {cat: 'Food', des: 'samosh', money: '1000'} ...
        const dataArray = data
          ? Object.keys(data).map((key) => ({ key, ...data[key] }))
          : [];
        // This maps over the keys of the data object, creating a new array where each expense object includes its key.
        // console.log(dataArray); //[0: {key: '-NzIz6d_p1zbwqDH96ge', cat: 'Food', des: 'samosh', money: '1000'} ...]
        dispatch(expensesActions.setExpenses(dataArray));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const editExpense = (expense) => {
    setMoney(expense.money);
    setDes(expense.des);
    setCat(expense.cat);
    setEditingKey(expense.key);
  };

  useEffect(() => {
    getData();
  }, []);

  const premiumHandle = (event) => {
    event.preventDefault();
    dispatch(themeActions.toggleTheme());
  };

  return (
    // <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    // <div className={`${theme ? "dark" : ""} flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900`}>
    // <div className={`${theme ? "dark" : ""}`}>   
    // <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className={`${theme ? "flex flex-col justify-center items-center min-h-screen bg-gray-100" : "flex flex-col justify-center items-center min-h-screen bg-gray-900"}`}>
      <form
        // className= {`${theme ? "bg-white p-6 rounded-lg shadow-lg w-full max-w-md" : "bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"}`}
        className={`p-6 rounded-lg shadow-lg w-full max-w-md  ${theme ? 'bg-white' : 'bg-gray-800'}`}
        onSubmit={submitHandle}
      >
        <div className="mb-4">
          <label htmlFor="money" className={`${theme ? "block text-gray-700 font-bold mb-2" : "block text-gray-300 font-bold mb-2"}`}>
            Enter Money
          </label>
          <input
            type="text"
            name="money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme?'border-gray-300':'border-gray-700'}`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            // className="block text-gray-700 font-bold mb-2"
            className={`block font-bold mb-1 ${theme?'text-gray-700':'text-gray-300'}`}
          >
            Enter Description
          </label>
          <input
            type="text"
            name="description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme?'border-gray-300':'border-gray-700'}`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            // className="block text-gray-700 font-bold mb-2"
            className={`block font-bold mb-1 ${theme?'text-gray-700':'text-gray-300'}`}
          >
            Category
          </label>
          <select
            name="category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme?'border-gray-300':'border-gray-700'}`}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button 
          // className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          className={`px-4 py-2 bg-blue-500 text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500${theme? 'bg-blue-500 hover:bg-blue-700':'bg-blue-700 hover:bg-blue-900'}`}
          >
            {editingKey ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      {premiumActive && (
        <div className="mt-6 w-full max-w-md text-center">
          <button
            // className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            className={`px-4 py-2 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${theme?'bg-green-700 hover:bg-green-900':'bg-green-500 hover:bg-green-700'}`}
            onClick={premiumHandle}
          >
            Activate Premium
          </button>
        </div>
      )}

      <div className="mt-6 w-full max-w-md">
        {expenses.map((expense) => (
          <div
            key={expense.key}
            // className="bg-white p-4 rounded-lg shadow-md mb-4"
            className={`bg-white p-4 rounded-lg shadow-md mb-4 ${theme?'bg-white':'bg-gray-800'}`}
          >
      
            <p className={`${theme?'text-gray-700':'text-gray-300'}`}>

              <strong>Money:</strong> {expense.money}
            </p>
            <p className={`${theme?'text-gray-700':'text-gray-300'}`}>
              <strong>Description:</strong> {expense.des}
            </p>
            <p className={`${theme?'text-gray-700':'text-gray-300'}`}>
              <strong>Category:</strong> {expense.cat}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => editExpense(expense)}
                className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(expense.key)}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}
*/


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import expensesActions from "../component/store/exp";
import { themeActions } from "../component/store/Theme";

export default function DailyExpenses() {
  const [money, setMoney] = useState("");
  const [des, setDes] = useState("");
  const [cat, setCat] = useState("Food");
  const [editingKey, setEditingKey] = useState(null);

  const dispatch = useDispatch();
  // const allexp = useDispatch((state)=>state.expenses);
  const expenses = useSelector((state) => state.expenses.expenses);
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const premiumActive = useSelector((state) => state.expenses.premiumActive);

  const theme = useSelector((state) => state.themeUse.isDarkMode);
  console.log(theme); //{isDarkMode: false}

  // console.log(expenses);
  // console.log(totalAmount);
  // console.log(premiumActive);

  const submitHandle = (e) => {
    e.preventDefault();
    const newData = { money, des, cat };

    if (editingKey) {
      fetch(
        `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker/${editingKey}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      )
        .then((res) => res.json())
        .then(() => {
          // console.log(newData); //{money: '2000', des: 'samosh', cat: 'Food'} update value
          // console.log(editingKey); //-NzIz6d_p1zbwqDH96ge
          dispatch(
            expensesActions.updateExpense({ ...newData, key: editingKey })
          );
          setMoney("");
          setDes("");
          setCat("Food");
          setEditingKey(null);
        })
        .catch((error) => console.error("Error updating data:", error));
    } else {
      fetch(
        "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        }
      )
        .then(
          (
            res //Reads and parses the response body as JSON, returning a promise that resolves to the parsed data.
          ) => res.json()
          // console.log(res); // Response {type: 'cors', url: 'https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker.json', redirected: false, status: 200, ok: true, …}
          // console.log(res.json()); // Promise {<pending>}
        )
        //Works with the parsed data to perform further operations. data is vareable
        .then((data) => {
          // console.log(data); //{name: '-NzMHBTKLM-w8wcFn-E8'}
          dispatch(expensesActions.addExpense({ ...newData, key: data.name }));
          setMoney("");
          setDes("");
          setCat("Food");
        })
        .catch((error) => console.error("Error saving data:", error));
    }
  };

  const deleteExpense = (key) => {
    fetch(
      `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker/${key}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          // console.log(key); //-NzMGueYmKqrRIyDSKGI
          dispatch(expensesActions.deleteExpense(key));
        } else {
          throw new Error("Failed to delete data.");
        }
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const getData = () => {
    fetch(
      "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/expensetracker.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          // console.log(res.json()); //Promise {<pending>}
          return res.json();
        } else {
          throw new Error("Failed to fetch data.");
        }
      })
      .then((data) => {
        // console.log(data);  //-NzIz6d_p1zbwqDH96ge: {cat: 'Food', des: 'samosh', money: '1000'} ...
        const dataArray = data
          ? Object.keys(data).map((key) => ({ key, ...data[key] }))
          : [];
        // This maps over the keys of the data object, creating a new array where each expense object includes its key.
        // console.log(dataArray); //[0: {key: '-NzIz6d_p1zbwqDH96ge', cat: 'Food', des: 'samosh', money: '1000'} ...]
        dispatch(expensesActions.setExpenses(dataArray));
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const editExpense = (expense) => {
    setMoney(expense.money);
    setDes(expense.des);
    setCat(expense.cat);
    setEditingKey(expense.key);
  };

  useEffect(() => {
    getData();
  }, []);

  const premiumHandle = (event) => {
    event.preventDefault();
    dispatch(themeActions.toggleTheme());
  };

  const downloadFile = () => {
    const csvData = expenses.map(expense => ({
      Money: expense.money,
      Description: expense.des,
      Category: expense.cat
    }));

    const csvRows = [];
    const headers = Object.keys(csvData[0]);
    csvRows.push(headers.join(','));

    for (const row of csvData) {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    // <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    // <div className={`${theme ? "dark" : ""} flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900`}>
    // <div className={`${theme ? "dark" : ""}`}>   
    // <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className={`${theme ? "flex flex-col justify-center items-center min-h-screen bg-gray-900" : "flex flex-col justify-center items-center min-h-screen bg-gray-100"}`}>
      <form
        // className= {`${theme ? "bg-white p-6 rounded-lg shadow-lg w-full max-w-md" : "bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"}`}
        className={`p-6 rounded-lg shadow-lg w-full max-w-md  ${theme ? 'bg-gray-800' : 'bg-white'}`}
        onSubmit={submitHandle}
      >
        <div className="mb-4">
          <label htmlFor="money" className={`${theme ? "block text-gray-300 font-bold mb-2" : "block text-gray-700 font-bold mb-2"}`}>
            Enter Money
          </label>
          <input
            type="text"
            name="money"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme?'border-gray-700':'border-gray-300'}`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            // className="block text-gray-700 font-bold mb-2"
            className={`block font-bold mb-1 ${theme?'text-gray-700':'text-gray-300'}`}
          >
            Enter Description
          </label>
          <input
            type="text"
            name="description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme?'border-gray-300':'border-gray-700'}`}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            // className="block text-gray-700 font-bold mb-2"
            className={`block font-bold mb-1 ${theme?'text-gray-700':'text-gray-300'}`}
          >
            Category
          </label>
          <select
            name="category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            // className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme?'border-gray-300':'border-gray-700'}`}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Vegetable">Vegetable</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button 
          // className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          className={`px-4 py-2 bg-blue-500 text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500${theme? 'bg-blue-500 hover:bg-blue-700':'bg-blue-700 hover:bg-blue-900'}`}
          >
            {editingKey ? "Update" : "Submit"}
          </button>
        </div>
      </form>

      {premiumActive && (
        <div className="mt-6 w-full max-w-md text-center">
          <button
            // className="px-4 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            className={`px-4 py-2 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${theme?'bg-green-700 hover:bg-green-900':'bg-green-500 hover:bg-green-700'}`}
            onClick={premiumHandle}
          >
            Activate Premium
          </button>
        </div>
      )}

      <div className="mt-6 w-full max-w-md text-center">
        <button
          onClick={downloadFile}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Download File
        </button>
      </div>

      <div className="mt-6 w-full max-w-md">
        {expenses.map((expense) => (
          <div
            key={expense.key}
            // className="bg-white p-4 rounded-lg shadow-md mb-4"
            className={`bg-white p-4 rounded-lg shadow-md mb-4 ${theme?'bg-white':'bg-gray-800'}`}
          >
            {/* <p className="text-gray-700"> */}
            <p className={`${theme?'text-gray-700':'text-gray-300'}`}>

              <strong>Money:</strong> {expense.money}
            </p>
            <p className={`${theme?'text-gray-700':'text-gray-300'}`}>
              <strong>Description:</strong> {expense.des}
            </p>
            <p className={`${theme?'text-gray-700':'text-gray-300'}`}>
              <strong>Category:</strong> {expense.cat}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => editExpense(expense)}
                className="px-4 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => deleteExpense(expense.key)}
                className="px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}





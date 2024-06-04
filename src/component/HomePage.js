import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const theme = useSelector((state) => state.themeUse.isDarkMode);
  // const theme = true;

  return (
    <div className={`min-h-screen p-6 ${theme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}>
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Expense Tracker</h1>
        <p className="text-xl max-w-3xl mx-auto">Manage your daily expenses effortlessly with Expense Tracker. Track your spending, categorize expenses, and stay on top of your finances with our user-friendly platform.</p>
      </header>

      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center">Features:</h2>
        <div className="space-y-10">
          {/* <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg"> */}
          <div className={`p-6 shadow-lg rounded-lg ${theme?'bg-gray-800 text-white':'bg-gray-100 text-gray-900'}`}>
            <h3 className="text-2xl font-bold mb-2">1. Premium Mode:</h3>
            <p className="text-lg">Unlock exclusive features and tools designed to give you deeper insights into your spending habits. Premium mode offers advanced analytics and personalized budgeting tips to help you manage your finances more effectively.</p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold mb-2">2. Dark Mode:</h3>
            <p className="text-lg">Switch to Dark Mode for a comfortable viewing experience during nighttime or low-light environments. This mode reduces eye strain and makes it easier to use the app for extended periods.</p>
          </div>

          <div className="p-6 bg-white dark:bg-gray- shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold mb-2">3. Download as CSV:</h3>
            <p className="text-lg">Easily export your expense data as a CSV file. This feature allows you to keep a backup of your expenses, share with others, or import into other financial software for further analysis.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import logo from "./logo.svg";
import "./App.css";
import Login from "./component/Login";
// import { Router, Switch, NavLink, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch, NavLink, Route } from "react-router-dom";
import LogOut from "./component/LogOut";

function App() {
  return (
    <>
       <Router>
      <nav className="p-3 flex bg-black justify-center items-center">
        <div className="flex-none w-20 h-7">
          <NavLink
            to="/home"
            // onClick={() => handleSectionClick("home")}
            className="text-white"
          >
            Home
          </NavLink>
        </div>
        <div className="flex-none w-20 h-7">
          <NavLink
            to="/login"
            // onClick={() => handleSectionClick("store")}
            className="text-white"
          >
            Login
          </NavLink>
        </div>

        <div className="flex-none w-20 h-7">
          <NavLink to="/logout" className="text-white">
            LogOut
          </NavLink>
        </div>

      </nav>
   
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut} />
        </Switch>
      </Router>
      {/* <Login></Login> */}
    </>
  );
}

export default App;

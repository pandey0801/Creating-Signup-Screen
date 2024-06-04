import "./App.css";
import Login from "./component/Login";
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";
import LogOut from "./component/LogOut";
import ForgetPas from "./component/ForgetPas";
import DailyExpenses from "./component/DailyExpenses";
import HomePage from "./component/HomePage";

function App() {
  return (
    <>
      <Router>
        <nav className="p-3 flex bg-black justify-center items-center">
          <div className="flex-none w-20 h-7">
            <NavLink to="/home" className="text-white">
              Home
            </NavLink>
          </div>
          <div className="flex-none w-20 h-7">
            <NavLink to="/login" className="text-white">
              Login
            </NavLink>
          </div>

          <div className="flex-none w-20 h-7">
            <NavLink to="/daily" className="text-white">
              Expenses
            </NavLink>
          </div>

          <div className="flex-none w-20 h-7">
            <NavLink to="/logout" className="text-white">
              LogOut
            </NavLink>
          </div>
        </nav>

        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/Forget" component={ForgetPas} />
          <Route path="/daily" component={DailyExpenses} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

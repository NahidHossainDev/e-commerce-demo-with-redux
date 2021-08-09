import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./Admin_Panel/Components/Private/PrivateRoute";
import AdminLogIn from "./Admin_Panel/Pages/AdminLogIn";
import AdminPanel from "./Admin_Panel/Pages/AdminPanel";
import './App.css';
import CartPage from './Client_Site/Pages/CartPage';
import Home from './Client_Site/Pages/Home';
import NavBar from "./Common/Navbar/NavBar";

function App() {
  
  return (
    <Router>
        <NavBar />
        <Switch>
            <PrivateRoute path="/admin">
              <AdminPanel />
            </PrivateRoute>
            <Route path="/adminLoginPage">
              <AdminLogIn />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/cartPage">
              <CartPage />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;

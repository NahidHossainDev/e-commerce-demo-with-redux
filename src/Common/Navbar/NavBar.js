import React, { Fragment, useState } from "react";
import "./NavBar.css"
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Chip from "@material-ui/core/Chip";
import { Link, useLocation } from "react-router-dom";
import LoginModal from "../../Client_Site/Components/LoginModal"
import {useSelector} from "react-redux";

const NavBar = () => {

  const location = useLocation();
  const [openModal, setOpenModal] = useState(false);

  //Getting data from redux
  const userCredential = useSelector((state) => state.userLoginData);
  const adminCredential = useSelector((state) => state.adminLoginData);
  const cartItem = useSelector(state => state.cart.cartItem);
  const getCartCounter = cartItem.reduce((val, item) => val + item.quantity, 0)

 
  switch (location.pathname) {
    case "/cartPage":
      document.title = "E-commerce | Cart";
      break;
    case "/adminLoginPage":
      document.title = "E-commerce | Admin Log-in";
      break;
    default:
      document.title = "E-commerce | Home";
  }

  return (
    <nav className="navbar navbar-expand-lg p-0 navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <strong className="rounded-pill">E-commerce</strong>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-flex" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!location.pathname.includes("admin") ? (
              <Fragment>
                <div className="search-box">
                  <SearchIcon className="search-icon" />
                  <input type="text" name="" id="" placeholder="Search..." />
                </div>
                <li className="nav-item my-auto mx-2">
                  <Link className="nav-link" to="/cartPage">
                    <ShoppingCartOutlinedIcon /> Cart
                    <Chip size="small" label={getCartCounter} />
                  </Link>
                </li>
                <LoginModal open={openModal} setOpen={setOpenModal} />
                <li
                  className="nav-item nav-link"
                  onClick={() => setOpenModal(true)}
                >
                  <PersonOutlineOutlinedIcon />
                  {userCredential.isLogin
                    ? userCredential.userName
                    : "LogIn"}
                </li>
              </Fragment>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/adminLoginPage">
                  <PersonOutlineOutlinedIcon />
                  {adminCredential.adminId}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};;

export default NavBar;

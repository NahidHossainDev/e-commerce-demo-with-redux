import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { ContextElement } from "../../App";

const AdminLogIn = () => {
  const [cart, setCart, loginInfo, setLoginInfo] = useContext(ContextElement);

  const [info, setInfo] = useState({});
  const [message, setMessage] = useState(null);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  
  const handleOnBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://polar-taiga-14247.herokuapp.com/checkAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: info.userId }),
    })
      .then((res) => res.json())
      .then((data) => {
          isAdmin(...data)
      });
  };
  const isAdmin = (data) => {
    if (info.password === data.password) {
      sessionStorage.setItem("admin_user_id",data.userId)
      const newData = { ...loginInfo }
      newData.adminLoginData = data;
      setLoginInfo(newData)
      history.replace(from);
    } else {
      setMessage("Invalid user id or password.");
    }
  };

  return (
    <div className="container login-container text-center d-flex justify-content-center">
      <div className="mt-3">
        <h4>Admin Panel Sign In</h4>
        <form onSubmit={handleSubmit} className="text-left">
          <label htmlFor="price">User id</label>
          <input type="text" name="userId" onBlur={handleOnBlur}  />
          <label htmlFor="discountRate">Password</label>
          <input
            type="password"
            name="password"
            onBlur={handleOnBlur}
            
          />
          <p
            style={{
              fontSize: "12px",
              color: "red",
              margin: "0",
              transition: "1s ease",
            }}
          >
            {message}
          </p>
          <button type="submit" className="sign-up-btn">
            Sign in
          </button>
        </form>
        <div className="border rounded p-3 bg-white text-left">
          <p>
            <b> Use following credential to log in</b>
          </p>
          <p className="d-flex mb-1">
            User ID: test_user
            <button
              className="btn-outline-secondary ml-auto btn-sm btn py-0"
              onClick={() => navigator.clipboard.writeText("test_user")}
            >
              Copy
            </button>
          </p>
          <p className="d-flex">
            Password: easy_1234
            <button
              className="btn-outline-secondary ml-auto btn-sm btn py-0"
              onClick={() => navigator.clipboard.writeText("easy_1234")}
            >
              Copy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogIn;
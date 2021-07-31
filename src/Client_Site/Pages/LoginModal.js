import Dialog from "@material-ui/core/Dialog";
import React, { useContext, useEffect, useState } from 'react';
import "../../Admin_Panel/Components/AddNewProductOrPromo/AddNew.css";
import { ContextElement } from "../../App";
import firebase from "../../firebase";

const LoginModal = ({ open, setOpen, setMessage }) => {
  const [cart, setCart, loginInfo, setLoginInfo] = useContext(ContextElement);
  const [showOtpInput, setShowOtpInput] = useState(false);
  let userName = " ";

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptchaId",
      { size: "invisible" }
    );
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();

    userName = document.getElementById("userName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtpInput(true)
      }) .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const SubmitOtp = () => {
    const otpInput = document.getElementById("otp").value;
    window.confirmationResult
      .confirm(otpInput)
      .then((result) => {
        console.log(result.user);
        // User signed in successfully.
        const newData = { ...loginInfo };
        newData.userLoginData.phoneNumber = result.user.phoneNumber;
        newData.userLoginData.userName = userName;
        sessionStorage.setItem("user_name", userName);
        setLoginInfo(newData);
        setOpen(false);
        setShowOtpInput(false);
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  return (
    <Dialog onClose={() => setOpen(false)} open={open}>
      <h6 className="text-center">Sign in with phone number</h6>
      {showOtpInput ? (
        <div>
          <label htmlFor="otp" className="mb-1">
            Enter your OTP
          </label>
          <input type="text" id="otp" className="w-100" required />
          <button onClick={SubmitOtp} className="sign-up-btn mt-3">
            Confirm
          </button>
        </div>
      ) : (
        <form onSubmit={onSignInSubmit}>
          <div id="recaptchaId"></div>
          <label htmlFor="phnNumber" className="mb-1">
            Name
          </label>
          <input type="text" id="userName" className="w-100" required />
          <label htmlFor="phnNumber" className="mb-1">
            Phone Number <small>(with country code)</small>
          </label>
          <input
            type="text"
            placeholder="+880..."
            id="phoneNumber"
            className="w-100"
            required
          />
          <button type="submit" className="sign-up-btn mt-3">
            Sign up
          </button>
        </form>
      )}
    </Dialog>
  );
};

export default LoginModal;
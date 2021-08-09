import Dialog from "@material-ui/core/Dialog";
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/Login/loginAction";
import "../../Admin_Panel/Components/AddNewProductOrPromo/AddNew.css";
import firebase from "../../firebase";

const LoginModal = ({ open, setOpen, frmOrderPage, setMessage }) => {
  
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [info, setInfo] = useState({});
  const [disableInp, setDisableInp] = useState(false)

  const dispatch = useDispatch(state => state.userLoginData);

  const handleOnChange = (e) => {
    const newInfo = { ...info };
      newInfo[e.target.name] = e.target.value;
      setInfo(newInfo);
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptchaId",
      { size: "invisible" }
    );
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();

    setDisableInp(true);
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(info.phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOtpInput(true)
      }) .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
    setDisableInp(false);
  };

  const SubmitOtp = () => {
    const otpInput = document.getElementById("otp").value;
    window.confirmationResult
      .confirm(otpInput)
      .then((result) => {
        // User signed in successfully.
        const loginData = {
          userName: info.userName,
          phoneNumber: result.user.phoneNumber,
        };
        dispatch(userLogin(loginData));
        frmOrderPage && setMessage(null);
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
          <input
            type="text"
            name="userName"
            className="w-100"
            disabled={disableInp}
            onChange={(e) => handleOnChange(e)}
            required
          />
          <label htmlFor="phnNumber" className="mb-1">
            Phone Number <small>(with country code)</small>
          </label>
          <input
            type="text"
            placeholder="+880..."
            name="phoneNumber"
            disabled={disableInp}
            className="w-100"
            onChange={(e) => handleOnChange(e)}
            required
          />
          <button
            type="submit"
            className="sign-up-btn mt-3"
            disabled={disableInp}
          >
            Sign up
          </button>
        </form>
      )}
    </Dialog>
  );
};

export default LoginModal;
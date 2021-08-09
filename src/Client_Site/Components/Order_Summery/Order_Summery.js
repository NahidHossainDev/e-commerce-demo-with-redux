import React, { useEffect, useState } from 'react';
import LoginModal from '../LoginModal';
import { useSelector } from "react-redux";

const Order_Summery = ({ setCheckoutDetail }) => {

  const cart = useSelector(state => state.cart.cartItem);
  const userCredential = useSelector((state) => state.userLoginData);
  
  const [openModal, setOpenModal] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);
  const [message, setMessage] = useState(null);
  const [loadingPromo, setLoadingPromo] = useState(false);

  // Cart Calculation
  const subTotal = parseInt(
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );
  const discount = parseInt(((subTotal / 100) * discountRate).toFixed(1));
  const shippingCharge = cart.length * 100;
  const totalPayable = subTotal + shippingCharge - discount;


  //sending data to checkout page;
  const dataForCheckOut = {
    totalPrice: totalPayable,
    discountRate: discountRate,
  };
  useEffect(() => {
    setCheckoutDetail(dataForCheckOut);
  }, []);


  //check is user Login?
  const handleOnFocus = () => {
     !userCredential.isLogin && setOpenModal(true);
  };


  //fetching promoCode data
  const handleApplyPromo = () => {
    if (userCredential.isLogin) {
      setDiscountRate(0);
      setLoadingPromo(true);
      const code = document.getElementById("promoInput").value;

      fetch("https://polar-taiga-14247.herokuapp.com/checkPromoCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode: code }),
      })
        .then((res) => res.json())
        .then((data) => {
          isDiscount(...data);
        });
    } else {
      setMessage("You must log in before using Promo Code !");
    }
  };

  // Checking discount
  const isDiscount = (promoData) => {
    if (promoData) {
      const now = Date.parse(new Date().toISOString());
      const expDate = Date.parse(promoData.endDate);
      if (
        promoData.isActive &&
        expDate > now &&
        promoData.useTime > promoData.uses
      ) {
        // if promo data being true;
        setDiscountRate(promoData.discountRate);
        setMessage(`Congratulation you got ${promoData.discountRate}% discount!`);
        dataForCheckOut.promoCodeId = promoData._id;
        dataForCheckOut.promoUses= promoData.uses + 1;
        setCheckoutDetail(dataForCheckOut); //sending promo data to checkout page;

      } else if (!promoData.isActive) {
        setMessage("Promo Code not active!");
      } else if (expDate < now || promoData.useTime <= promoData.uses) {
        setMessage("This promo Code has been expired!");
      } else {
        setMessage("Promo Code not valid!");
      }
    } else {
      setMessage("Promo Code not valid!");
    }
    setLoadingPromo(false);
  };

  return (
    <div className="rounded bg-white">
      <p className="m-0 py-3 text-center">ORDER SUMMERY</p>
      <table className="table mb-0">
        <tr className="tr">
          <td className=" py-1">Subtotal</td>
          <td className="text-right py-1">&#2547; {subTotal}</td>
        </tr>
        <tr>
          <td className="border-0 py-1">Discount ({discountRate}%)</td>
          <td className="border-0 text-right py-1"> &#2547; -{discount} </td>
        </tr>
        <tr>
          <td className="border-0 py-1">Shipping Charge</td>
          <td className="border-0 text-right py-1">&#2547;{shippingCharge}</td>
        </tr>
        <tr>
          <td className="border-0 py-1">Wallet Debit</td>
          <td className="border-0 text-right py-1"> &#2547;</td>
        </tr>
      </table>
      <div className="input-group p-3">
        <input
          type="text"
          className="form-control"
          style={{ fontSize: "16px", minWidth: "182px" }}
          placeholder="Type coupon code"
          id="promoInput"
          onClick={handleOnFocus}
          disabled={loadingPromo}
          onKeyPress={(e) => e.code === "Enter" && handleApplyPromo()}
        />
        <div className="input-group-append">
          <button
            className="input-group-text"
            id="basic-addon2"
            disabled={loadingPromo}
            onClick={handleApplyPromo}
            style={{ fontSize: "16px" }}
          >
            Apply
          </button>
        </div>
        <p
          style={{
            fontSize: "14px",
            color: discountRate ? "green" : "red",
            margin: "0",
            transition: "1s ease",
          }}
        >
          {message}
        </p>
      </div>

      <LoginModal
        open={openModal}
        setOpen={setOpenModal}
        frmOrderPage = {true}
        setMessage={setMessage}
      />
      <table className="table mb-0 pb-2">
        <tr>
          <td className="border-0 py-1">Total Payable</td>
          <td className="border-0 text-right py-1"> &#2547;{totalPayable}</td>
        </tr>
      </table>
    </div>
  );
};

export default Order_Summery;
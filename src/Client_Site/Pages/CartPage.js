import React,{useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { ContextElement } from '../../App';
import Modal from '../../Common/Modal/Modal';
import Cart_Item_card from "../Components/Cart_Item_Card/Cart_Item_card";
import Order_Summery from '../Components/Order_Summery/Order_Summery';
// Some style property used from App.css;


const CartPage = () => {

  const [cart, setCart, count, setCount] = useContext(ContextElement)
  const [isCheckboxClicked, setIsCheckboxClicked] = useState(false)
  const [error, setError] = useState(null);
  const [checkoutDetail, setCheckoutDetail] = useState();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  
 
  //update item quantity;
  const updateQuantity = (id, newQuantity) =>{
    const newArray = [...cart];
    newArray.forEach((d) => {
      if(d.id === id){d.quantity = newQuantity}
    })
    setCart(newArray);
  }

  // delete item form cart;
  const deleteFromCart = (id) => {
    setCart(cart.filter((d) => d.id !== id));
  };

  // order submit to database;
  const fetchDataMethod = (api, apiMethod, info) => {
    fetch(api, {
      method: apiMethod,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          if(apiMethod === "POST") {
            setOpenModal(true);
            setCart([])
         };
        }
      });
  };

  // checkout handler;
  const checkoutHandler = () => {
    const orderData = {
      orderId: Date.parse(new Date()),
      price: checkoutDetail.totalPrice,
      status: "Pending",
    };
    
     if (!isCheckboxClicked) {
        setError(" You must agree the terms and conditions");
     } else {
        // send order to database;
        fetchDataMethod(`http://localhost:8000/addNewOrder`, "POST", orderData);

        //update promo if used;
        checkoutDetail.promoCodeId &&
          fetchDataMethod(
            `http://localhost:8000/updatePromoCode/${checkoutDetail.promoCodeId}`,
            "PATCH",
            { uses: checkoutDetail.promoUses }
          );
     }
   };
    return (
      <div className="container py-3">
        <button
          className="btn bg-white shadow-sm rounded-pill"
          onClick={() => history.goBack()}
        >
          Go Back
        </button>
        <Modal
          open={openModal}
          setOpen={setOpenModal}
          text={"Your order placed successfully!"}
        />
        <div className="row py-3">
          <div className="col-md-9 col-sm-8 rounded bg-white p-0">
            {cart.length > 0 ? (
              cart.map((d, i) => (
                <Cart_Item_card
                  data={d}
                  updateQuantity={updateQuantity}
                  deleteFromCart={deleteFromCart}
                  key={i}
                />
              ))
            ) : (
              <h4 className="text-center mt-3">Your Cart Is Empty !</h4>
            )}
            <div className="p-3 d-flex align-items-end">
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "red",
                    margin: "0",
                    transition: "1s ease",
                  }}
                >
                  {error}
                </p>
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  name="terms"
                  id=""
                  style={error && { border: "1px solid red" }}
                  onChange={(e) => {
                    setIsCheckboxClicked(e.target.checked);
                    !isCheckboxClicked && setError(null);
                  }}
                  required
                />
                <label htmlFor="terms" className="mb-0">
                  I agree terms & conditions.
                  <a href="#">Privacy Policy and Refund Policy.</a>
                </label>
              </div>
              <button
                className="btn-yellow ml-auto px-4"
                onClick={checkoutHandler}
              >
                CHECKOUT
              </button>
            </div>
          </div>
          <div className="col-md-3 col-sm-4">
            <Order_Summery setCheckoutDetail={setCheckoutDetail} />
          </div>
        </div>
      </div>
    );
};

export default CartPage;
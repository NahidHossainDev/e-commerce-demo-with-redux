import React, { useEffect, useState } from 'react';
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

const Cart_Item_card = ({ data, updateQuantity, deleteFromCart }) => {
  const { id, image, price, title, quantity } = data;

  const totalPrice = (quantity * price).toFixed(2);

  return (
    <div className="p-3 border-bottom  d-flex">
      <img
        src={image}
        alt=""
        height="96px"
        width="90px"
        style={{ objectFit: "fill" }}
      />
      <div className="w-100 ml-2">
        <div className="d-flex ">
          BDT. {title}
          <DeleteForeverOutlinedIcon
            className="ml-auto"
            style={{ cursor: "pointer" }}
            onClick={() => deleteFromCart(id)}
          />
        </div>
        <div className="row mt-2">
          <div className="col-4">
            Color:red <br />
            Product Price:{price}
          </div>
          <div className="col-4">
            Shipping Method: ESI <br />
            Shipping Charge: BDT. 100
          </div>
          <div className="col-4">
            <div className="d-flex">
              Quantity:
              <div className="rounded-pill border min-w-50 ml-2 d-flex justify-content-between align-items-center">
                <button
                  className="border-0 bg-white py-0 px-2 rounded-pill"
                  onClick={() => updateQuantity(id, quantity + 1)}
                >
                  +
                </button>
                {quantity}
                <button
                  className="border-0 bg-white  py-0 px-2 rounded-pill"
                  onClick={() => updateQuantity(id, quantity - 1)}
                  disabled={quantity < 2}
                >
                  -
                </button>
              </div>
            </div>
            <p className="mb-0">Total Price: BDT. {totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart_Item_card;
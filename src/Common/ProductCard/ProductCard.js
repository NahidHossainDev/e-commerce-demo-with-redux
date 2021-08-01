import React, { useState } from 'react';
import "./ProductCard.css";
const ProductCard = ({ data, addToCartHandler, isAdmin }) => {
  const { id, title, image, price } = data;
  const [isAddToCart, setIsAddToCart] = useState(false);
 
  return (
    <div className={`card product-card p-3 ${!isAdmin && "product-hover"}`}>
      {isAdmin ?  <img src={`data:image/png;base64,${image}`} alt="" /> : <img src={image} alt={title} /> }
      <p>{title || data.productName}</p>
      <div className="card-foo">
        <strong>BDT.{price}</strong>
        <div className="discount-rate">10%</div>
      </div>
      {!isAdmin && (
        <button
          className="add-to-cart-btn rounded-pill btn-yellow"
          onClick={() => {
            addToCartHandler(data);
            setIsAddToCart(true);
          }}
        >
          {isAddToCart ? "Added " : "Add to cart"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from "../../Common/ProductCard/ProductCard";
import { getAllProducts } from "../../redux/Products/productsAction";
import { addToCart } from "../../redux/Cart/cartAction";

const Home = () => {

  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const { product, loading, error } = allProducts;
  
    useEffect(() => {
        dispatch(getAllProducts());
    },[])

  const addToCartHandler = (id) => {
    dispatch(addToCart(id));
  }
    return (
      <div className="container py-3">
        <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
          {loading
            ? "Loading..."
            : error
            ? {error} 
            : product.map((d, i) => (
                <div className="col mt-3">
                  <ProductCard
                    data={d}
                    addToCartHandler={addToCartHandler}
                    isAdmin={false}
                    key={i}
                  />
                </div>
              ))}
        </div>
      </div>
    );
};

export default Home;
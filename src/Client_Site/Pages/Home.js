import React, { useContext, useEffect, useState } from 'react';
import { ContextElement } from '../../App';
import ProductCard from "../../Common/ProductCard/ProductCard";

const Home = () => {

  const [cart, setCart] = useContext(ContextElement);
  
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((data) => setProducts(data));
    },[])

  const addToCartHandler = (data) => {
    const isAddaded = cart.find(d => data.id === d.id);
   if (!isAddaded) {
     data.quantity = 1;
     setCart([...cart, data]);
     //  const sessionData = sessionStorage.getItem("cart")
     //  const newSessionData = sessionData ? [...sessionData, {id:data.id,quantity:1}] : [{id:data.id,quantity:1}] ;
     //  sessionStorage.setItem("cart", JSON.stringify(newSessionData));
   }
  }
    return (
      <div className="container py-3">
        <div className="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 justify-content-center">
      
          {products.map((d, i) => (
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
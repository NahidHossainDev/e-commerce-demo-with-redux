import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ProductCard from '../../Common/ProductCard/ProductCard';

const ProductsPage = () => {
     const [products, setProducts] = useState([]);
      const history = useHistory()
     useEffect(() => {
       fetch("https://polar-taiga-14247.herokuapp.com/getProducts")
         .then((res) => res.json())
         .then((data) => setProducts(data));
     }, []);
    return (
      <div>
        <button
          className="btn bg-white shadow-sm rounded-pill"
          onClick={() => history.push("/admin/addNewProduct")}
        >
          <small> Add New Product</small>
        </button>
        <div className="row py-3 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4 justify-content-center">
          {products.length > 0
            ? products.map((d, i) => (
            <div className="col mt-3">
              <ProductCard data={d} isAdmin={true} key={i} />
            </div>
          )) : <Spinner animation="border"  variant="secondary" />}
        </div>
      </div>
    );
};

export default ProductsPage;
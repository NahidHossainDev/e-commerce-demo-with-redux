import React, { useState } from 'react';
import { Route, useLocation } from 'react-router-dom';
import AddNewProduct from '../Components/AddNewProductOrPromo/AddNewProduct';
import NavBarAdminPanel from '../Components/MenuBar/NavBarAdminPanel';
import OrderPage from './OrderPage';
import ProductsPage from "./ProductsPage";
import AddNewPromo from "../Components/AddNewProductOrPromo/AddNewPromo";
import PromoCodesPage from './PromoCodesPage';


const AdminPanel = () => {
  document.title = "E-commerce | Admin Panel";
  const location = useLocation();

  const [editPromoData, setEditPromoData] = useState(null);

    return (
      <div className="admin-panel-container min-vh-100 d-flex">
        <div className="col-md-2 pt-4 bg-white">
          <NavBarAdminPanel />
        </div>
        <div className="col-md-10 pt-4 main-body">
          {location.pathname === "/admin" && <h2>Welcome to admin panel</h2>}
          <Route path="/admin/products">
            <ProductsPage />
          </Route>
          <Route path="/admin/addNewProduct">
            <AddNewProduct />
          </Route>
          <Route path="/admin/promotion/add_new_promo_codes">
            <AddNewPromo
              editPromoData={editPromoData}
              setEditPromoData={setEditPromoData}
            />
          </Route>
          <Route path="/admin/promotion/promo_codes">
            <PromoCodesPage setEditPromoData={setEditPromoData} />
          </Route>
          <Route path="/admin/orders">
            <OrderPage />
          </Route>
        </div>
      </div>
    );
};

export default AdminPanel;
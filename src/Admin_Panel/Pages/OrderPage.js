import React, { useEffect, useState } from 'react';
import OrdersBody from '../Components/Orders/OrdersBody';
import OrdersMenu from '../Components/Orders/OrdersMenu';

const OrderPage = () => {
    const [all, setAll] = useState(true)
    const [pending, setPending] = useState(false)
    const [confirmed, setConfirmed] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [ordersData, setOrdersData] = useState(null);
    const [change, setChange] = useState(true);
    const states = [all, pending, confirmed, cancel];
    const setStates = [setAll, setPending, setConfirmed, setCancel];

    const ordersTypeHandler = (argus) => {
        setStates.forEach((d, i) => d(argus[i])); //setting setStates() value from argus array.
        setChange(e => !e )
    }

    // fetching Data;
    const fetchDataMethod = (api, apiMethod, status) => {
        setOrdersData(null);
           fetch(api, {
             method: apiMethod,
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(status),
           })
             .then((res) => res.json())
             .then((data) => {
               const newData = [...data];
               apiMethod === "POST" && setOrdersData(newData);
             });
    };

    useEffect(() => {
      all && fetchDataMethod("https://polar-taiga-14247.herokuapp.com/getOrdersData", "POST", {});
      pending && fetchDataMethod("https://polar-taiga-14247.herokuapp.com/getOrdersData", "POST", {status:"Pending"});
      confirmed && fetchDataMethod("https://polar-taiga-14247.herokuapp.com/getOrdersData", "POST", {status:"Confirm"});
      cancel && fetchDataMethod("https://polar-taiga-14247.herokuapp.com/getOrdersData", "POST", {status:"Cancel"});
    }, [change]);

    return (
      <div>
        <OrdersMenu states={states} ordersHandler={ordersTypeHandler} />
        <OrdersBody ordersData={ordersData} fetchDataMethod={fetchDataMethod} />
      </div>
    );
};

export default OrderPage;
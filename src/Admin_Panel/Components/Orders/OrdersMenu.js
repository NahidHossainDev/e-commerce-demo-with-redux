import React from 'react';
import "./Orders.css"

const OrdersMenu = ({states, ordersHandler}) => {
    const menuItem = [
      { name: "All", color: "#FFF700" },
      { name: "Pending", color: "#0099FF" },
      { name: "Confirmed", color: "#21AA00" },
      { name: "Canceled", color: "#FF3D3D" },
    ];
    return (
      <div className="d-flex">
        {menuItem.map((item, index) => (
          <div
            className="orders-menu"
            style={
              states[index]
                ? { backgroundColor: `${item.color}`, color: "white" }
                : {} //Checking the state, is true?
            }
            onClick={
              () => ordersHandler(menuItem.map((d) => item.name === d.name)) //putting argument an [true/false] Array.
            }
            key={index}
          >
            {item.name}
          </div>
        ))}
      </div>
    );
};

export default OrdersMenu;
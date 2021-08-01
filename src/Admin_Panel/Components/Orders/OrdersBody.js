import React from 'react';
import { Spinner } from 'react-bootstrap';
import "./Orders.css";
const OrdersBody = ({ ordersData, fetchDataMethod }) => {

  const statusUpdater = (id, status) => {
    fetchDataMethod(`https://polar-taiga-14247.herokuapp.com/updateOrderStatus/${id}`, "PATCH", {status: status });
    fetchDataMethod("https://polar-taiga-14247.herokuapp.com/getOrdersData", "POST", {status:status});
  }
   
  return (
    <table className="table mt-4" id="order-data-table">
      <tr>
        <th scope="col">SL</th>
        <th scope="col" className="text-center">
          Orders
        </th>
        <th scope="col" className="text-center">
          Item Price
        </th>
        <th scope="col" className="text-center">
          Action
        </th>
        <th scope="col" className="text-center">
          Status
        </th>
      </tr>
      <tbody>
        {ordersData ? (
          ordersData.length > 0 ? (
            ordersData.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.orderId}</td>
                <td>{d.price}</td>
                <td>
                  {d.status === "Pending" && (
                    <>
                      <button
                        className="action-btn"
                        style={{ backgroundColor: "yellow" }}
                        onClick={() => statusUpdater(d._id, "Confirm")}
                      >
                        Confirm
                      </button>
                      <button
                        className="action-btn"
                        style={{ color: "white" }}
                        onClick={() => statusUpdater(d._id, "Cancel")}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
                <td>{d.status}</td>
              </tr>
            ))
          ) : (
            <div className="text-center w-100">
              No Data to Show!
            </div>
          )
        ) : (
          <div className="text-center w-100">
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
      </tbody>
    </table>
  );
};

export default OrdersBody;
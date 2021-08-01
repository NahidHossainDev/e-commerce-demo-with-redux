import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const PromoCodesPage = ({ setEditPromoData }) => {

  const [promoCode, setPromoCode] = useState([]);
  const location = useHistory();

  useEffect(() => {
    fetch("https://polar-taiga-14247.herokuapp.com/getPromoCode")
      .then((res) => res.json())
      .then((data) => setPromoCode(data));
  }, []);

  return (
    <div>
      <Link to="/admin/promotion/add_new_promo_codes">
        <button className="btn bg-white shadow-sm rounded-pill">
          <small>Add New Promo</small>
        </button>
      </Link>
      <div className="text-center">
        {promoCode.length > 0 ? (
          promoCode.map((d) => (
            <div
              className="my-3 bg-white w-100 p-3 rounded shadow-sm"
              key={d._id}
            >
              <p className="d-flex justify-content-between border-bottom">
                <span style={{ textTransform: "uppercase" }}>
                  {d.promoCode}
                </span>
                <span className="mb-2">
                  <button
                    className="btn rounded-pill mr-3 py-1"
                    style={{ background: "yellow", minWidth: "115px" }}
                    onClick={() => {
                      setEditPromoData(d);
                      location.push("/admin/promotion/add_new_promo_codes");
                    }}
                  >
                    <small>Edit</small>
                  </button>
                  <button
                    className="btn rounded-pill mr-3 py-1"
                    disabled
                    style={{
                      background: d.isActive ? "#faf8ba" : "#FFE1E1",
                      color: d.isActive ? "#7A4100" : "red",
                      minWidth: "115px",
                    }}
                  >
                    <small>{d.isActive ? "Active" : "Deactive"}</small>
                  </button>
                </span>
              </p>
              <p className="d-flex justify-content-between mb-0">
                <span>Created at: {d.createdDate} </span>
                <span>Useable time: {d.useTime} </span>
                <span>Uses: {d.useTime} </span>
                <span>Discount Rate:{d.discountRate}%</span>
                <span>Start Date: {d.startDate}</span>
                <span>End Date:{d.endDate}</span>
              </p>
            </div>
          ))
        ) : (
          <Spinner animation="border" variant="secondary" />
        )}
      </div>
    </div>
  );
};

export default PromoCodesPage;
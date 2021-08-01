import React, { useEffect, useState } from 'react';
import Modal from "../../../Common/Modal/Modal";

const PromotionPage = ({ editPromoData, setEditPromoData }) => {

  const [info, setInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(
    `Please Wait...! Thanks for your patience.`
  );

  useEffect(() => {
    if(editPromoData){
      setInfo(editPromoData)
    }
  }, []);


  const handleOnChange = (e) => {
    const newInfo = { ...info };
    if (e.target.name === "isActive") {
      newInfo[e.target.name] = e.target.checked;
    } else{newInfo[e.target.name] = e.target.value;}
    setInfo(newInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenModal(true);
    
    let api = "";
    let apiMethod = "";
    let modalText = "";

    if (!editPromoData) {
      info.createdDate = new Date().toLocaleString();
      info.uses = 0;
      apiMethod = "POST";
      api = "https://polar-taiga-14247.herokuapp.com/addNewPromoCode";
      modalText = "Promo code added successfully";
    } else {
      api = `https://polar-taiga-14247.herokuapp.com/updatePromoCode/${info._id}`;
      apiMethod = "PATCH";
      modalText = "Promo code updated successfully";
    }

    fetch(api, {
      method: apiMethod,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          document.querySelector("#promo-form").reset();
          setModalData(modalText);
          setEditPromoData(null);
        }
      });
  };

  const inputField = [
    { type: "text", name: "promoCode", label: "Promo Code" },
    { type: "date", name: "startDate", label: "Start Date" },
    { type: "date", name: "endDate", label: "End Date" },
    { type: "number", name: "discountRate", label: "Discount Rate" },
    { type: "number", name: "useTime", label: "Use Time" },
  ];
  return (
    <div className="add-new-promp-container">
      <div className="d-flex justify-content-center">
        <Modal open={openModal} setOpen={setOpenModal} text={modalData} />

        <form onSubmit={handleSubmit} id="promo-form">
          {inputField.map((d, i) => (
            <div key={i} className="w-100">
              <label htmlFor="promoCode">{d.label}</label>
              <input
                type={d.type}
                name={d.name}
                className="input-box"
                // {...(i < 2
                //   ? { onBlur: handleOnBlur }
                //   : { onChange: handleOnBlur })}
                onChange={handleOnChange}
                disabled={editPromoData && i < 2}
                value={editPromoData && info[d.name]}
                required
              />
            </div>
          ))}

          <div className="d-flex justify-content-between">
            <label htmlFor="isActive">Active</label>
            <label className="switch">
              <input
                type="checkbox"
                name="isActive"
                value={editPromoData && info["isActive"]}
                checked={info["isActive"]}
                onChange={handleOnChange}
              />
              <span className="slider round d-flex justify-content-between">
                <span className="pl-1">Yes</span>
                <span className="pr-1">No</span>
              </span>
            </label>
          </div>
          
          <div className="text-center mt-3">
            <button className="add-new-promo-btn" type="submit">
              Add Promo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionPage;
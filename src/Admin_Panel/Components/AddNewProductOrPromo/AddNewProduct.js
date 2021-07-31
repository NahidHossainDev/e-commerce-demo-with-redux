import React, { useState } from 'react';
import Resizer from "react-image-file-resizer";
import { useHistory } from 'react-router';
import Modal from "../../../Common/Modal/Modal";
import "./AddNew.css";

const AddNewProduct = () => {
  const history = useHistory();
  const [openModal, setOpenModal] = useState(false);
  const [info, setInfo] = useState({});
  const [file, setFile] = useState({});
  const [modalData, setModalData] = useState(`Please Wait...! Thanks for your patience.`);

  const handleOnBlur = (e) =>  {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
  };

  const handleOnChange = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name]= e.target.files[0];
    setInfo(newInfo);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(info)
    const formData = new FormData();
    
    for (const key in info) {
       formData.append(`${key}`, info[key])
    }

    setOpenModal(true);
    fetch("http://localhost:8000/addNewProduct", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          document.querySelector("#add-new-pro-frm").reset();
          setModalData("Your product added successfully.");
        }
      });
  };

  return (
    <div className="add-new-product-container">
      <button
        className="btn bg-white shadow-sm rounded-pill"
        onClick={() => history.goBack()}
      >
        Go Back
      </button>
      <Modal open={openModal} setOpen={setOpenModal} text={modalData} />
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} id="add-new-pro-frm">
          <div
            className="img-uploader"
            onClick={() => document.querySelector("#img-input").click()}
          >
            <p className="text-center p-0">
              {info.file ? <b>`${info.file.name}`</b>
                :<span>
                  <b>Upload Product Image</b> <br /> Image size must be <br />500x500
                </span>}
            
            </p>
            <input type="file" name="file" id="img-input" onChange={handleOnChange} />
          </div>
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            name="productName"
            onBlur={handleOnBlur}
            required
          />
          <label htmlFor="price">Product Price (Before Discount)</label>
          <input type="number" name="price" onBlur={handleOnBlur}  />
          <label htmlFor="discountRate">Discount Rate</label>
          <input
            type="number"
            name="discountRate"
            onBlur={handleOnBlur}
            required
          />
          <label htmlFor="shippingCharge">Shipping Charge</label>
          <input
            type="number"
            name="shippingCharge"
            onBlur={handleOnBlur}
            required
          />
          <label htmlFor="color">Color</label>
          <input type="text" name="color" onBlur={handleOnBlur} />

          <label htmlFor="size">Size</label>
          <input type="text" name="size" onBlur={handleOnBlur} />

          <div className="d-flex justify-content-between">
            <label htmlFor="isActive">Active</label>
            <label className="switch">
              <input type="checkbox" name="isActive" onChange={handleOnBlur} />
              <span className="slider round d-flex justify-content-between">
                <span className="pl-1">Yes</span>
                <span className="pr-1">No</span>
              </span>
            </label>
          </div>

          <div className="text-center mt-3">
            <button className="add-new-promo-btn " type="submit">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProduct;
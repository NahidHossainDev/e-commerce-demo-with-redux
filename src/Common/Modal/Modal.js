import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./Modal.css"
const Modal = ({open, setOpen, text}) => {
    return (
      <Dialog
        onClose={() => setOpen(false)}
        open={open}
      >
        <CheckCircleIcon/>
        <h6 className="text-center">{text}</h6>
      </Dialog>
    );
};

export default Modal;
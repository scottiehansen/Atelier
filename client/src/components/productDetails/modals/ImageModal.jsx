import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog'

export default function ImageModal (props) {
  if (!props.showImageModal) {
    return null;
  }
  return (
    <Modal
      show={props.showImageModal}
      onHide={props.show}
      size='xl'
    >
      <img className="modal-image" src={props.images[props.mainImageIndex].url}/>
    </Modal>
  )
}
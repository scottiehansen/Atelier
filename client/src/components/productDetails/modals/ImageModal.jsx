import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ImageModal (props) {
  if (!props.showImageModal) {
    return null;
  }
  return (
    <Modal show={props.showImageModal} onHide={props.show}>
      <img src={props.images[props.mainImageIndex].url}/>
    </Modal>
  )
}
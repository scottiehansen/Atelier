import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog'
import { GlassMagnifier, magnifierBorderSize } from 'react-image-magnifiers';


export default function ImageModal (props) {
  if (!props.showImageModal) {
    return null;
  }
  return (
    <Modal
      show={props.showImageModal}
      onHide={props.show}
    >
      <GlassMagnifier
        imageSrc={props.images[props.mainImageIndex].url}
        magnifierBorderSize={5}
        square={true}
      />
    </Modal>
  )
}
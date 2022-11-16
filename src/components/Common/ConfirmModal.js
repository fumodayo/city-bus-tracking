import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import HTMLReactParser from 'html-react-parser'

const ConfirmModal = props => {
  const { title, content, show, onAction } = props
  return (
    <Modal
      show={show}
      onHide={() => onAction(!show)}
      backdrop="static" // when clicking out confirm modal cant close
      keyboard={false} // press ESC key cant close confirm modal
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="h5">{HTMLReactParser(title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => onAction(!show)}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal

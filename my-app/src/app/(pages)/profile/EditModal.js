
import React from 'react';
import Modal from 'react-modal';

const EditModal = ({ isOpen, closeModal, user }) => {
  // Add your edit logic here

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Edit User Details</h2>
        {/* Add your form elements for editing user details */}
        <button onClick={closeModal} className="modal-close">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;

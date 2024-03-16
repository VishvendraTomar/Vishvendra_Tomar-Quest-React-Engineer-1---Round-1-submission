// EditDescriptionModal.jsx
import React, { useState } from 'react';

const EditDescriptionModal = ({ isOpen, onClose, taskId, initialDescription, onSave }) => {
  const [description, setDescription] = useState(initialDescription);

  const handleSave = () => {
    onSave(taskId, description);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Edit Description</h2>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditDescriptionModal;

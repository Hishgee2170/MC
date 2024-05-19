import React from 'react';

const Modal = ({ task, onClose }) => {
  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-4 rounded-md">
        <h2 className="text-xl mb-4">{task.infomation}</h2>
        <p><strong>ID:</strong> {task.id}</p>
        <p><strong>Name:</strong> {task.name}</p>
        <button onClick={onClose} className="mt-4 bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-md">Close</button>
      </div>
    </div>
  );
};

export default Modal;

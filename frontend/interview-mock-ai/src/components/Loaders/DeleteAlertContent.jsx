import React from 'react';
import { LuCircleAlert } from "react-icons/lu";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start gap-3">
        <LuCircleAlert className="text-red-500 text-2xl flex-shrink-0 mt-0.5" />
        <p className="text-base text-gray-700 leading-relaxed">
          {content}
        </p>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
          onClick={() => window.history.back()} // or pass an onCancel prop if you want
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white shadow transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;

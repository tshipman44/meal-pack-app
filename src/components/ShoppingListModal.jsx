import React from 'react';

export default function ShoppingListModal({ pack, onClose }) {
  // Don't render anything if no pack is selected
  if (!pack) return null;

  return (
    // Modal Overlay: covers the whole screen
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close the modal when clicking the overlay
    >
      {/* Modal Content Box */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md relative flex flex-col"
        onClick={e => e.stopPropagation()} // Prevents modal from closing when clicking inside
      >
        {/* Header */}
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold text-slate-800">{pack.name}</h2>
          <button
            className="absolute top-3 right-3 text-3xl text-gray-400 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        {/* Shopping List */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: '70vh' }}>
          <ul className="list-disc list-inside space-y-2">
            {pack.shopping_list.map((item, index) => (
              <li key={index} className="text-slate-700">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
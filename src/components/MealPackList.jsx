import React, { useState } from 'react';
import { recipeImages } from '../assets/images';
import initialMealPacks from '../assets/mealpacks.json';
import ShoppingListModal from './ShoppingListModal'; // Import the new modal component

export default function MealPackList() {
  const [mealPacks] = useState(initialMealPacks);
  
  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPack, setSelectedPack] = useState(null);

  // Handlers to open and close the modal
  const handleOpenModal = (pack) => {
    setSelectedPack(pack);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPack(null);
  };

  const sizeClasses = [
    'md:col-span-2',
    'row-span-2',
    '',
    'md:col-span-2',
    '',
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-2 text-slate-800">Meal Packs</h1>
      <p className="text-lg text-slate-600 mb-8">Choose a pack to start planning.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-3 grid-flow-dense">
        {mealPacks.map((pack, index) => (
          <div 
            key={pack.id} 
            className={`group relative rounded-xl overflow-hidden shadow-lg ${sizeClasses[index % sizeClasses.length]}`}
          >
            <img
              src={recipeImages[pack.recipes[0].image_id]}
              alt={pack.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
            
            <div className="relative flex flex-col h-full p-4 text-white">
              <h2 className="text-xl md:text-2xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                {pack.name}
              </h2>
              {/* This is now a button that opens the modal */}
              <button
                onClick={() => handleOpenModal(pack)}
                className="mt-auto ml-auto bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors text-sm"
              >
                Shopping List
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Conditionally render the modal outside of the grid */}
      {isModalOpen && <ShoppingListModal pack={selectedPack} onClose={handleCloseModal} />}
    </div>
  );
}
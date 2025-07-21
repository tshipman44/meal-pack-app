import React, { useState } from 'react';
import { recipeImages } from '../assets/images';
import initialMealPacks from '../assets/mealpacks.json';

export default function MealPackList() {
  const [mealPacks] = useState(initialMealPacks);

  // An array of size classes to apply to the tiles.
  // This pattern will repeat for every 5 items.
  const sizeClasses = [
    'col-span-2 row-span-2', // Large
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-1', // Small
    'col-span-1 row-span-2', // Tall
    'col-span-2 row-span-1', // Wide
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-2 text-slate-800">Meal Packs</h1>
      <p className="text-lg text-slate-600 mb-8">Choose a pack to start planning.</p>
      
      {/* Use a tighter gap and define row heights */}
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] gap-3">
        {mealPacks.map((pack, index) => (
          // The main tile container
          <div 
            key={pack.id} 
            // Apply a repeating size class and set up for the new layout
            className={`group relative rounded-xl overflow-hidden shadow-lg ${sizeClasses[index % sizeClasses.length]}`}
          >
            {/* 1. Background Image */}
            <img
              src={recipeImages[pack.recipes[0].image_id]}
              alt={pack.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            {/* 2. Dark Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
            
            {/* 3. Content container */}
            <div className="relative flex flex-col h-full p-4 text-white">
              <h2 className="text-2xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                {pack.name}
              </h2>
              <a 
                href={pack.shopping_list_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                // Use flexbox utilities to push to the bottom-right
                className="mt-auto ml-auto bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors text-sm"
              >
                Shopping List
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
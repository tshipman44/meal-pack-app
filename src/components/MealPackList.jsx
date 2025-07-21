import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { recipeImages } from '../assets/images'; // Import our image mapper

export default function MealPackList() {
  const [mealPacks, setMealPacks] = useState([]);

  useEffect(() => {
    const fetchMealPacks = async () => {
      // Fetch the CSV file from the public folder
      const response = await fetch('/mealpacks.csv');
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);

      // Parse the CSV data
      Papa.parse(csv, {
        header: true, // Use the first row as headers
        complete: (results) => {
          // Group recipes into meal packs
          const packs = results.data.reduce((acc, row) => {
            if (!row.meal_pack_id) return acc; // Skip empty rows
            
            acc[row.meal_pack_id] = acc[row.meal_pack_id] || {
              id: row.meal_pack_id,
              name: row.meal_pack_name,
              shopping_list_url: row.shopping_list_url,
              recipes: []
            };
            
            acc[row.meal_pack_id].recipes.push({
              name: row.recipe_name,
              url: row.recipe_url,
              image_id: row.image_id
            });
            
            return acc;
          }, {});
          
          setMealPacks(Object.values(packs));
        }
      });
    };

    fetchMealPacks();
  }, []);

  if (mealPacks.length === 0) {
    return <div>Loading delicious meals... 🍱</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4 text-slate-800">Meal Packs</h1>
      <p className="text-lg text-slate-600 mb-8">Choose a pack to see the shopping list and recipes.</p>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mealPacks.map((pack) => (
          // Use col-span to vary the size of the meal packs
          <div key={pack.id} className="md:col-span-1 lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-slate-700 mb-2">{pack.name}</h2>
              <div className="flex -space-x-4 mb-4">
                {pack.recipes.map((recipe, index) => (
                  <img
                    key={index}
                    src={recipeImages[recipe.image_id]}
                    alt={recipe.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-md"
                  />
                ))}
              </div>
              <a 
                href={pack.shopping_list_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-emerald-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                🛒 View Shopping List
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
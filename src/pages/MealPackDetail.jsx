import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import initialMealPacks from '../assets/mealpacks.json';
import { recipeImages } from '../assets/images';

export default function MealPackDetail() {
  // Get the 'id' from the URL (e.g., "/mealpack/5")
  const { id } = useParams();
  const pack = initialMealPacks.find(p => p.id === id);

  // Handle case where no pack is found
  if (!pack) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Meal Pack Not Found</h1>
        <RouterLink to="/" className="text-emerald-600 hover:underline mt-4 inline-block">
          &larr; Back to all packs
        </RouterLink>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <RouterLink to="/" className="text-emerald-600 hover:underline mb-6 inline-block text-lg">
        &larr; Back to all packs
      </RouterLink>
      <h1 className="text-4xl font-bold mb-2 text-slate-800">{pack.name}</h1>
      <p className="text-lg text-slate-600 mb-8">Recipes for this pack:</p>
      
      {/* Horizontal Bento Containers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {pack.recipes.map((recipe) => (
          <a
            key={recipe.image_id}
            href={recipe.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={recipeImages[recipe.image_id]}
              alt={recipe.name}
              className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-white text-2xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
                {recipe.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
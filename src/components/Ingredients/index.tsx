import React from 'react';
import './styles.css';
import type { Ingredient } from '../../types/TheMealDB';

interface IngredientsProps {
  ingredients: Ingredient[];
}

const Ingredients: React.FC<IngredientsProps> = ({ ingredients }) => {
  return (
    <div className="flex flex-col gap-y-4">
      <p className="text-2xl font-bold">Ingredients</p>
      <ul>
        {ingredients.map(({ label, quantity }) => (
          <li key={label}>
            <span>{label}</span>
            <span className='text-gray-500 ml-1'>({quantity})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingredients;

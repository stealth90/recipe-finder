import useMealsStorage from '../../hooks/useMealsStorage';
import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard';
import { mapIngredientsKeyToString } from '../../utils';

const LastSearch = () => {
  const { storedMeals, onDeleteMeal } = useMealsStorage();

  if (!storedMeals?.length) return null;

  return (
    <div className="flex flex-col">
      <h3 className="text-center text-lg font-medium">From your research</h3>
      <div className="flex flex-wrap gap-6 justify-center py-6 md:px-0 px-4">
        {storedMeals?.map((recipe) => (
          <Link to={`/recipes/${recipe.idMeal}`} key={recipe.idMeal}>
            <RecipeCard
              onDelete={() => onDeleteMeal(recipe.idMeal)}
              key={recipe.idMeal}
              title={recipe.strMeal}
              description={mapIngredientsKeyToString(recipe)}
              category={recipe.strCategory}
              imageUrl={recipe.strMealThumb}
              area={recipe.strArea}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LastSearch;

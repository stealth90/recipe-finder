import { Link } from 'react-router';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import useSearchRecipes from '../hooks/useSearchRecipes';
import Spinner from '../components/Spinner';
import { mapIngredientsKeyToString } from '../utils';

const RecipeList = () => {
  const { isLoading, isError, recipes, searchMeal } = useSearchRecipes();

  const renderAsyncContent = () => {
    if (isLoading) {
      return (
        <div className="flex h-100 w-full justify-center items-center">
          <Spinner color="gray" width={40} height={40} />
        </div>
      );
    }

    if (isError) {
      return <div>Error loading recipes.</div>;
    }

    if (!recipes || recipes?.length === 0) {
      return <div>No recipes found.</div>;
    }

    return (
      <div className="flex flex-wrap gap-6 justify-center md:px-0 overflow-scroll">
        {recipes?.map((recipe) => (
          <Link to={`/recipes/${recipe.idMeal}`} key={recipe.idMeal}>
            <RecipeCard
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
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-10">
        <SearchBar isDisabled={isLoading} onSearch={searchMeal} />
      </div>
      {renderAsyncContent()}
    </div>
  );
};

export default RecipeList;

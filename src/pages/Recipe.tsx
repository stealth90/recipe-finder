import { useEffect, useRef } from 'react';
import Ingredients from '../components/Ingredients';
import Preparation from '../components/Preparation';
import Spinner from '../components/Spinner';
import VideoIcon from '../assets/svg/video.svg?react';
import Tag from '../components/Tag';
import useRecipe from '../hooks/useRecipe';
import ChevronIcon from '../assets/svg/chevron-left.svg?react';
import AreaIcon from '../assets/svg/area.svg?react';
import CategoryIcon from '../assets/svg/category.svg?react';
import { mapIngredientsKeyToArray, mapIngredientsPreparationStringToArray } from '../utils';

const Recipe = () => {
  const { isLoading, isError, recipe, goBack } = useRecipe();
  const mainContentRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Backspace') {
        goBack();
      }
    };
    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, []);

  useEffect(() => {
    if (isError && errorRef.current) {
      errorRef.current.focus();
    } else if (recipe && mainContentRef.current) {
      mainContentRef.current.focus();
    }
  }, [isError, recipe]);

  const handleBackKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goBack();
    }
  };
  const renderContent = () => {
    if (isLoading) {
      return (
        <div
          className="flex h-100 w-full justify-center items-center"
          role="status"
          aria-live="polite"
          aria-label="Loading recipe content"
        >
          <Spinner color="gray" width={40} height={40} />
          <span className="sr-only">Loading recipe details, please wait...</span>
        </div>
      );
    }

    if (isError) {
      return (
        <div
          ref={errorRef}
          role="alert"
          aria-live="assertive"
          className="p-4 bg-red-50 border border-red-200 rounded-md"
          tabIndex={-1}
        >
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Recipe</h2>
          <p className="text-red-700">
            We're sorry, but there was an error loading the recipe details. Please try refreshing
            the page or go back to search for other recipes.
          </p>
          <button
            onClick={goBack}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            aria-label="Go back to recipe search"
          >
            Go Back to Search
          </button>
        </div>
      );
    }

    if (!recipe) {
      return (
        <div
          role="status"
          aria-live="polite"
          className="p-4 bg-yellow-50 border border-yellow-200 rounded-md"
        >
          <h2 className="text-lg font-semibold text-yellow-800 mb-2">No Recipe Found</h2>
          <p className="text-yellow-700">
            The requested recipe could not be found. It may have been removed or the link is
            incorrect.
          </p>
          <button
            onClick={goBack}
            className="mt-3 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            aria-label="Go back to recipe search"
          >
            Go Back to Search
          </button>
        </div>
      );
    }

    const tags = recipe.strTags ? recipe.strTags.split(',') : [];

    return (
      <article
        className="flex flex-wrap justify-center overflow-scroll"
        ref={mainContentRef}
        tabIndex={-1}
        aria-labelledby="recipe-title"
      >
        <button
          onClick={goBack}
          onKeyDown={handleBackKeyDown}
          className="absolute top-4 left-4 rounded-full border-gray-300 border bg-white p-2 flex items-center hover:cursor-pointer justify-center hover:shadow-lg focus:shadow-lg focus:outline-none transition-all"
          aria-label={`Go back to recipe search from ${recipe.strMeal}`}
          type="button"
        >
          <ChevronIcon width={18} height={18} aria-hidden="true" role="img" />
          <span className="sr-only">Back to search</span>
        </button>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full max-h-60 object-cover"
          loading="lazy"
        />
        <div id="main-content" className="flex flex-col p-4 gap-y-4">
          <div className="flex gap-x-4 items-center">
            <p className="font-bold text-3xl text-left">{recipe.strMeal}</p>
            {recipe.strYoutube && (
              <a
                className="flex flex-row gap-x-1 h-auto items-center hover:border-b border-red-400 transition-all"
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <VideoIcon width={16} height={16} color="black" />
                <span className="text-sm">Watch video</span>
              </a>
            )}
          </div>
          {tags?.length > 0 && (
            <div className="flex flex-row gap-1">
              {tags.map((tag) => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          )}
          <div className="flex gap-x-4 items-center">
            {recipe.strCategory && (
              <div className="flex flex-row gap-x-1 items-center">
                <CategoryIcon width={16} height={16} color="gray" />
                <span className="text-gray-600 text-md">{recipe.strCategory}</span>
              </div>
            )}
            {recipe.strArea && (
              <div className="flex flex-row gap-x-1 items-center">
                <AreaIcon width={16} height={16} color="gray" />
                <span className="text-gray-600 text-md">{recipe.strArea}</span>
              </div>
            )}
          </div>
          <div className="flex gap-4 flex-col sm:flex-row sm:gap-x-8">
            <Ingredients
              ingredients={mapIngredientsKeyToArray(recipe)}
              aria-label={`Ingredients for ${recipe.strMeal}`}
            />
            <Preparation
              steps={mapIngredientsPreparationStringToArray(recipe.strInstructions)}
              aria-label={`Cooking instructions for ${recipe.strMeal}`}
            />
          </div>
        </div>
      </article>
    );
  };
  return <div>{renderContent()}</div>;
};

export default Recipe;

import { useEffect, useState } from 'react';
import TheMealDB from '../services/TheMealDBService';
import type { Meal } from '../types/TheMealDB';
import { useNavigate, useSearchParams } from 'react-router-dom';

const useSearchRecipes = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [recipes, setRecipes] = useState<Meal[] | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!searchParams.get('query')) {
        navigate('/');
        return;
      }
      setIsLoading(true);
      try {
        const response = await TheMealDB.searchRecipeByQuery(searchParams.get('query') || '');
        setRecipes(response);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams.get('query')]);

  const searchMeal = (query: string) => {
    setSearchParams({ query });
  };

  return { isLoading, isError, recipes, searchMeal };
};

export default useSearchRecipes;

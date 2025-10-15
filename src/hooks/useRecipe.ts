import { useEffect, useState } from 'react';
import TheMealDB from '../services/TheMealDBService';
import type { Meal } from '../types/TheMealDB';
import { useNavigate, useParams } from 'react-router';

const useRecipe = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [recipe, setRecipe] = useState<Meal | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!params.id) {
        navigate('/');
        return;
      }
      setIsLoading(true);
      try {
        const response = await TheMealDB.getMealById(params.id);
        setRecipe(response);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return { isLoading, isError, recipe, goBack };
};

export default useRecipe;
